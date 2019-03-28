<template>
  <div id="app">
    <router-view></router-view>
    <BottomNavBar/>
  </div>
</template>

<script>
import BottomNavBar from './components/BottomNavBar.vue'

export default {
  name: 'app',
  components: {
     BottomNavBar
  }
}
</script>

<style lang="less" scoped>

</style>
