<template>
  <div id="problem">
    <el-row id="problem-row">
      <el-col id="problem-col" :span="12" :offset="6">
        <el-card>
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
          <div class="problem-block">
            <el-pagination
              background
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
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle">
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
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="totalProblem">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'problem',
  data() {
    return {
      currentPage: 1,
      inputText: '',
      problemData: [
        // problem_id: 0,
        // title: '',
        // auth: '',
        // acrate: ''
      ],
      pageSize: 40,
      totalProblem: 0
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPate = val;
      this.$axios
        .get(
          this.$globle.GLOBLE_BASEURL +
          "/problem/" +
          "?limit=" + this.pageSize +
          "&offset=" + (this.currentPage - 1) * this.pageSize +
          "&auth=" + "Public" +
          "&search=" + this.inputText
        )
        .then(response => {
          this.totalProblem = response.data.count;
          response.data.results.forEach( item => {
            item.acnum = 0;
            item.submission_number = 0;
            item.acrate = '0%';
          })
          this.problemData = response.data.results;
          let that = this;
          let promiseAll = this.problemData.map( item => { //先获得所有题总提交次数
            return that.$axios.get( that.$globle.GLOBLE_BASEURL + 
                                    '/judgestatus/?problem=' + item.problem_id);
          }).concat(
            this.problemData.map( item => {
              return that.$axios.get( that.$globle.GLOBLE_BASEURL + 
                                      '/judgestatus/?problem=' + item.problem_id + '&result=0');
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
          console.log(this.problemData);
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
    },
    handleClick(val) {
      this.$router.push({ name: 'problembody', params: { problemID: val }})
    },
    inputChange() {
      this.handleCurrentChange(1);
    }
  },
  created() {
    this.$axios
      .get( this.$globle.GLOBLE_BASEURL + '/problem/?limit=1' )
      .then( response => {
        this.totalProblem = response.data.count;
      })
      .catch( error => {
        this.$message.error("服务器错误" + error);
      });
    this.handleCurrentChange(1);
  }
}
</script>
<style scope>
#problem-row {
  position: relative;
  top: 20px;
}
.problem-block {
  display: block;
  text-align: center;
  margin-top: 10px;
}
.problem-table-button {
  padding: 0;
}
.problem-input input {
  border-radius: 20px;
  width: 26%
}
</style>