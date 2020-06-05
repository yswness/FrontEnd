<template>
  <div id="userTable">
    <el-row id="user-row">
      <el-col id="user-col" :span="12" :offset="6">
        <el-input
          class="admin-user-input"
          type="text"
          maxlength="64"
          minlength="1"
          placeholder="用户名/学号/班级"
          v-model="searchText"
          @change="inputChange">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
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
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            width="160px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">设置</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="user-block">
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
      searchText: '',
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
    inputChange() {
      console.log(this.searchText);
      this.handleCurrentChange(1);
    },
    handleEdit(index, val) {
      console.log(index, val);
      if (window.sessionStorage.getItem('userType') === 'Super Admin')
        this.$router.push({ name: 'adminuserchange', params: { userID: val.username } });
      else 
        this.$message.error('操作失败,只有超级管理员才能修改用户数据');
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$axios
        .get(
          this.$globle.GLOBLE_BASEURL +
          "/user/" +
          "?limit=" + this.pageSize +
          "&offset=" + (this.currentPage - 1) * this.pageSize +
          "&search=" + this.searchText
        )
        .then(response => {
          let preUserNumber = (this.currentPage - 1) * this.pageSize;
          for (let i = 0; i < response.data.results.length; i++) {
            response.data.results[i].rank = preUserNumber + i + 1;
          }
          this.ratingData = response.data.results;
          this.count = response.data.count;
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
#user-row {
  position: relative;
  top: 20px;
}
#user-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.user-block {
  display: block;
  text-align: center;
  margin-top: 10px;
}
.admin-user-input {
  margin-top: 10px;
  margin-left: 10px;
}
.admin-user-input input {
  border-radius: 20px;
  width: 200px;
}
</style>