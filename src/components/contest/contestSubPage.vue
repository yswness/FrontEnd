<template>
  <div id="contestsub">
    <el-row>
      <el-col :span="16" :offset="4">
        <!--<el-card>-->
          <el-menu
            class="contestsub-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1">
              <router-link :to="{ name: 'contestsubpage'}">
                <div class="li-block">比赛题目</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link :to="{ name: 'mysubmission'}">
                <div class="li-block">我的提交</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link :to="{ name: 'submission'}">
                <div class="li-block">所有提交</div>
              </router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link :to="{ name: 'rank'}">
                <div class="li-block">比赛排行</div>
              </router-link>
            </el-menu-item>
          </el-menu>
          
        <!--</el-card>-->
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
      contestID: 0
    }
  },
  methods: {
    handleSelect(val) {
      console.log(val);
    }
  },
  created() {
    this.contestID = this.$route.params.contestID;
    switch (this.$route.name) {
      case 'contestsubpage': this.activeIndex = '1'; break;
      case 'mysubmission':   this.activeIndex = '2'; break;
      case 'submission':     this.activeIndex = '3'; break;
      case 'rank':           this.activeIndex = '4'; break;
    }
  }
}
</script>
<style scope>
#contestsub {
  position: relative;
  margin-top: 20px;
}
.contestsub-menu a {
  text-decoration: none;
}
.contestsub-menu .li-block {
  width: 78px;
  text-align: center;
}
.contestsub-menu .el-menu-item {
  padding: 0;
}
/* .contestsub-tabs {
} */
</style>