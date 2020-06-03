<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card>
          <el-table 
            class="contestrank-table"
            :data="tableData"
            border
            stripe
            size="small"
            cell-class-name="myCell"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
            @cell-click="cellClick">
            <el-table-column 
              label="#"
              width="50px"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="user_id"
              label="User"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="ac_number"
              label="="
              width="70px"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="total_time"
              label="罚时"
              width="70px"
              fixed>
            </el-table-column>
            <el-table-column 
              v-for="(item, index) in contestProblems"
              :key="index"
              :label="item.problemLabel"
              width="70px">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope, index)" type="text" size="small">查看</el-button> -->
                <span v-if="cellShow(scope, index)" :style="selectStyle(scope, index)">
                  {{ handleCellShow(scope, index) }}
                </span>
                <br>
                <span v-if="scope.row.problemdetail[index].is_ac">
                  {{ scope.row.problemdetail[index].last_ac }}
                </span>
              </template>
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
      contestID: '',
      tableData: [/*{
        user_id: 'yswness',
        total_time: 0,
        ac_number: 0,
        problemdetail: [{
            problem_rank: 0,
            is_ac: true,
            last_ac: '00:03',
            error_number: 0
          }, {
            problem_rank: 1,
            is_ac: false,
            last_ac: '',
            error_number: 2
          }, {
            problem_rank: 2,
            is_ac: true,
            last_ac: '00:07',
            error_number: 1
          }
        ]
      }*/], //榜单信息,拿到数据后会暂时存到这里
      contestProblems: [  //榜单列的信息
        /*{ problemLabel: 'A' }, 
        { problemLabel: 'B' }, 
        { problemLabel: 'C' }, */
      ],

    }
  },
  created() {
    console.log('created');
    this.initRankBoard();
  },
  methods: {
    clearData() {
      this.tableData = [];
      this.contestProblems = [];
    },
    initRankBoard() {
      this.clearData();
      this.contestID = this.$route.params.contestID;

      this.$axios
        .get( this.$globle.GLOBLE_BASEURL + '/contestproblem/?contest=' + this.contestID )
        .then( response => {
          this.contestProblems = [];
          let contestProblems = [];
          let tableData = [];
          response.data.sort( (a, b) => { return a.rank - b.rank } );
          for (let problem of response.data) {
            let charOfLable = String.fromCharCode('A'.charCodeAt() + problem.rank - 1);
            contestProblems.push({
              problemLabel: charOfLable
            });
          }

          this.getParticipant(contestProblems, tableData); //得到参赛用户列表，默认已去重
        })
        .catch( error => {
          this.$message.error('服务器错误' + error);
        })
    },
    getParticipant(contestProblems, tableData) {
      let users = [];
      this.$axios
        .get( this.$globle.GLOBLE_BASEURL + '/contestparticipant/?contest=' + this.contestID )
        .then( response => {
          response.data.forEach( x => users.push(x.user) );
          if (users.length === 0) {
            return;
          }

          for (let user of users) {
            let userData = { user_id: user };
            let userTableData = [];
            this.$axios
              .get( 
                this.$globle.GLOBLE_BASEURL + 
                '/acmboard/?user=' + user +
                '&contest=' + this.contestID
              )
              .then( response => {
                userTableData = response.data;
                if (userTableData.length === 0) {
                  return;
                }
                userData.total_time = userTableData[0].total_time;
                userData.ac_number = userTableData[0].ac_number;
                userData.problemdetail = [];
                for (let problemData of userTableData) {
                  userData.problemdetail.push({
                    problem_rank: problemData.problem_rank - 1,
                    is_ac: problemData.is_ac,
                    last_ac: problemData.ac_time,
                    error_number: problemData.error_number
                  })
                }
                userData.problemdetail.sort( (a, b) => a.problem_rank - b.problem_rank );
                tableData.push(userData);
                if (tableData.length === users.length) {
                  tableData.sort( (a, b) => {
                    if (a.ac_number != b.ac_number) {
                      return b.ac_number - a.ac_number;
                    }
                    return a.total_time - b.total_time;
                  })
                  
                  this.contestProblems = contestProblems;
                  this.tableData = tableData;
                }
              })
              .catch( error =>  {
                this.$message.error('服务器出错(' + error + ')');
              });
            
          }
          console.log('cui is gay');
        })
        .catch( error => { 
          this.$message.error('服务器出错(' + error + ')')
        });
    },
    cellClick() {

    },
    cellStyle(val) {
      let rtn = {};
      if (val.columnIndex != 1)  {
        rtn.textAlign = 'center';
      }
      rtn.padding = '5px 0px';
      return rtn;
    },
    headerCellStyle(val) {
      if (val.columnIndex != 1)  {
        return {
          textAlign: 'center'
        }
      }
    },
    handleClick(val, index) {
      console.log(val);
      console.log(index);
    },
    cellShow(scope, index) {
      let detail = scope.row.problemdetail[index];
      if (detail.is_ac || detail.error_number > 0)
        return true;
      return false;
    },
    selectStyle(scope, index) {
      let detail = scope.row.problemdetail[index];
      if (detail.is_ac) return 'font-weight: bold;font-size: 13px;color: rgb(0, 170, 0);';
      else return 'font-weight: bold; font-size: 13px; color: red;'
    },
    handleCellShow(scope, index) {
      let detail = scope.row.problemdetail[index];
      let rtn = '-';
      if (detail.is_ac) rtn = '+'
      if (detail.error_number > 0) rtn += detail.error_number;
      return rtn;
    }
  }
}
</script>
<style scope>
.myCell .cell {
  line-height: 16px;
}
</style>