<template>
  <div id="modify-problem">
    <el-col :span="14" :offset="5">
      <el-card class="modifypro-card">
        <el-input
          class="modify-problem-input"
          type="text"
          maxlength="64"
          minlength="1"
          placeholder="题目ID/题目名"
          v-model="inputText"
          @change="inputChange">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-table 
          :data="problemData"
          style="width: 100%">
          <el-table-column property="problem_id" label="题目ID" width="100px"></el-table-column>
          <el-table-column property="title" label="题目名称"></el-table-column>
          <el-table-column
            align="right"
            width="160px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="modify-problem-block">
          <el-pagination
            background
            @current-change="handlePageChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalProblem">
          </el-pagination>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      problemData: [],
      inputText: '',
      currentPage: 1,
      pageSize: 40,
      totalProblem: 0
    }
  },
  methods: {
    handleEdit(index, val) {
      this.$router.push({ name: 'adminproblemchange', params: { problemID: val.problem_id } })
    },
    inputChange() {
      this.handlePageChange(1);
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
          console.log(response);
          this.totalProblem = response.data.count;
          this.problemData = response.data.results;
        })
        .catch( error => {
          this.$message.error('服务器错误' + error);
        })
    }
  },
  created() {
    this.handlePageChange(1);
  }
}
</script>
<style scope>
.modifypro-card {
  margin-top: 20px;
}
.modify-problem-input {
  margin-top: 10px;
  margin-left: 10px;
}
.modify-problem-input input {
  border-radius: 20px;
  width: 200px;
}
</style>