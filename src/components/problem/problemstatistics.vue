<template>
  <div id="problemstatistics">
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: center; margin: 30px;font-weight: bold;font-size: 26px">提交统计</div>
        <statustable></statustable>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import statustable from '../statustable/statustable.vue'

export default {
  components: {
    statustable
  }
}
</script>
<style scope>
</style>