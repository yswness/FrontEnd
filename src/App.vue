<template>
  <div id="app">
    <el-row>
      <el-col class="app-col" :span="16" :offset="4">
        <el-menu
          :default-active=activeIndex
          :router="true"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#ffffff"
          text-color="#909399"
          active-text-color="#303133">
          <el-menu-item index="/">HOME</el-menu-item>
          <el-menu-item index="/contest">CONTEST</el-menu-item>
          <el-menu-item index="/problem">PROBLEM</el-menu-item>
          <el-menu-item index="/submission">STATUS</el-menu-item>
          <el-menu-item index="/rating">RATING</el-menu-item>
          <template v-if="!userName">
            <el-button 
              id="app-button-demo"
              @click="clickRegister"
              size="medium" round>
              Register
            </el-button>
            <el-button 
              id="app-button-demo"
              @click="clickLogin"
              type="primary" 
              size="medium" round>
              Login
            </el-button>
          </template>
          <template v-else>
            <el-dropdown 
              class="app-dropdown-demo"
              @command="handleCommand"
              trigger="click">
              <span class="app-dropdown-span-demo">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template v-if="isAdmin">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userDetail">用户信息</el-dropdown-item>
                  <el-dropdown-item command="setting">用户设置</el-dropdown-item>
                  <el-dropdown-item command="admin">admin</el-dropdown-item>
                  <el-dropdown-item command="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
              <template v-else>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userDetail">用户信息</el-dropdown-item>
                  <el-dropdown-item command="setting">用户设置</el-dropdown-item>
                  <el-dropdown-item command="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-menu>
      </el-col>
    </el-row>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "1",
      userName: window.sessionStorage.getItem('userName'),
      isAdmin: (window.sessionStorage.getItem('userType') === 'Admin' ||
                window.sessionStorage.getItem('userType') === 'Super Admin')
    }
  },
  methods: {
    handleSelect(key, keyIndex) {
      console.log(key, keyIndex)
    },
    clickLogin() {
      this.$router.push({ name: 'Login' });
    },
    clickRegister() {
      this.$router.push({ name: 'Register' });
    },
    handleCommand(cmd) {
      if (cmd === 'logout') {
        window.sessionStorage.removeItem('userName');
        window.sessionStorage.removeItem('userType');
        window.sessionStorage.removeItem('userRating');

        this.$axios
          .get(this.$globle.GLOBLE_BASEURL + '/logout/')
          .then(() => {
            this.userName = '';
            this.isAdmin = false;
            this.$router.go(0); //是否直接跳转到主页面
          })
          .catch(error => {
            this.$message.error('服务器错误(' + error + ')');
          })
      } else
      if (cmd === 'userDetail') {
        console.log('hi');
        this.$router.push({ name: 'User', params: { userID: this.userName }});
      } else
      if (cmd === 'setting') {
        this.$router.push({ name: 'Setting' });
      } else
      if (cmd === 'admin') {
        this.$router.push({ name: 'adminaddproblem' });
      }
    },
    created() {
    }
  }
}
</script>
<style scope>
#app-button-demo {
  float: right;
  margin: 10px;
}
.app-dropdown-demo {
  float: right;
}
.app-dropdown-span-demo {
  float: left;
  padding: 19px;
  cursor: pointer;
  -webkit-transition: all .2s;
  -moz-transition: all .2s;
  -ms-transition: all .2s;
  -o-transition: all .2s;
  transition: all .2s;
}
.app-dropdown-span-demo:hover {
  background-color: #cccccc;
}
.app-col {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>