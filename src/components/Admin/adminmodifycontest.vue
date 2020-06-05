<template>
  <div id="modify-contest">
    <el-col :span="14" :offset="5">
      <el-card class="modifycon-card">
        <el-table 
          :data="contestData"
          style="width: 100%">
          <el-table-column property="contest_id" label="比赛ID" width="100px"></el-table-column>
          <el-table-column property="title" label="比赛名称"></el-table-column>
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
        <div class="modify-contest-block">
          <el-pagination
            background
            @current-change="handlePageChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalContest">
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
      contestData: [],
      currentPage: 1,
      pageSize: 40,
      totalContest: 0
    }
  },
  methods: {
    handleEdit(index, val) {
      console.log(index, val);
      this.$router.push({ name: 'admincontestchange', params: { contestID: val.contest_id } })
    },
    inputChange() {
      this.handlePageChange(1);
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.$axios
        .get( this.$globle.GLOBLE_BASEURL + 
          '/contest/?limit=' + this.pageSize +
          '&offset=' + ((this.currentPage - 1) * this.pageSize)
        )
        .then( response => {
          console.log(response);
          this.totalContest = response.data.count;
          this.contestData = response.data.results;
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
.modifycon-card {
  margin-top: 20px;
}
.modify-contest-input {
  margin-top: 10px;
  margin-left: 10px;
}
.modify-contest-input input {
  border-radius: 20px;
  width: 200px;
}
</style>