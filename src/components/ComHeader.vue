<template>
  <div class="com-header">
    <header class="mui-bar mui-bar-nav main-bar-header" id="main-bar-header">
      <a
        class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars mui-pull-left"
        href="javascript:"
      ></a>
      <h1 class="mui-title main-bar-title" id="main-bar-title">{{$route.name}}</h1>
    </header>
  </div>
</template>

<script>
import base from "@/assets/js/base";

export default {
  name: "ComHeader",
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.com-header{
overflow: hidden;
}
</style>
