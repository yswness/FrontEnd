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
              width="40px">
            </el-table-column>
            <el-table-column
              prop="problem_id"
              label="#"
              width="50px">
            </el-table-column>
            <el-table-column
              label="题目名称"
              width="380px">
              <template slot-scope="scope">
                <router-link :to="{ name: 'contestproblem', params: { problemKey: scope.row.problem }}">
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
              width="78px">
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
      contestID: 0,
      problemData: [{
        problem_id: 'A',
        problem: '1000',
        title: 'A + B',
        submission_number: 8,
        acnum: 5,
        acrate: '6%'
      }]
    }
  },
  methods: {
    fuckclick(val) {
      console.log(val);
    },
    initProblemList() {
      this.$axios
        .get(
          this.$globle.GLOBLE_BASEURL +
          '/contestproblem/?contest=' + this.contestID
        )
        .then(response => {
          //let problemDataLength = response.data.length;
          response.data.sort( (a, b) => { //按rank排下序
            return a.rank - b.rank;
          });
          response.data.forEach( item => {
            item.problem_id = String.fromCharCode('A'.charCodeAt() + item.rank - 1);
          });
          
          for (let item of response.data) {
            item.submission_number = 0;
            item.acnum = 0;
            item.acrate = '0%';
          }
          this.problemData = response.data;
          let that = this;
          let promiseAll = this.problemData.map( item => { //先获得所有题总提交次数
            return that.$axios.get( that.$globle.GLOBLE_BASEURL + 
                                    '/judgestatus/?problem=' + item.problem);
          }).concat(
            this.problemData.map( item => {
              return that.$axios.get( that.$globle.GLOBLE_BASEURL + 
                                      '/judgestatus/?problem=' + item.problem + '&result=0');
            })
          );
          this.$axios.all(promiseAll).then(function(resArr) {
            resArr.forEach(function(res, i) {
              if (i < that.problemData.length) {
                that.problemData[i].submission_number = res.data.length;
              } else {
                let k = i - that.problemData.length;
                that.problemData[k].acnum = res.data.length;
                let submissionNumber = that.problemData[k].submission_number;
                let acnum = that.problemData[k].acnum;
                let rate = acnum ? acnum / submissionNumber : 0;
                that.problemData[k].acrate = (rate * 100).toFixed(2) + '%';

              }
              //that.problemData[i].problem_id = 'A';
            })
          });
        })
        .catch(error => {
          this.$message.error('服务器错误(' + error + ')');
        });
    },
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
    this.contestID = this.$route.params.contestID;
    this.initProblemList();
  },
  mounted() {
    console.log(this.problemData);
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