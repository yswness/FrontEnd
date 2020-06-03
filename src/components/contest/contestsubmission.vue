<template>
  <div id="contestsubmission">
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: center; margin: 30px;font-weight: bold;font-size: 26px">所有提交</div>
        <statustable
          :propContestID="contestID"></statustable>
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
      contestID: ''
    }
  },
  created() {
    this.contestID = this.$route.query.contestID;
  }
}
</script>
<style scope>
</style>