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
                @click="handleClickTitle(scope.row.contest_id)">
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
            prop="create_time"
            label="比赛时长"
            width="180px">
          </el-table-column>
          <el-table-column
            label="比赛注册"
            width="220px">
            <template slot-scope="scope">
              <template v-if="!scope.row.isRegister">
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
        create_time: '',
        isRegister: false
      }*/],
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .get( 
          this.$globle.GLOBLE_BASEURL +
          '/contest/?limit=' + this.pageSize +
          '&offset=' + ((this.currentPage - 1) * this.pageSize)
        )
        .then( response => {
          let contestData = response.data.results;
          for (let i = 0; i < contestData.length; i++) {
            let createTime = contestData[i].create_time;
            contestData[i].create_time =
              parseInt(createTime / 3600) + '小时' +
              (parseInt(createTime / 60) % 60) + '分钟' +
              parseInt(createTime % 3600) + '秒';
            contestData[i].start_time = 
              this.$moment(contestData[i].start_time).format('YYYY-MM-DD HH:mm:ss');
            

            // 用户是否注册该比赛?
            this.$axios
              .get( 
                this.$globle.GLOBLE_BASEURL + 
                '/contestparticipant/?contest=' + contestData[i].contest_id +
                '&user=' + window.sessionStorage.getItem('userName')
              )
              .then( response => {
                contestData[i].isRegister = false;
                if (response.data.length !== 0) {
                  contestData[i].isRegister = true;
                }
                if (i === contestData.length - 1) {
                  this.contestData = contestData;
                }
                //这个地方得注意,如果没有的话究竟返回了啥，这里直接用[]代替
              })
          }
        })
        .catch( error => {
          this.$message.error('服务器错误' + error);
        })
    },
    handleClickTitle(val) {
      this.$router.push({ name: 'contestsubpage', params: { contestID: val }})
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