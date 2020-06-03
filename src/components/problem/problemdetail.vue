<template>
  <div id="problemdetail">
    <el-row>
      <el-col :span="16" :offset="4">
          <el-menu
            class="problem-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1">
              <router-link :to="{ name: 'problembody'}">
                <div class="li-block">题面</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{ name: 'problemmysubmission', query: { problemID }}">
                <div class="li-block">我的提交</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="{ name: 'problemstatistics', query: { problemID }}">
                <div class="li-block">统计</div>
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
      activeIndex: '1',
      problemID: 0
    }
  },
  methods: {
    handleSelect(val) {
      console.log(val);
    }
  },
  created() {
    console.log(this.$route);
    this.problemID = this.$route.params.problemID;
    switch (this.$route.name) {
      case 'problembody':         this.activeIndex = '1'; break;
      case 'problemmysubmission': this.activeIndex = '2'; break;
      case 'problemstatistics':   this.activeIndex = '3'; break;
    }
  }
}
</script>
<style scope>
#problemdetail {
  position: relative;
  margin-top: 20px;
}
.problem-menu a {
  text-decoration: none;
}
.problem-menu .li-block {
  width: 78px;
  text-align: center;
}
.problem-menu .el-menu-item {
  padding: 0;
}
/* .contestsub-tabs {
} */
</style>