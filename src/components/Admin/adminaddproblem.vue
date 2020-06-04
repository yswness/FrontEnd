<template>
  <div id="admin-addproblem">
    <el-row>
      <el-col :span="14" :offset="5">
        <el-card class="admin-addproblem-card">
          <el-form 
            :model="dataForm"
            :rules="rules"
            label-width="120px"
            ref="dataForm">
            <el-form-item label="题目编号"> {{ nowProblemID }} </el-form-item>
            <el-form-item label="题目名称" prop="title">
              <el-input v-model="dataForm.title"></el-input>
            </el-form-item>
            <el-form-item label="题目创建者">
              <el-input v-model="dataForm.author"></el-input>
            </el-form-item>
            <el-form-item label="题目来源">
              <el-input v-model="dataForm.source"></el-input>
            </el-form-item>
            <el-form-item label="题目难度" prop="level">
              <el-select v-model="dataForm.level" placeholder="选择题目难度">
                <el-option label="Easy" value="Easy"></el-option>
                <el-option label="Medium" value="Medium"></el-option>
                <el-option label="Hard" value="Hard"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目描述" prop="description">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="dataForm.description"></el-input>
            </el-form-item>
            <el-form-item label="输入描述" prop="input">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="dataForm.input"></el-input>
            </el-form-item>
            <el-form-item label="输出描述" prop="output">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="dataForm.output"></el-input>
            </el-form-item>
            <el-form-item label="Hint" prop="hint">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="dataForm.hint"></el-input>
            </el-form-item>
            <el-form-item label="分数" prop="score">
              <el-input-number v-model="dataForm.score" :step="5" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="时间限制(MS)" prop="time">
              <el-input-number v-model="dataForm.time" :step="100" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="空间限制(MiB)" prop="memory">
              <el-input-number v-model="dataForm.memory" :step="32" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item label="测试数据上传">
              <el-upload
                ref="upload"
                action="/api/uploadfile/"
                :on-exceed="handleExceed"
                :on-change="handleChange"
                :on-success="handleSuccessNone"
                :on-error="handleError"
                :on-remove="handleRemove"
                :file-list="fileList"
                :multiple="false"
                :limit="1"
                :auto-upload="false"
                :http-request="fileUpload">
                <el-button slot="trigger" size="small" type="primary">选择测试数据文件</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传后缀为'.zip'的ZIP文件, 输入输出文件后缀为'.in'和'.out'
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="权限" prop="auth">
              <el-select v-model="dataForm.auth" placeholder="选择题目权限">
                <el-option label="Public" value="Public"></el-option>
                <el-option label="Private" value="Private"></el-option>
                <el-option label="In the Contest" value="In the Contest"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="(sample, index) in dataForm.sample"
              :label="'样例' + index"
              :key="sample.key">
              <el-col :span="2" class="admin-addpro-col"><span>输入</span></el-col>
              <el-col :span="7">
                <el-input type="textarea" v-model="sample.sinput"></el-input>
              </el-col>
              <el-col :span="2" class="admin-addpro-col"><span>输出</span></el-col>
              <el-col :span="7">
                <el-input type="textarea" v-model="sample.soutput"></el-input>
              </el-col>
              <el-button class="admin-addpro-button" @click.prevent="deleteSample(sample)">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('dataForm')">确认</el-button>
              <el-button @click="addSample">新增样例</el-button>
              <el-button @click="resetForm('dataForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowProblemID: 0,
      fileList: [],
      dataForm: {
        title: '',
        description: '',
        input: '',
        output: '',
        hint: '',
        time: 0,
        memory: 0,
        score: 0,
        auth: '',
        author: '',
        source: '',
        sample: [{
          sinput: '',
          soutput: ''
        }]
      },
      rules: {
        title: [ { required: true, message: '请输入题目标题', trigger: 'blur' } ],
        level: [ { required: true, message: '请输入题目难度', trigger: 'blur' } ],
        description: [ { required: true, message: '请输入题目描述', trigger: 'blur' } ],
        input: [ { required: true, message: '请写点输入描述, 如果不需要写个无输入也行', trigger: 'blur' } ],
        output: [ { required: true, message: '请输入输出描述', trigger: 'blur' } ],
        hint: [ { required: true, message: '请输入Hint', trigger: 'blur' } ],
        time: [ { required: true, message: '请输入时间限制', trigger: 'blur' } ],
        memory: [ { required: true, message: '请输入内存限制', trigger: 'blur' } ],
        auth: [ { required: true, message: '请选择题目权限', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    fileUpload(f) {
      let formData = new FormData();
      let newFile = new File([f.file], this.nowProblemID + ".zip");
      
      formData.append("file", newFile);
      this.$axios
        .post(f.action, formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(response => {
          f.onSuccess(response.data);
        })
        .catch(err => {
          console.log(err);
          f.onError(err);
        });
    },
    handleRemove() {
      this.fileList = [];
    },
    handleExceed() {
      this.$message.error(
        "一次至多只能上传一个文件"
      );
    },
    handleChange(file, fileList) {
      var name = file.name;
      var li = name.split(".");
      this.fileList = fileList;
      if (li[1] != "zip") {
        this.$message.error("数据文件名名不正确");
        this.fileList = [];
      }
    },
    handleError(error) {
      this.$message.error("数据上传失败" + error);
    },
    handleSuccessNone() {
      this.$message.success("上传成功");
      this.$router.go(0);
    },
    addSample() {
      this.dataForm.sample.push({
        sinput: '',
        soutput: '',
        key: Date.now()
      });
    },
    deleteSample(item) {
      let index = this.dataForm.sample.indexOf(item);
      if (index !== -1) {
        this.dataForm.sample.splice(index, 1);
      }
    },
    submitForm(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          
          let nowTime = new Date();
          nowTime = nowTime.toISOString();
          this.$axios
            .post( this.$globle.GLOBLE_BASEURL + '/problem/' , {
              problem_id: this.nowProblemID,
              title: this.dataForm.title,
              level: this.dataForm.level,
              score: this.dataForm.score,
              auth: this.dataForm.auth,
              addtime: nowTime
            })
            .then( () => {
              let postSinput = [];
              let postSoutput = [];
              for (let item of this.dataForm.sample) {
                postSinput.push(item.sinput);
                postSoutput.push(item.soutput);
              }
              console.log();

              JSON.stringify(this.dataForm.sample);
              this.$axios
                .post( this.$globle.GLOBLE_BASEURL + '/problemdetail/', {
                  problem: this.nowProblemID,
                  title: this.dataForm.title,
                  author: this.dataForm.author,
                  problemdes: this.dataForm.description,
                  input: this.dataForm.input,
                  output: this.dataForm.output,
                  sinput: JSON.stringify(postSinput),
                  soutput: JSON.stringify(postSoutput),
                  source: this.dataForm.source,
                  time: this.dataForm.time,
                  memory: this.dataForm.memory,
                  hint: this.dataForm.hint
                })
                .then( () => {
                  this.$refs.upload.submit();
                  this.$message({
                    message: '题目添加成功',
                    type: 'success'
                  })
                })
                .catch( error => {
                  this.$message.error('服务器错误' + error);
                })

            })
            .catch( error => { this.$message.error('服务器错误(' + error + ')'); } )

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(item) {
      this.$refs[item].resetFields();
    }
  },
  created() {
    this.$axios
      .get( this.$globle.GLOBLE_BASEURL + '/problem/?limit=1&offset=0' )
      .then( response => {
        if (!response.data.count)
          this.nowProblemID = 1000;
        else
          this.nowProblemID = response.data.count + 1000;
      })
      .catch( error => {
        this.$message.error('服务器错误(' + error + ')');
      })
  }
  
}
</script>
<style scope>
.admin-addpro-col {
  text-align: center;
}
.admin-addpro-button {
  margin-left: 20px;
}
.admin-addproblem-card {
  margin-top: 20px;
  margin-bottom: 80px;
}
</style>