<template>
  <div id="admin-addproblem">
    <el-row>
      <el-col :span="14" :offset="5">
        <el-card class="admin-addproblem-card">
          <el-form 
            :model="dataForm"
            :rules="rules"
            label-width="100px"
            ref="dataForm">
            <el-form-item label="题目编号"> 1001 </el-form-item>
            <el-form-item label="题目名称" prop="title">
              <el-input v-model="dataForm.title"></el-input>
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
      dataForm: {
        title: '',
        description: '',
        input: '',
        output: '',
        hint: '',
        sample: [{
          sinput: '',
          soutput: ''
        }]
      },
      rules: {
        title: [ { required: true, message: '请输入题目标题', trigger: 'blur' } ],
        description: [ { required: true, message: '请输入题目描述', trigger: 'blur' } ],
        input: [ { required: true, message: '请写点输入描述, 如果不需要写个无输入也行', trigger: 'blur' } ],
        output: [ { required: true, message: '请输入输出描述', trigger: 'blur' } ],
        hint: [ { required: true, message: '请输入Hint', trigger: 'blur' } ]
      }
    }
  },
  methods: {
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
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(item) {
      this.$refs[item].resetFields();
    }
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
</style>