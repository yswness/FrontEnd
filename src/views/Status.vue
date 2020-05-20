<template>
  <div id="status">
    <el-row id="status-row">
      <el-col id="status-col" :span="14" :offset="5">
        <el-table
          stripe
          :data="statusData"
          :v-loading="loading"
          style="width: 100%">
          <el-table-column
            label="编号"
            width="80px">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="status-table-button"
                type="text"
                @click="handleClickStatus(scope.row.id)">
                {{ scope.row.id }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="题目"
            width="200px">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="status-table-button"
                type="text"
                @click="handleClickProblem(scope.row.problem_id)">
                {{ scope.row.problem }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-button
                plain
                size="small"
                class="status-result-button"
                :type="changeType(scope.row.result)"
                @click="handleClickStatus(scope.row.id)">
                {{ scope.row.result }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="运行时间">
          </el-table-column>
          <el-table-column
            prop="memory"
            label="运行内存">
          </el-table-column>
          <el-table-column
            label="提交语言">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="status-table-button"
                type="text"
                @click="handleClickProblem(scope.row.statusID)">
                {{ scope.row.language }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="length"
            label="代码长度">
          </el-table-column>
          <el-table-column
            label="提交账号">
            <template slot-scope="scope">
              <el-button
                size="small"
                class="status-table-button"
                type="text"
                @click="handleClickUser(scope.row.username)">
                {{ scope.row.username }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="subtime"
            label="提交时间"
            width="200px">
          </el-table-column>
        </el-table>
        <div class="status-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalStatus">
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
      loading: false,
      currentPage: 1,
      pageSize: 40,
      totalStatus: 1,
      statusData: [{
        id: 1,
        problem: {
          problem_id: '',
          title: ''
        },
        result: 'Accepted',
        time: 0,
        memory: 0,
        length: 0,
        subtime: '',
        username: 'yswness',
        language: 'C++',
        testcase: ''
      }]
    }
  },
  methods: {
    handleClickStatus(statusID) {
      console.log(statusID); //实现status跳转，记得看权限
    },
    handleClickProblem(problemID) {
      this.$router.push({ name: 'problembody', params: { problemID: problemID }});
    },
    handleClickUser(userID) {
      console.log(userID); //ID 跳转 ,上面这三个本来可以简化，但为了莫忘了都写上了
    },
    changeType(result) {
      console.log(result);
      if (result === 'Accepted') return 'success';
      else if (result === 'Wrong Answer') return 'danger'
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },

    getStatusData() {
      this.$axios
        .get(
          '/judgestatus/' +
          '?limit=' + this.pageSize +
          '&offset=' + (this.currentPage - 1) * this.pageSize +
          '/'
        ) //暂定
        .then(response => {
          //console.log(response);

          let length = response.data.results.length;
          for (let i = 0; i < length; i++) {
            response.data.results[i].time = response.data.results[i].time + ' ms';
            response.data.results[i].memory = response.data.results[i].memory + ' KB';
          }

          this.statusData[0].result = response.data.results;
          console.log(this.statusData[0]);
          /** code something */
        })
        .catch(error => {
          this.$message.error('服务器错误(' + error + ')');
        });
    }
  },
  created() {
    //this.getStatusData(); //不管3721先抓一次数据

    let that = this;
    this.$store.state.flusher = setInterval(() => {
      that.getStatusData();
    }, 5000); //5s 搞一次
  },
  destroyed() {
    clearInterval(this.$store.state.flusher); //离开页面停止刷新
  }
}
</script>
<style scope>
#status-row {
  position: relative;
  margin-top: 20px;
}
#status-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.status-block {
  display: block;
  text-align: center;
}
</style>
