<template>
  <div>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-card>
          <el-table 
            class="contestrank-table"
            :data="tableData"
            border
            stripe
            size="small"
            cell-class-name="myCell"
            :cell-style="cellStyle"
            :header-cell-style="headerCellStyle"
            @cell-click="cellClick">
            <el-table-column 
              label="#"
              width="50px"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="user_id"
              label="User"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="ac_number"
              label="="
              width="70px"
              fixed>
            </el-table-column>
            <el-table-column 
              prop="total_time"
              label="罚时"
              width="70px"
              fixed>
            </el-table-column>
            <el-table-column 
              v-for="(item, index) in contestProblems"
              :key="index"
              :label="item.problemLabel"
              width="70px">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope, index)" type="text" size="small">查看</el-button> -->
                <span v-if="cellShow(scope, index)" :style="selectStyle(scope, index)">
                  {{ handleCellShow(scope, index) }}
                </span>
                <br>
                <span v-if="scope.row.problemdetail[index].is_ac">
                  {{ scope.row.problemdetail[index].last_ac }}
                </span>
              </template>
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
      tableData: [{
        user_id: 'yswness',
        total_time: 0,
        ac_number: 0,
        problemdetail: [{
            problem_rank: 0,
            is_ac: true,
            last_ac: '00:03',
            error_number: 0
          }, {
            problem_rank: 1,
            is_ac: false,
            last_ac: '',
            error_number: 2
          }, {
            problem_rank: 2,
            is_ac: true,
            last_ac: '00:07',
            error_number: 1
          }
        ]
      }, {
        user_id: 'yswness',
        total_time: 0,
        ac_number: 0,
        problemdetail: [{
            problem_rank: 0,
            is_ac: true,
            last_ac: '00:03',
            error_number: 0
          }, {
            problem_rank: 1,
            is_ac: false,
            last_ac: '',
            error_number: 2
          }, {
            problem_rank: 2,
            is_ac: true,
            last_ac: '00:07',
            error_number: 1
          }
        ]
      }], //榜单信息,拿到数据后会暂时存到这里
      contestProblems: [  //榜单列的信息
        { problemLabel: 'A' }, 
        { problemLabel: 'B' }, 
        { problemLabel: 'C' }, 
      ],

    }
  },
  created() {
    console.log('created');
  },
  methods: {
    cellClick() {

    },
    cellStyle(val) {
      let rtn = {};
      if (val.columnIndex != 1)  {
        rtn.textAlign = 'center';
      }
      rtn.padding = '5px 0px';
      return rtn;
    },
    headerCellStyle(val) {
      if (val.columnIndex != 1)  {
        return {
          textAlign: 'center'
        }
      }
    },
    handleClick(val, index) {
      console.log(val);
      console.log(index);
    },
    cellShow(scope, index) {
      let detail = scope.row.problemdetail[index];
      if (detail.is_ac || detail.error_number > 0)
        return true;
      return false;
    },
    selectStyle(scope, index) {
      let detail = scope.row.problemdetail[index];
      if (detail.is_ac) return 'font-weight: bold;font-size: 13px;color: rgb(0, 170, 0);';
      else return 'font-weight: bold; font-size: 13px; color: red;'
    },
    handleCellShow(scope, index) {
      let detail = scope.row.problemdetail[index];
      let rtn = '-';
      if (detail.is_ac) rtn = '+'
      if (detail.error_number > 0) rtn += detail.error_number;
      return rtn;
    }
  }
}
</script>
<style scope>
.myCell .cell {
  line-height: 16px;
}
</style>