<template>
  <div id="admin-user-setting">
    <el-card class="admin-setting-card">
      <div slot="header" class="clearfix">
        <span>用户设置</span>
      </div>
      <el-form 
        :model="settingForm" 
        :rules="rules" 
        ref="settingForm" 
        label-width="100px" 
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
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="settingForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户权限">
          <el-select v-model="settingForm.type" placeholder="选择用户权限等级">
            <el-option label="Public" value="Public"></el-option>
            <el-option label="Admin" value="Admin"></el-option>
            <el-option label="Super Admin" value="Super Admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitSetting('settingForm')">提交</el-button>
          <el-button @click="resetForm('settingForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "adminuserchange",
  data() {
    return {
      username: '',
      settingForm: {
        name: '',
        password: '',
        email: '',
        classes: '',
        number: '',
        qq: '',
        type: ''     
      },
      rules: {
        name: [
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        classes: [
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        number: [
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        qq: [
          { min: 1, max: 64, message: '长度应在 1 到 64 之间', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitSetting(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let putData = { username: this.username };
          let keys = Object.keys(this.settingForm);
          for (let item of keys) {
            if (Boolean(this.settingForm[item]) === true) 
              putData[item] = this.settingForm[item];
          }
          if (this.settingForm.password !== '') {
            putData.password = this.$md5(this.settingForm.password);
          }
          this.$axios
            .put( this.$globle.GLOBLE_BASEURL + '/adminupdate/', putData )
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
    this.username = this.$route.params.userID;
  }
}
</script>
<style scope>
.admin-setting-card {
  width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 0px;
}
</style>