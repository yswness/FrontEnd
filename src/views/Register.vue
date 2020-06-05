<template>
  <div id="register-demo">
    <el-card class="register-card">
      <div slot="header" class="clearfix">
        <span>Register in XTUOJ</span>
      </div>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="register-ruleForm" 
        @keyup.native.enter="submitForm('ruleForm')"
        status-icon>
        <el-form-item label="账户" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
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
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passCheck">
          <el-input type="password" v-model="ruleForm.passCheck" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="ruleForm.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="register-form-item">
          <el-button class="register-submit-button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
      ruleForm: {
        username: '',
        name: '',
        password: '',
        passCheck: '',
        email: '',
        school: '', // The Dic has not it
        classes: '',
        number: '',
        qq: ''     
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
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passCheck: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入qq', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.password = this.$md5(this.ruleForm.password);
          this.ruleForm.passCheck = this.$md5(this.ruleForm.passCheck); 
          this.$axios
            .post( this.$globle.GLOBLE_BASEURL + '/register/', this.ruleForm)
            .then( response => {
              console.log(response);
              if (response.data === 'The username already exists!') {
                this.$message.error('用户名已存在, 请重新输入用户名');
                return;
              }
              this.$message({
                message: '注册成功, 继续前往登录页面登录',
                type: 'success'
              });
              this.$router.push({ name: 'Login' });
            })
            .catch( error => {
              this.$message.error('服务器错误:(' + error + ')');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scope>
.register-card {
  width: 520px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 0px;
}
.register-clearfix:before
.register-clearfix:after {
  display: table;
  content: "";
}
.register-ruleForm {
  padding: 40px; 
  padding-bottom: 0px;
}
.register-form-item>div:first-child {
  text-align: right;
}
.register-ruleForm label.el-form-item__label {
  padding: 0 24px 0 0;
}
.register-ruleForm input.el-input__inner {
  width: 90%;
}
.register-form-item button {
  margin-right: 27px;
}
.register-form-item .submit-button {
  width: 84px;
  margin: 10px;
}
</style>