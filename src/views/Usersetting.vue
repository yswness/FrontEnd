<template>
  <div id="setting-demo">
    <el-card class="setting-card">
      <div slot="header" class="clearfix">
        <span>用户设置</span>
      </div>
      <el-form 
        :model="settingForm" 
        :rules="rules" 
        ref="settingForm" 
        label-width="100px" 
        class="setting-ruleForm" 
        @keyup.native.enter="submitSetting('settingForm')"
        status-icon>
        <el-form-item label="账户">
          <span> {{ username }} </span>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="settingForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-input v-model="settingForm.classes" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="number">
          <el-input v-model="settingForm.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qq">
          <el-input v-model="settingForm.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="settingForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password" v-model="settingForm.oldPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="settingForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passCheck">
          <el-input type="password" v-model="settingForm.passCheck" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item class="setting-form-item">
          <el-button class="setting-submit-button" type="primary" @click="submitSetting('settingForm')">提交</el-button>
          <el-button @click="resetForm('settingForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.settingForm.passCheck !== '') {
          this.$refs.settingForm.validateField('passCheck');
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'));
      } else {
        if (value !== this.settingForm.password) {
          callback(new Error('两次输入密码不一致'));
        }
        callback();
      }
    }
    return {
      username: '',
      settingForm: {
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
    submitSetting(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let oldPass = this.$md5(this.settingForm.oldPassword);

          this.$axios
            .post( this.$globle.GLOBLE_BASEURL + '/login/', {
              username: this.username,
              password: oldPass
            })
            .then( response => {
              if (response.data === 'password error') {
                this.$message.error('原密码错误, 请重新输入');
                return;
              }

              let pass = this.$md5(this.settingForm.password);

              this.$axios
                .put( this.$globle.GLOBLE_BASEURL + '/userupdate/', {
                  username: this.username,
                  name: this.settingForm.name,
                  password: pass,
                  email: this.settingForm.email,
                  classes: this.settingForm.classes,
                  number: this.settingForm.number,
                  qq: this.settingForm.qq,  
                })
                .then( () => {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                })
                .catch( error => {
                  this.$message.error('服务器错误:(' + error + ')');
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