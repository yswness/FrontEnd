<template>
  <div id="login-demo">
    <el-card class="login-card">
      <div slot="header" class="login-clearfix">
        <span>Login into XTUOJ</span>
      </div>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="50px" 
        class="login-ruleForm" 
        @keyup.native.enter="submitForm('ruleForm')"
        status-icon>
        <el-form-item label="账户" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item class="login-form-item">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var validateAccount = (rule, value, callback) => {
      console.log(this.ruleForm);
      if (value === '') {
        callback(new Error('请输入账户'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      console.log(this.ruleForm);
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      ruleForm: {
        account: '',
        pass: ''
      },
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
     
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pass = this.$md5(this.ruleForm.pass);
          console.log(pass);
          this.$axios
            .post( this.$globle.GLOBLE_BASEURL + "/login/", { // 请求账户信息 
              username: this.ruleForm.account,
              password: pass
            })
            .then(response => {
              // 密码是否错误 
              //console.log(response);
              if (response.data === 'password error') {
                this.$message.error('密码错误, 请重新输入密码');
                return;
              }

              window.sessionStorage.setItem("userName", this.ruleForm.account);
              window.sessionStorage.setItem("userType", response.data.type);
              window.sessionStorage.setItem("userRating", response.data.rating);

              that.$axios
                .post( that.$globle.GLOBLE_BASEURL + "/userlogindata/", {
                  username: that.ruleForm.account,
                  ip:       that.ruleForm.account,
                  msg:      that.ruleForm.account
                })
                .then(() => {
                  that.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  setTimeout(() => { that.$router.go(0); }, 500);
                  that.$router.push({ name: 'Home' });
                })
                .catch(error => {
                  that.$message.error(
                    "服务器错误！" + "(" + error + ")"
                  );
                  window.sessionStorage.removeItem("userName");
                  window.sessionStorage.removeItem("userType");
                  window.sessionStorage.removeItem("userRating");
                });
            })
            .catch(error => {
              this.$message.error('登录失败:(' + error + ')'); //加原因
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      }); 
    }
  }
}
</script>
<style scope>
.login-card {
  width: 480px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 0px;
}
.login-clearfix:before
.login-clearfix:after {
  display: table;
  content: "";
}
.login-ruleForm {
  padding: 40px; 
  padding-bottom: 0px;
}
.login-form-item>div:first-child {
  text-align: center;
}
.login-form-item button {
  width: 84px;
}
</style>