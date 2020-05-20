<template>
  <div id="problembody">
    <div id="problembody-head">
      <!-- 菜单栏：待弄 -->
      <h2>{{'Problem.' + problemID + ' ' + title}}</h2>
      <ul id="problembody-ul">
        <li>{{'Time Limit: ' + time + ' ms'}}</li>
        <li>{{'Memory Limit: ' + memory + ' MiB'}}</li>
        <li>{{'Input File: ' + inputFile}}</li>
        <li>{{'Output File: ' + outputFile}}</li>
      </ul>
    </div>
    <el-row id="problembody-row">
      <el-col :span="12" :offset="6">
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Problem Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="problemDes">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Input Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="input">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Output Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="output">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Sample</span>
          </div>
          <div class="problembody-sample">
            <!-- sample code for? -->
            <div>
              <span style="font-weight: bold">Sample Input</span>
              <el-row class="pro-sam-input">
                <pre>{{ sInput }}</pre>
              </el-row>
              <span style="font-weight: bold">Sample Output</span>
              <el-row class="pro-sam-output">
                <pre>{{ sOutput }}</pre>
              </el-row>
            </div>

          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Hint</span>
          </div>
          <div 
            class="problembody-des"
            v-html="hint">
          </div>
        </el-card>

        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span>Code</span>
          </div>
          <el-select
            @change="handleSelectChange"
            class="problembody-select"
            v-model="langValue" 
            placeholder="请选择一个语言">
            <el-option
              v-for="item in language"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <codemirror
            v-model="code"
            :options="cmOptions">
          </codemirror>
          <el-button 
            class="problembody-submit-button"
            @click="handleSubmit"
            type="primary" 
            round>提交
          </el-button>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'

export default {
  components: {
    codemirror
  },
  data() {
    return {
      problemID: 1,
      contest: '',
      title: 'A + B',
      time: 0,
      memory: 0,
      inputFile: 'stdin',   // np
      outputFile: 'stdout', // np
      problemDes: '',
      input: '',
      output: '',
      sInput: '',
      sOutput: '',
      hint: '',

      code: '//Please wirte your code here',
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/x-c++src',
        lineNumbers: true,
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
      langValue: 'text/x-c++src'
    }
  },
  methods: {
    handleSelectChange() {
      this.cmOptions.mode = this.langValue;
      console.log(this.cmOptions.mode);
    },
    handleSubmit() {

    }
  },
  watch: {
    problemDes: function () { //一定要让problemDes最后传值
      console.log('data changed');
      let that = this;
      this.$nextTick()
        .then(function () {
          console.log(this);
          if (that.$MathJax.isInitMathjaxConfig === false) {
            that.$MathJax.initMathjaxConfig();
          }
          that.$MathJax.MathJaxHQ('problembody-row');
        });
    }
  },
  mounted() {
    this.$axios
      .get("/problem/" + this.problemID + "/")
      .then(response => {
        console.log(response);
        this.title = response.data.Problem['title'];
        this.time = response.data.Problem['time'];
        this.memory = response.data.Problem['memory'];
        this.input = response.data.Problem['input'];
        this.output = response.data.Problem['output'];
        this.sInput = response.data.Problem['sinput'];
        this.sOutput = response.data.Problem['soutput'];
        this.hint = response.data.Problem['hint'];
        this.problemDes = response.data.Problem['problemdes']; // warning 是否考虑用异步
      });
  },
  created() {
    this.problemID = this.$route.params.problemID;
    require('ip');
    
  }
}
</script>
<style scope>
#problembody-head {
  text-align: center;
}
#problembody-ul {
  list-style: none;
  padding-inline-start: 0;
  font-size: small;
}
.CodeMirror {
  border: 1px solid rgba(34, 36, 38, .15);
}
.problembody-des {
  word-break: break-all;
  white-space: pre-line;
}
.problembody-card {
  margin-top: 40px;
}
.pro-sam-input, .pro-sam-output {
  margin: 1rem 0;
  padding: 0em 1em;
  border-radius: .28571429rem;
  border: 1px solid rgba(34, 36, 38, .15);
  background-color: #f5f5f5;
  min-height: 33px;
}
.problembody-select {
  margin-bottom: 20px;
  max-width: 140px;
}
.problembody-submit-button {
  margin: 10px;
  float: right;
}
</style>