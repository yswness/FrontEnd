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
          <el-menu-item index="/status">STATUS</el-menu-item>
          <el-menu-item index="/rating">RATING</el-menu-item>
          <template v-if="!hasLogin">
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
                {{ this.$store.state.userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
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
      userName: this.$store.state.userName,
      hasLogin: this.$store.state.userName
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
    handleCommand() {
      this.$store.commit('logout');
      this.$router.go(0);
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