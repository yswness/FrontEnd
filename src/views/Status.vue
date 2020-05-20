<template>
  <div id="status">
    <el-row id="status-row">
      <el-col id="status-col" :span="12" :offset="6">
        <el-table
          stripe
          :data="statusData"
          style="width: 100%">
          <el-table-column
            prop="statusID"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="statusSubmitProblem"
            label="题目">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="runtime"
            label="运行时间">
          </el-table-column>
          <el-table-column
            prop="memory"
            label="运行内存">
          </el-table-column>
          <el-table-column
            prop="language"
            label="提交语言">
          </el-table-column>
          <el-table-column
            prop="author"
            label="提交账号">
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
      statusData: []
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
