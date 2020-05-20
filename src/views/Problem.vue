<template>
  <div id="problem">
    <el-row id="problem-row">
      <el-col id="problem-col" :span="12" :offset="6">
        <div class="problem-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
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
          style="width: 100%">
          <el-table-column
            width="50px"
            ></el-table-column>
          <el-table-column
            prop="problemID"
            label="#"
            width="80px">
            </el-table-column>
          <el-table-column
            label="题目名称">
            <template slot-scope="scope">
              <el-button
                class="problem-table-button"
                type="text"
                @click="handleClick(scope.row.problemID)">
                {{ scope.row.problemTitle }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="totalSubmits"
            label="提交数"
            width="80px">
            </el-table-column>
          <el-table-column
            prop="ACSubmits"
            label="通过数"
            width="80px">
            </el-table-column>
          <el-table-column
            prop="ACrate"
            label="通过率"
            width="70px">
            </el-table-column>
        </el-table>
        <div class="problem-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalProblem">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'problem',
  methods: {
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log('当前页: ${val}');
      console.log(val);
    },
    handleClick(val) {
      this.$router.push({ name: 'problembody', params: { problemID: val }})
    }
  },
  data() {
    return {
      currentPage: 1,
      problemData: [{
        problemID: 0,
        problemTitle: '',
        totalSubmits: 0,
        ACSubmits: 0,
        ACrate: ''
      }],
      pageSize: 40,
      totalProblem: 1
    };
  },
  created() {
    this.$axios
      .get('/problem/?allproblem/')
      .then(response => {
        this.problemData = response.data.problemdata;
      });
    console.log(this.problemData);
  }
}
</script>
<style scope>
#problem-row {
  position: relative;
  top: 20px;
}
#problem-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.problem-block {
  display: block;
  text-align: center;
  margin-top: 10px;
}
.problem-table-button {
  padding: 0;
}
</style>