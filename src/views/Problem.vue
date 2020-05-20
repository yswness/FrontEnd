<template>
  <div id="problem">
    <el-row id="problem-row">
      <el-col id="problem-col" :span="12" :offset="6">
        <div class="problem-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalProblem">
          </el-pagination>
        </div>
        <el-table
          :data="problemData"
          stripe
          style="width: 100%">
          <el-table-column
            width="50px"
            ></el-table-column>
          <el-table-column
            prop="problem_id"
            label="#"
            width="80px">
            </el-table-column>
          <el-table-column
            label="题目名称">
            <template slot-scope="scope">
              <el-button
                class="problem-table-button"
                type="text"
                @click="handleClick(scope.row.problem_id)">
                {{ scope.row.title }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="submission_number"
            label="提交数"
            width="80px">
            </el-table-column>
          <el-table-column
            prop="acnum"
            label="通过数"
            width="80px">
            </el-table-column>
          <el-table-column
            prop="acrate"
            label="通过率"
            width="70px">
            </el-table-column>
        </el-table>
        <div class="problem-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalProblem">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'problem',
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      this.currentPate = val;
      this.$axios
        .get(
          "/problemdata/" +
          "?limit=" + this.pageSize +
          "&offset=" + (this.currentPage - 1) * this.pageSize +
          "/"
        )
        .then(response => {
          let problemDataLength = response.data.results.length;
          for (let i = 0; i < problemDataLength; i++) {
            let rate = response.data.results[i].acnum ? 
              response.data.results[i].acnum / response.data.results[i].submission_number : 0;
            response.data.results[i].acrate = Number(rate * 100).toFixed(2) + '%';
          }
          this.problemData = response.data.results;
          //console.log(this.problemData);
        });
    },
    handleClick(val) {
      this.$router.push({ name: 'problembody', params: { problemID: val }})
    }
  },
  data() {
    return {
      currentPage: 1,
      problemData: [{
        problem_id: 0,
        title: '',
        submission_number: 0,
        acnum: 0,
        auth: '',
        acrate: ''
      }],
      pageSize: 40,
      totalProblem: 0
    };
  },
  created() {
    this.$axios
      .get(
        "/problemdata/" +
        "?limit=" + this.pageSize +
        "&offset=" + (this.currentPage - 1) * this.pageSize +
        "/"
      )
      .then(response => {
        let problemDataLength = response.data.results.length;
        for (let i = 0; i < problemDataLength; i++) {
          let rate = response.data.results[i].acnum ? 
            response.data.results[i].acnum / response.data.results[i].submission_number : 0;
          response.data.results[i].acrate = Number(rate * 100).toFixed(2) + '%';
        }
        this.problemData = response.data.results;
        //console.log(this.problemData);
      });
  }
}
</script>
<style scope>
#problem-row {
  position: relative;
  top: 20px;
}
#problem-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.problem-block {
  display: block;
  text-align: center;
  margin-top: 10px;
}
.problem-table-button {
  padding: 0;
}
</style>