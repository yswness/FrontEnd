<template>
  <div id="admin-addcontest">
    <el-dialog title="选择题目" :visible.sync="dialogIsAble">
      <el-input
        class="problem-input"
        type="text"
        maxlength="64"
        minlength="1"
        placeholder="题目ID/题目名"
        v-model="inputText"
        @change="inputChange">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-table :data="problemData" ref="problemTable" @current-change="handleCurrentChange" highlight-current-row>
        <el-table-column property="problem_id" label="题目ID" width="100px"></el-table-column>
        <el-table-column property="title" label="题目名称"></el-table-column>
      </el-table>
      <div class="problem-block">
        <el-pagination
          background
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="totalProblem">
        </el-pagination>
      </div>
    </el-dialog>

    <el-row>
      <el-col :span="14" :offset="5">
        <el-card class="admin-addcontest-card">
          <el-form 
            :model="dataForm"
            :rules="rules"
            label-width="100px"
            ref="dataForm">
            <el-form-item label="比赛编号"> {{ nowContestID }} </el-form-item>
            <el-form-item label="比赛名称" prop="title">
              <el-input v-model="dataForm.title"></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="creator_id">
              <el-input v-model="dataForm.creator_id"></el-input>
            </el-form-item>
            <el-form-item label="比赛时间" prop="dateRange">
              <el-date-picker
                v-model="dataForm.dateRange"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="比赛类型" prop="type">
              <el-select v-model="dataForm.type" placeholder="选择比赛类型">
                <el-option label="ACM" value="ACM"></el-option>
                <el-option label="OI" value="OI"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="比赛权限" prop="auth">
              <el-select v-model="dataForm.auth" placeholder="选择比赛权限">
                <el-option label="Public" value="Public"></el-option>
                <el-option label="Private" value="Private"></el-option>
                <el-option label="Protect" value="Protect"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="admin-con-addpro" label="加入题目">
              <el-button type="primary" @click="selectProblem()">选择一个题目</el-button>
            </el-form-item>
            <el-form-item
              v-for="(problem, index) in dataForm.problems"
              :label="'Problem ' + String.fromCharCode('A'.charCodeAt() + index)"
              :key="problem.key">
              <el-button>{{ 'P ' + dataForm.problems[index].problemID }}</el-button>
              <el-button class="admin-addcon-button" @click.prevent="deleteProblem(problem)">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('dataForm')">确认</el-button>
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
      dialogIsAble: false,
      currentPage: 1,
      pageSize: 20,
      totalProblem: 0,
      inputText: '',

      problemData: [],
      oldProblems: [],
      problemHadDelete: false,
      dataForm: {
        contest_id: 0,
        creator_id: '',
        title: '',
        dateRange: [],
        problems: [],
        type: '',
        auth: ''
      },
      rules: {
        title: [ { required: true, message: '请输入比赛标题', trigger: 'blur' } ],
        creator_id:   [ { required: true, message: '请输入创建人', trigger: 'blur' } ],
        type:         [ { required: true, message: '请选择比赛类型', trigger: 'blur' } ],
        auth:         [ { required: true, message: '请选择比赛权限', trigger: 'blur' } ],
        dateRange:    [ { required: true, message: '请选择比赛时间', trigger: 'blur' } ]
      },
      currentRow: null,

    }
  },
  created() {
    console.log(this.$route.params.contestID);
    this.nowContestID = this.$route.params.contestID;
    this.dataForm.contest_id = this.nowContestID;

    this.$axios
      .get( this.$globle.GLOBLE_BASEURL + 
        '/contestproblem/?contest=' + this.nowContestID
      )
      .then( response => {
        response.data.forEach(item => {
          this.oldProblems.push({
            dataid: item.id
          })
        })
      })
      .catch(error => this.$message.error("服务器错误" + error));
  },
  methods: {
    selectProblem() {
      if (!this.problemHadDelete) {
        let that = this;
        this.$confirm('此操作将删除该比赛设置的所有题目, 确定修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.oldProblems.forEach( item => {
            console.log(item);
            that.$axios.delete(
              that.$globle.GLOBLE_BASEURL + 
              '/contestproblem/' + item.dataid + '/'
            )
            .then( () => {} )
          })
          that.problemHadDelete = true;
          this.dialogIsAble = true;
          this.handlePageChange(1);
        })
      } else {
        this.dialogIsAble = true;
        this.handlePageChange(1);
      }
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.$axios
        .get( this.$globle.GLOBLE_BASEURL +
          '/problem/?limit=' + this.pageSize +
          '&offset=' + ((this.currentPage - 1) * this.pageSize) +
          '&search=' + this.inputText
        )
        .then( response => {
          this.totalProblem = response.data.count;
          this.problemData = response.data.results;
        })
        .catch( error => {
          this.$message.error('服务器错误' + error);
        })
    },
    inputChange() {
      this.handlePageChange(1);
    },
    handleCurrentChange(val) {
      if (!val) return;
      this.addProblem(val);
    },
    addProblem(val) {
      this.dataForm.problems.push({
        problemID: val.problem_id,
        problemTitle: val.title,
        key: Date.now()
      })
      console.log(val.problemtitle);
      this.$refs.problemTable.setCurrentRow(null);
      this.dialogIsAble = false;
    },
    deleteProblem(problem) {
      let index = this.dataForm.problems.indexOf(problem);
      if (index !== -1) {
        this.dataForm.problems.splice(index, 1);
      }
    },
    submitForm(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          this.dataForm.create_time = parseInt((this.dataForm.dateRange[1] - this.dataForm.dateRange[0]) / 1000);
          this.dataForm.start_time = this.dataForm.dateRange[0].toISOString();
          this.dataForm.end_time = this.dataForm.dateRange[1].toISOString();
          console.log(JSON.stringify({
              contest_id:    this.dataForm.contest_id,
              creator:    this.dataForm.creator_id,
              title:      this.dataForm.title,
              start_time: this.dataForm.dateRange[0],
              end_time:   this.dataForm.dateRange[1],
              type:       this.dataForm.type,
              auth:       this.dataForm.auth
            }));
          this.$axios
            .put( this.$globle.GLOBLE_BASEURL + '/contest/' + this.dataForm.contest_id + '/', {
              contest_id: this.dataForm.contest_id,
              creator:    this.dataForm.creator_id,
              title:      this.dataForm.title,
              start_time: this.dataForm.dateRange[0],
              end_time:   this.dataForm.dateRange[1],
              type:       this.dataForm.type,
              auth:       this.dataForm.auth
            })
            .then( () => {
              let that = this;
              let newProblems = this.dataForm.problems;
              
              let promiseAll = newProblems.map( (item, index) => {
                console.log(JSON.stringify({
                  contest: that.dataForm.contest_id,
                  problem: item.problemID,
                  problemtitle: item.problemTitle,
                  rank: index + 1
                }));
                return that.$axios.post( this.$globle.GLOBLE_BASEURL + /contestproblem/ , {
                  contest: that.dataForm.contest_id,
                  problem: item.problemID,
                  problemtitle: item.problemTitle,
                  rank: index + 1
                })
              })
              this.$axios.all(promiseAll).then(() => {
                that.$message({
                  message: '提交成功',
                  type: 'success'
                });
              })
              .catch(error => {
                that.$message.error('比赛题目提交失败' + error );
              })
            })
            .catch( error => {
              this.$message.error('服务器错误(' + error + ')');
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
  
}
</script>
<style scope>
.admin-addcontest-card {
  margin-top: 20px;
}
.admin-addcon-col {
  text-align: center;
}
.admin-addcon-button {
  margin-left: 20px;
}
.admin-addcon-spl {
  text-align: center;
}
.admin-con-addpro {
  margin-top: 60px;
}
</style>
