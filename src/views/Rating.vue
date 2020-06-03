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
            width="80px">
          </el-table-column>
          <el-table-column
            label="用户ID">
            <template slot-scope="scope">
              <span :style="scope.row.style"> {{ scope.row.username }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ac_number"
            label="AC数量"
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
      ratingData: [
        // {rank: 1,
        // username: 'yswness',
        // ac_number: 5,
        // rating: 1990,
        // style: {
        //   'font-weight': 'bold',
        //   'font-size': '14px',
        //   'color': 'blue'
        // }}
      ]
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .get(
          this.$globle.GLOBLE_BASEURL +
          "/user/" +
          "?limit=" + this.pageSize +
          "&offset=" + (this.currentPage - 1) * this.pageSize
        )
        .then(response => {
          let preUserNumber = (this.currentPage - 1) * this.pageSize;
          for (let i = 0; i < response.data.results.length; i++) {
            response.data.results[i].rank = preUserNumber + i + 1;
            response.data.results[i].style = {
              'font-weight': 'bold',
              'font-size': '14px',
              'color': this.$globle.RATINGCOLOR(response.data.results[i].rating)
            }
          }
          this.ratingData = response.data.results;
          //console.log(this.problemData);
        })
        .catch(error => {
          this.$message.error('服务器错误(' + error + ')');
        });
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
    this.handleCurrentChange(1);
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