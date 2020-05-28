<template>
  <div id="user-demo">
    <el-row>
      <el-col :span="14" :offset="4">
        <el-card class="user-card">
          <div style="font-weight: bold;font-size: 30px;color: #a0a"> {{ userName }} </div>
          <ul style="padding: 10px">
            <li> Rating: <span style="font-weight: bold;font-size: 18px;color: #a0a"> {{ rating }} </span> </li>
            <li> {{ '真实姓名: ' + realName }} </li>
            <li> {{ 'Email:   ' + email }} </li>
            <li> {{ '个性签名: ' + signature}} </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  data() {
    return {
      userName: 'yswness',
      rating: 1900,
      realName: '杨某人',
      email: 'yswness@163.com',
      signature: '写前端头发掉的更快'
    }
  },
  methods: {
  },
  created() {
  }
}
</script>
<style scope>
#user-demo {
  position: relative;
  margin-top: 20px;
}
.user-card ul {
  line-height: 46px;
  font-family: verdana,arial,sans-serif;
  list-style: none;
}
</style>