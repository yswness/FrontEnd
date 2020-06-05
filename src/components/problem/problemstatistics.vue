<template>
  <div id="problemstatistics">
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: center; margin: 30px;font-weight: bold;font-size: 26px">提交统计</div>
        <statustable
          :propProblem="problemID"
          :propResult="result"></statustable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import statustable from '../statustable/statustable.vue'

export default {
  components: {
    statustable
  },
  data() {
    return {
      problemID: '',
      result: '0'
    }
  },
  created() {
    this.problemID = (this.$route.params.problemID).toString();
  }
}
</script>
<style scope>
</style>