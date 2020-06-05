<template>
  <div id="problemmysubmission">
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: center; margin: 30px;font-weight: bold;font-size: 26px">我的提交</div>
        <statustable
          :propProblem="problemID"
          :propUserID="userID"></statustable>
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
      userID: window.sessionStorage.getItem('userName')
    }
  },
  created() {
    this.problemID = this.$route.params.problemID.toString();
  }
}
</script>
<style scope>
</style>