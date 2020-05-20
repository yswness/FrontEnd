<template>
  <div id="status">
    <el-row id="status-row">
      <el-col id="status-col" :span="12" :offset="6">
        <el-table
          stripe
          :data="statusData"
          :v-loading="loading"
          style="width: 100%">
          <el-table-column
            label="编号">
            <template slot-scope="scope">
              <el-button
                class="status-table-button"
                type="text"
                @click="handleClickStatus(scope.row.statusID)">
                {{ scope.row.statusID }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="题目">
            <template slot-scope="scope">
              <el-button
                class="status-table-button"
                type="text"
                @click="handleClickProblem(scope.row.statusID)">
                {{ scope.row.statusID }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-button
                class="status-result-button"
                :type="changeType(scope.row.result)"
                @click="handleClickStatus(scope.row.statusID)">
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
                class="status-table-button"
                type="text"
                @click="handleClickUser(scope.row.username)">
                {{ scope.row.username }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="subtime"
            label="提交时间">
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
      currentPage: 1,
      pageSize: 40,
      totalStatus: 0,
      statusData: [{
        status_id: 1,
        problem_id: 1000,
        result: 0,
        time: 0,
        memory: 0,
        length: 0,
        subtime: '',
        username: '',
        language: ''
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
      console.log(userID); //ID 跳转
    },
    changeType(result) {
      console.log(result);
    }
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
