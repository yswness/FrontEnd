<template>
  <el-card class="status-card">
    <el-table
      stripe
      :data="statusData"
      v-loading="loading"
      style="width: 100%"
      cell-class-name="status-cell"
      :cell-style="{textAlign:'center'}"
      :header-cell-style="{textAlign:'center'}">
      <el-table-column
        label="编号"
        width="74px">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="status-table-button"
            type="text"
            @click="handleClickStatus(scope.row.status_id)">
            {{ scope.row.status_id }}
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
            @click="handleClickProblem(scope.row.problem.problem_id)">
            {{ scope.row.title }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        :filters="resultsFilter"
        :filter-method="filterResult">
        <template slot-scope="scope">
          <el-button
            plain
            size="small"
            class="status-result-button"
            :type="changeType(scope.row.result)"
            @click="handleClickStatus(scope.row.status_id)">
            <i v-if="hasLoading(scope.row.result)" class="el-icon-loading"></i>
            {{ scope.row.result }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="运行时间"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="memory"
        label="运行内存"
        width="80px">
      </el-table-column>
      <el-table-column
        label="语言"
        width="50px">
        <template slot-scope="scope">
          <el-button
            size="small"
            class="status-table-button"
            type="text"
            @click="handleClickStatus(scope.row.status_id)">
            {{ scope.row.language }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="length"
        label="代码长度"
        width="80px">
      </el-table-column>
      <el-table-column
        label="提交账号"
        width="120px">
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
        width="164px">
      </el-table-column>
    </el-table>
    <div class="status-block">
      <el-pagination
        background
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="totalStatus">
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'statstable',
  props: {
    propStatusID:  { type: String, default: '' },
    propContestID: { type: String, default: '' },
    propUserID:    { type: String, default: '' },
    propProblem:   { type: String, default: '' },
    propResult:    { type: String, default: '' }
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalStatus: 0,
      statusData: [{
        status_id: 0,
        problem: {
          problem_id: '',
          title: ''
        },
        result: '',
        time: 0,
        memory: 0,
        length: 0,
        subtime: '',
        username: '',
        language: '',
        testcase: ''
      }],
      resultsFilter: this.$globle.RESULTFILTER,

      propData: {
        postStatusID:  this.propStatusID,
        postContestID: this.propContestID,
        postUserID:    this.propUserID,
        postProblem:   this.propProblem,
        postResult:    this.propResult
      }
    }
  },
  methods: {
    handleClickStatus(statusID) {
      this.$router.push({ name: 'globlesubmission', params: { submissionID: statusID }});
    },
    handleClickProblem(problemID) {
      this.$router.push({ name: 'problembody', params: { problemID }});
    },
    handleClickUser(userID) {
      this.$router.push({ name: 'User', params: { userID } })
    },
    changeType(result) {
      //console.log(result);
      return this.$globle.RESULTBUTTONTYPE[result];
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      //console.log(val);
      this.currentPage = val;
      this.getStatusData();
    },
    hasLoading(result) {
      if (result === 'Pending' || 
          result === 'Waiting'  || 
          result === 'Judging') return true;
      return false;
    },
    filterResult(value, row) {
      return value === row.result;
    },

    getStatusData() {
      this.loading = true;
      let postURL = this.$globle.GLOBLE_BASEURL + '/judgestatus/';
      if (this.propData.postStatusID === '') {
        postURL +=
        '?user='   + this.propData.postUserID +
        '&limit='   + this.pageSize +
        '&offset=' + (this.currentPage - 1) * this.pageSize +
        '&problem=' + this.propData.postProblem +
        '&result='  + this.propData.postResult +
        '&contest=' + this.propData.postContestID
      } else {
        postURL += this.propData.postStatusID + '/';
      }
      console.log(postURL);
      this.$axios
        .get( postURL ) 
        .then(response => {
          if (this.propData.postStatusID !== '') {
            let resData = response.data;
            response.data.count = 1;
            response.data.results = [];
            response.data.results.push(resData);
            //response.data.result.length = 1;
          }
          console.log(response.data.results);
          let length = response.data.results.length;
          this.totalStatus = response.data.count;
          for (let i = 0; i < length; i++) {
            response.data.results[i].title =
              response.data.results[i].problem.problem_id + 
              '. ' + response.data.results[i].problem.title
            response.data.results[i].username = response.data.results[i].user.username;
            response.data.results[i].time = response.data.results[i].time + ' ms';
            response.data.results[i].memory = response.data.results[i].memory + ' KB';
            response.data.results[i].length = response.data.results[i].length + ' B';
            response.data.results[i].result = this.$globle.RESULTMAP[response.data.results[i].result];
            response.data.results[i].subtime = this.$moment(response.data.results[i].subtime).format('YYYY-MM-DD HH:mm:ss');
          }

          this.statusData = response.data.results;
          this.loading = false;
          //console.log(this.statusData[0]);
          /** code something */
        })
        .catch(error => {
          this.$message.error('服务器错误(' + error + ')');
          this.loading = false;
        });
      
    }
  },
  created() {
    this.getStatusData();
  }
}
</script>
<style scope>
.status-card {
  width: 90%;
  margin: 0 auto;
}
.status-cell .cell {
  padding: 0px;
}
.status-block {
  text-align: center;
}
</style>