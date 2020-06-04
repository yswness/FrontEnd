<template>
  <div class="contestproblemlist">
    <el-row>
      <el-col :span="8" :offset="4">
        <template v-if="isVisible">
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
                    {{ scope.row.problemtitle }}
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
        </template>
        <template>
          <el-card class="box-card">
            <span>比赛说明</span>
            <ul>
              <li>比赛状态: {{ contestStatus }}</li>
              <li>比赛时间: {{ contestData.start_time }} 至 {{ contestData.end_time }}</li>
              <li>比赛语言: C, C++, Java, Python2, Python3</li>
            </ul>
          </el-card>
        </template>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contestStatus: '',
      isVisible: false,
      isStart: false,
      isEnd: false,
      contestID: 0,
      problemData: [/*{
        problem_id: 'A',
        problem: '1000',
        problemtitle: 'A + B',
        submission_number: 8,
        acnum: 5,
        acrate: '6%'
      }*/],
      contestData: [{
        start_time: '',
        end_time: ''
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
                                    '/judgestatus/?problem=' + item.problem +
                                    '&contest=' + that.contestID);
          }).concat(
            this.problemData.map( item => {
              return that.$axios.get( that.$globle.GLOBLE_BASEURL + 
                                      '/judgestatus/?problem=' + item.problem + '&result=0' +
                                      '&contest=' + that.contestID);
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
    this.$axios
      .get( 
        this.$globle.GLOBLE_BASEURL +
        '/contest/' + this.contestID + '/'
      )
      .then( response => {
        console.log(response);
        this.contestData = response.data;
        this.contestData.start_time = this.$moment(this.contestData.start_time).format('YYYY-MM-DD HH:mm:ss');
        this.contestData.end_time = this.$moment(this.contestData.end_time).format('YYYY-MM-DD HH:mm:ss');
        let nowToEnd = this.$moment(new Date()).diff(this.$moment(this.contestData.end_time));
        let nowToStart = this.$moment(new Date()).diff(this.$moment(this.contestData.start_time));

        if (nowToEnd > 0) {
          this.isEnd = true;
          this.contestStatus = '已结束';
        }
        else if (nowToStart > 0) {
          this.isStart = true;
          this.contestStatus = '比赛中'
        } 
        else {
          let during = nowToStart / 1000 * -1;
          this.contestStatus = '未开始, 距比赛开始还有: ' + parseInt(during / 3600) + ' 小时 '
                                                      + (parseInt(during / 60) % 60) + ' 分钟 '
                                                      + parseInt(during % 60) + ' 秒';

        }
        console.log(nowToEnd, nowToStart);

        let that = this;
        this.$axios
          .get( 
            that.$globle.GLOBLE_BASEURL + 
            '/contestparticipant/?contest=' + that.contestID +
            '&user=' + window.sessionStorage.getItem('userName')
          )
          .then( response2 => {
            that.isRegister = response2.data.length !== 0;
            if ((that.isRegister && that.isStart) || that.isEnd) {
              that.isVisible = true;
              this.initProblemList();
            }
          })
      })
      .catch( error => {
        this.$message.error('服务器错误' + error);
      })
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