<template>
  <div id="problembody">
    <div id="problembody-head">
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
            <span class="body-title">Problem Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="problemDes">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span class="body-title">Input Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="input">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span class="body-title">Output Description</span>
          </div>
          <div 
            class="problembody-des"
            v-html="output">
          </div>
        </el-card>
        <el-card class="problembody-card">
          <div class="problembody-sample">
            <div>
              <el-row v-for="(item, index) in sInput" :key="index">
                <span class="body-title"> {{ 'Sample Input ' + (index + 1) }} </span>
                <pre class="sampledata">{{ sInput[index] }}</pre>
                <span class="body-title"> {{ 'Sample Output ' + (index + 1) }} </span>
                <pre class="sampledata">{{ sOutput[index] }}</pre>
                <hr>
              </el-row>
            </div>

          </div>
        </el-card>
        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span class="body-title">Hint</span>
          </div>
          <div 
            class="problembody-des"
            v-html="hint">
          </div>
        </el-card>

        <el-card class="problembody-card">
          <div slot="header" class="problembody-card-header">
            <span class="body-title">Code</span>
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
import 'codemirror/mode/python/python'

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
      sInput: [],
      sOutput: [],
      hint: '',

      code: '',
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/x-c++src',
        lineNumbers: true,
        line: true
      },
      language: [{
        value: 'C++',
        label: 'C++'
      }, {
        value: 'C',
        label: 'C'
      }, {
        value: 'Java',
        label: 'Java'
      }, {
        value: 'Python2',
        label: 'Python2'
      }, {
        value: 'Python3',
        label: 'Python3'
      }],
      langValue: 'C++'
    }
  },
  methods: {
    handleSelectChange() {
      switch(this.langValue) {
        case 'C':       this.cmOptions.mode = 'text/x-csrc';   break;
        case 'C++':     this.cmOptions.mode = 'text/x-c++src'; break;
        case 'Java':    this.cmOptions.mode = 'text/x-java';   break;
        case 'Python2': this.cmOptions.mode = 'text/x-python'; break;
        case 'Python3': this.cmOptions.mode = 'text/x-python'; break;
      }
      console.log(this.cmOptions.mode);
    },
    handleSubmit() {
      let userName = window.sessionStorage.getItem('userName');
      let postCodeLength = this.code.length;
      if (postCodeLength > 65536) {
        this.$message.error('提交失败:您的代码长度超出了限制，最多不能超过65536个字符');
        return;
      }
      if (postCodeLength < 20) {
        this.$message.error('提交失败:您的代码长度过短，最少需要20个字符');
        return;
      }
      if (userName === '' || (!userName)) {
        this.$message.error('请先登录!');
        return;
      }
      this.$axios
        .post( this.$globle.GLOBLE_BASEURL + '/submitcode/', {
          problem: this.problemID,
          user: userName,
          code: this.code,
          language: this.langValue,
          length: postCodeLength
        })
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        })
        .catch(error => {
          this.$message.error('服务器错误' + error);
        })
    }
  },
  watch: {
    problemDes: function () {
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
      .get( "/api/problemdetail/" + this.problemID + '/')
      .then( response => {
        console.log(response);
        this.title = response.data['title'];
        this.time = response.data['time'];
        this.memory = response.data['memory'];
        this.input = response.data['input'];
        this.output = response.data['output'];
        this.sInput = JSON.parse(response.data['sinput']);
        this.sOutput = JSON.parse(response.data['soutput']);
        this.hint = response.data['hint'];
        this.problemDes = response.data['problemdes'];
      })
      .catch( error => {
        this.$message.error('服务器错误(' + error + ')');
      });
  },
  created() {
    this.problemID = this.$route.params.problemID;
    //require('ip');
    
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
.sampledata {
  margin: 1rem 0;
  padding: 10px;
  border-radius: .28571429rem;
  border: 1px solid rgba(34, 36, 38, .15);
  background-color: #f5f5f5;
  font-family: Consolas, Menlo, Monaco, "Courier New", monospace;
}
.body-title {
  font-weight: bold;
  font-size: 20px;
}
.problembody-select {
  margin-bottom: 20px;
  max-width: 140px;
}
.problembody-submit-button {
  margin: 10px;
  float: right;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
</style>