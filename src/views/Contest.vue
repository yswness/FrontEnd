<template>
  <div id="contest">
    <el-row id="contest-row">
      <el-col id="contest-col" :span="12" :offset="6">
        <el-table
          stripe
          border
          :data="contestData"
          style="width: 100%">
          <el-table-column
            label="比赛名称">
            <template slot-scope="scope">
              <el-button
                class="contest-table-button"
                type="text"
                @click="handleClickTitle(scope.row.contest_id)">
                {{ scope.row.title }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="开始时间"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="比赛时长"
            width="180px">
          </el-table-column>
          <el-table-column
            label="比赛注册"
            width="220px">
            <template slot-scope="scope">
              <el-button
                class="contest-register-button"
                type="primary"
                @click="handleClickRegister(scope.row.contest_id)">
                注册
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="contest-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalContest"
            layout="prev, pager, next, jumper">
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
      pageSize: 20,
      totalContest: 1,
      contestData: [{
        contest_id: 0,
        title: '',
        start_time: '',
        create_time: ''
      }],
    }
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    handleClickTitle(val) {
      this.$router.push({ name: 'contestbody', params: { contest_id: val }})
    },
    handleClickRegister(val) {
      console.log(val);
    }
  },
  created() {
    let d = new Date(2020, 5, 30);
    this.contestData[0].start_time = d.toString();
    this.contestData[0].create_time = '4 hours';
  }
}
</script>
<style scope>
#contest-row {
  position: relative;
  margin-top: 20px;
}
#contest-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.contest-block {
  display: block;
  text-align: center;
}
</style>