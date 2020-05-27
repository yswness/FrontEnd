<template>
  <div id="mysubmission">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-card>
          <el-table
            stripe
            :data="statusData"
            :v-loading="loading"
            style="width: 100%"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{textAlign:'center'}">
            <el-table-column
              label="#"
              width="74px">
              <template>
                <router-link to="/"></router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="题目"
              width="200px">
              <template slot-scope="scope">
                <router-link 
                  :to="{ name: 'contestproblem', params: { problemKey: scope.row.problem.problem_id }}">
                  {{ scope.row.title }}
                </router-link>
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
              label="运行时间"
              width="90px">
            </el-table-column>
            <el-table-column
              prop="memory"
              label="运行内存"
              width="90px">
            </el-table-column>
            <el-table-column
              label="语言"
              width="70px">
              <template slot-scope="scope">
                <router-link 
                  :to="{ name: 'contestproblem', params: { problemKey: scope.row.problem.problem_id }}">
                  {{ scope.row.language }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="提交账号"
              width="120px">
              <template slot-scope="scope">
                <router-link to="/">
                  {{ scope.row.username }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="subtime"
              label="提交时间"
              width="164px">
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
      statusData: [{
        problem: { problem_id: 'A' }
      }],
      loading: false
    }
  },
  created() {
    console.log('created');
    //获取数据
  },
  methods: {
    changeType(result) {
      console.log(result);
      if (result === 'Accepted') return 'success';
      else if (result === 'Wrong Answer') return 'danger'
    },
    handleClickStatus(statusID) {
      console.log(statusID); //实现status跳转，记得看权限
    }
  }
}
</script>
<style scope>
#mysubmission {
  margin-top: 20px;
}
</style>