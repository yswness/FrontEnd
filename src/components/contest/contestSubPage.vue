<template>
  <div id="contestsub">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card>
          <el-menu
            class="contestsub-menu"
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1">
              <a href="/contest/:contestID/problem">比赛题目</a>
            </el-menu-item>
            <el-menu-item index="2">
              <a href="/contest/:contestID/">比赛题目</a>
            </el-menu-item>
            <el-menu-item index="3">
              <a href="/contest/:contestID/problem">比赛题目</a>
            </el-menu-item>
            <el-menu-item index="4">
              <a href="/contest/:contestID/problem">比赛题目</a>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//import contestproblem from './contestproblem'
//import contestproblemlist from './contestproblemlist'

export default {
  components: {
    //contestproblem,
    //contestproblemlist
  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    clickTab(tab) {
      console.log(tab);
    },
    handleSelect() {

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
/* .contestsub-tabs {
} */
</style>