<template>
  <div id="admin-addcontest">

    <el-dialog title="选择题目" :visible.sync="dialogIsAble">
      <el-table :data="problemData" ref="problemTable" @current-change="handleCurrentChange" highlight-current-row>
        <el-table-column property="problemID" label="题目ID" width="100px"></el-table-column>
        <el-table-column property="title" label="题目名称"></el-table-column>
      </el-table>
    </el-dialog>

    <el-row>
      <el-col :span="14" :offset="5">
        <el-card class="admin-addcontest-card">
          <el-form 
            :model="dataForm"
            :rules="rules"
            label-width="100px"
            ref="dataForm">
            <el-form-item label="比赛编号"> 1 </el-form-item>
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
              <el-button>{{ 'P ' + '1000' }}</el-button>
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
      problemData: [{
        problemID: 1001,
        title: 'A + B'
      }],
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
        title: [ { required: true, message: '请输入题目标题', trigger: 'blur' } ],
        creator_id: [ { required: true, message: '请输入创建人', trigger: 'blur' } ],
        type: [ { required: true, message: '请选择比赛类型', trigger: 'blur' } ],
        auth: [ { required: true, message: '请选择比赛权限', trigger: 'blur' } ],
        dateRange: [ { required: true, message: '请选择比赛时间', trigger: 'blur' } ]
      },
      currentRow: null
    }
  },
  methods: {
    selectProblem() {
      this.dialogIsAble = true;
    },
    handleCurrentChange(val) {
      if (!val) return;
      this.dataForm.problems.push({
        problemID: val.problemID,
        key: Date.now()
      })
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
          alert('submit!');
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
