<template>
  <el-row>
    <el-col id="anno-col" :span="12" :offset="6">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            <el-button 
              type="text" 
              @click="handleClick()">
              {{ scope.row.title }}
            </el-button>
          </template>
        </el-table-column>
          
        <el-table-column
          prop="date"
          label="时间"
          width="180">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{
        title: '欢迎来到XTUOJ',
        date: '2020-05-16'
      }, {
        title: '关于使用本OJ的注意事项',
        date: '2020-05-16'
      }]
    }
  },
  methods: {
    handleClick() {
      
    }
  }
}
</script>
<style scoped>
#anno-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>