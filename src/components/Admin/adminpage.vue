<template>
  <div id="adminpage">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-menu
          class="admin-menu"
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="1">
            <router-link :to="{ name: 'adminaddproblem'}">
              <div class="li-block">添加题目</div>
            </router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{ name: 'adminaddcontest'}">
              <div class="li-block">添加比赛</div>
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view/>
  </div>
</template>
<script>

export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(val) {
      console.log(val);
    }
  },
  created() {
    switch (this.$route.name) {
      case 'adminaddproblem': this.activeIndex = '1'; break;
      case 'adminaddcontest': this.activeIndex = '2'; break;
    }
  }
}
</script>
<style scope>
#adminpage {
  position: relative;
  margin-top: 20px;
}
.admin-menu a {
  text-decoration: none;
}
.admin-menu .li-block {
  width: 78px;
  text-align: center;
}
.admin-menu .el-menu-item {
  padding: 0;
}
/* .contestsub-tabs {
} */
</style>