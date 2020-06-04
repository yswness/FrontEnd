<template>
  <div id="contest">
    <el-row id="contest-row">
      <el-col id="contest-col" :span="12" :offset="6">
        <el-table
          stripe
          border
          :data="contestData"
          style="width: 100%"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{textAlign:'center'}">
          <el-table-column
            label="比赛名称">
            <template slot-scope="scope">
              <el-button
                class="contest-table-button"
                type="text"
                @click="handleClickTitle(scope.row)">
                {{ scope.row.title }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="开始时间"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="during_time"
            label="比赛时长"
            width="180px">
          </el-table-column>
          <el-table-column
            label="比赛注册"
            width="220px">
            <template slot-scope="scope">
              <template v-if="scope.row.isEnd">
                <el-button
                  class="contest-register-button"
                  type="danger">
                  已结束
                </el-button>
              </template>
              <template v-else-if="!scope.row.isRegister">
                <el-button
                  class="contest-register-button"
                  type="primary"
                  @click="handleClickRegister(scope.row)">
                  注册
                </el-button>
              </template>
              <template v-else>
                <el-button
                  class="contest-register-button"
                  type="success">
                  您已注册
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="contest-block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalContest"
            layout="prev, pager, next, jumper">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      totalContest: 1,
      contestData: [/*{
        contest_id: 0,
        title: '测试比赛名称',
        start_time: '',
        during_time: '',
        isRegister: false
      }*/],
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      let that = this;
      this.$axios
        .get( 
          this.$globle.GLOBLE_BASEURL +
          '/contest/?limit=' + this.pageSize +
          '&offset=' + ((this.currentPage - 1) * this.pageSize)
        )
        .then( response => {
          let contestData = response.data.results;
          for (let i = 0; i < contestData.length; i++) {
            let duringTime = 
              this.$moment(contestData[i].end_time)
              .diff(this.$moment(contestData[i].start_time))
            duringTime /= 1000;
            contestData[i].during_time =
              parseInt(duringTime / 3600) + '小时' +
              (parseInt(duringTime / 60) % 60) + '分钟' +
              parseInt(duringTime % 3600) + '秒';
            contestData[i].start_time = 
              this.$moment(contestData[i].start_time).format('YYYY-MM-DD HH:mm:ss');
            
            let during = this.$moment(new Date()).diff(this.$moment(contestData[i].end_time));
            contestData[i].isEnd = (during > 0);

          }

          let promiseAll = contestData.map((item) => {
            let postURL = this.$globle.GLOBLE_BASEURL + 
                          '/contestparticipant/?contest=' + item.contest_id +
                          '&user=' + window.sessionStorage.getItem('userName')
            return that.$axios.get(postURL);
          });
          this.$axios.all(promiseAll).then(function (resArr) {
            resArr.forEach( (res, i) => {
            contestData[i].isRegister = false;
              console.log(res);
              if (res.data.length !== 0) {
                console.log('I got it' + i);
                contestData[i].isRegister = true;
              }
              if (i === contestData.length - 1) {
                that.contestData = contestData;
              }
            })
          });
        })
        .catch( error => {
          this.$message.error('服务器错误' + error);
        })
    },
    handleClickTitle(val) {
      this.$router
        .push({ name: 'contestsubpage', 
                params: { contestID: val.contest_id },
                query:  { isVisible: (val.isEnd == true || val.isRegister == true) }})
    },
    handleClickRegister(val) {
      this.$axios
        .post( this.$globle.GLOBLE_BASEURL + '/contestparticipant/', {
          user: window.sessionStorage.getItem('userName'),
          contest: val.contest_id
        })
        .then( () => {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          val.isRegister = true;
        })
        .catch( error => {
          this.$message.error('注册失败:服务器错误(' + error + ')');
        })
    }
  },
  created() {
    this.handleCurrentChange(1);
  }
}
</script>
<style scope>
#contest-row {
  position: relative;
  margin-top: 20px;
}
#contest-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.contest-block {
  display: block;
  text-align: center;
}
</style>