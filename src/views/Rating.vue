<template>
  <div id="Rating">
    <el-row id="rating-row">
      <el-col id="rating-col" :span="12" :offset="6">
        <el-table
          :data="ratingData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="rank"
            label="#"
            width="50px">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户ID">
          </el-table-column>
          <el-table-column
            prop="contestNum"
            label="比赛场数"
            width="80px">
          </el-table-column>
          <el-table-column
            prop="rating"
            label="Rating"
            width="80px">
          </el-table-column>
        </el-table>
        <div class="rating-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalUser">
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
      totalUser: 0,
      ratingData: []
    }
  },
  method: {
    handleCurrentChange() {

    },
    handleSizeChange() {

    }
  }
}
</script>
<style scope>
#rating-row {
  position: relative;
  top: 20px;
}
#rating-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.rating-block {
  display: block;
  text-align: center;
  margin-top: 10px;
}
</style>