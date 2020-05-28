<template>
  <div id="Rating">
    <el-row id="rating-row">
      <el-col id="rating-col" :span="12" :offset="6">
        <el-table
          :data="ratingData"
          stripe
          style="width: 100%"
          :cell-style="cellStyle"
          :header-cell-style="headerCellStyle">
          <el-table-column
            prop="rank"
            label="#"
            width="50px">
          </el-table-column>
          <el-table-column
            label="用户ID">
            <template slot-scope="scope">
              <span :style="scope.row.style"> {{ scope.row.userName }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contestNum"
            label="比赛场数"
            width="80px">
          </el-table-column>
          <el-table-column
            label="Rating"
            width="80px">
            <template slot-scope="scope">
              <span :style="scope.row.style"> {{ scope.row.rating }} </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="rating-block">
          <el-pagination
            background
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
      ratingData: [{
        rank: 1,
        userName: 'yswness',
        contestNum: 5,
        rating: 1990,
        style: {
          'font-weight': 'bold',
          'font-size': '14px',
          'color': 'blue'
        }
      }]
    }
  },
  methods: {
    handleCurrentChange() {

    },
    cellStyle(val) {
      if (val.columnIndex != 1)  {
        return {
          textAlign: 'center'
        }
      }
    },
    headerCellStyle(val) {
      if (val.columnIndex != 1)  {
        return {
          textAlign: 'center'
        }
      }
    }
  },
  created() {
    this.styleObj.color = 'red';
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