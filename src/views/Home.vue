<template>
  <div id="home">
    <announcements id="home-anno"></announcements>
  </div>
</template>

<script>
import announcements from '../components/home/Announcements.vue'

export default {
  components: {
    announcements
  }
}
</script>
<style scope>
#home-anno {
  position: relative;
  top: 20px;
}
</style>
