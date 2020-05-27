<template>
  <div class="contestproblemlist">
    <el-row>
      <el-col :span="8" :offset="4">
        <el-card class="box-card" :body-style="{padding: '0px'}">
          <el-table
            :data="problemData"
            stripe
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle">
            <el-table-column
              width="40px"
              ></el-table-column>
            <el-table-column
              prop="problem_id"
              label="#"
              width="50px">
              </el-table-column>
            <el-table-column
              label="题目名称"
              width="390px">
              <template slot-scope="scope">
                <router-link :to="{ name: 'contestproblem', params: { problemKey: scope.row.problem_id }}">
                  {{ scope.row.title }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="submission_number"
              label="提交数"
              width="68px">
              </el-table-column>
            <el-table-column
              prop="acnum"
              label="通过数"
              width="68px">
              </el-table-column>
            <el-table-column
              prop="acrate"
              label="通过率"
              width="68px">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      problemData: [{
        problem_id: 'A',
        title: '',
        submission_number: 0,
        acnum: 0,
        auth: '',
        acrate: ''
      }]
    }
  },
  methods: {
    cellStyle(val) {
      if (val.columnIndex != 2)  {
        return {
          textAlign: 'center'
        }
      }
    },
    headerCellStyle(val) {
      if (val.columnIndex != 2)  {
        return {
          textAlign: 'center'
        }
      }
    }
  },
  created() {
    this.$axios
      .get(
        this.$globle.GLOBLE_BASEURL +
        "/testcontestp/"
      )
      .then(response => {
        console.log(response);
        let problemDataLength = response.data.results.length;
        for (let i = 0; i < problemDataLength; i++) {
          let rate = response.data.results[i].acnum ? 
            response.data.results[i].acnum / response.data.results[i].submission_number : 0;
          response.data.results[i].acrate = Number(rate * 100).toFixed(2) + '%';
        }
        this.problemData = response.data.results;
        //console.log(this.problemData);
      })
      .catch(error => {
        this.$message.error('服务器错误(' + error + ')');
      });
  }
}
</script>
<style scope>
.contestproblemlist .box-card {
  width: 700px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>