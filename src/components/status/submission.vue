<template>
  <div id="submission">
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="margin-top: 20px">
          <statustable :propStatusID="statusID"></statustable>
        </div>
        <el-card class="code-card">
          <div slot="header" class="code-card-header">
            <span>Code</span>
          </div>
          <codemirror
            v-model="code"
            :options="cmOptions">
          </codemirror>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import statustable from '../statustable/statustable.vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'

export default {
  components: {
    statustable,
    codemirror
  },
  data() {
    return {
      code: `The code`,
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/x-c++src',
        readOnly: true,
        line: true
      },
      language: [{
        value: 'text/x-c++src',
        label: 'C++'
      }, {
        value: 'text/x-csrc',
        label: 'C'
      }, {
        value: 'text/x-java',
        label: 'Java'
      }],
      langValue: 'text/x-c++src',

      statusID: ''
    }
  },
  created() {
    this.statusID = this.$route.params.submissionID;
  }
}
</script>
<style scope>
.code-card {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
#submission .CodeMirror {
  font-family: monospace;
  height: auto;
  color: black;
  direction: ltr;
}
.code-card .el-card__header {
  padding: 8px 20px;
}
</style>