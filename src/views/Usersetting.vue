<template>
  <div id="setting-demo">
    <el-card class="setting-card">
      <div slot="header" class="clearfix">
        <span>用户设置</span>
      </div>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="setting-ruleForm" 
        @keyup.native.enter="submitForm('ruleForm')"
        status-icon>
        <el-form-item label="账户">
          <span> {{ username }} </span>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-input v-model="ruleForm.classes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
          <el-input v-model="ruleForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passCheck">
          <el-input type="password" v-model="ruleForm.passCheck" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item class="setting-form-item">
          <el-button class="setting-submit-button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        if (/^[a-zA-Z0-9_\-@$%^]+$/.test(value) !== true) {
          callback(new Error('用户名包含非法字符'));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.passCheck !== '') {
          this.$refs.ruleForm.validateField('passCheck');
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'));
      } else {
        if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致'));
        }
        callback();
      }
    }
    return {
      username: '',
      ruleForm: {
        name: '',
        password: '',
        oldPassword: '',
        passCheck: '',
        email: '',
        classes: '',
        number: '',
        qq: '',        
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 64, message: '长度应在 3 到 64 之间', trigger: 'blur' },
          { validator: validateUser, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        classes: [
          { required: true, message: '请输入班级', trigger: 'blur' },
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passCheck: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .put( this.$globle.GLOBLE_BASEURL + '/userupdate/', this.ruleForm)
            .then( () => {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            })
            .catch( error => {
              this.$message.error('服务器错误:(' + error + ')');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created() {
    this.username = window.sessionStorage.getItem('userName');
  }
}
</script>
<style scope>
.setting-card {
  width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 0px;
}
.setting-clearfix:before
.setting-clearfix:after {
  display: table;
  content: "";
}
.setting-ruleForm {
  padding: 40px; 
  padding-bottom: 0px;
}
.setting-form-item>div:first-child {
  text-align: right;
}
.setting-ruleForm label.el-form-item__label {
  padding: 0 24px 0 0;
}
.setting-ruleForm input.el-input__inner {
  width: 90%;
}
.setting-form-item button {
  margin-right: 27px;
}
.setting-form-item .submit-button {
  width: 84px;
  margin: 10px;
}
</style>