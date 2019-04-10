<template>
  <div>
    <!-- <header class="mui-bar mui-bar-nav main-bar-header" id="main-bar-header">
      <a
        class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars mui-pull-left"
        href="javascript:"
      ></a>
      <h1 class="mui-title main-bar-title" id="main-bar-title">{{$route.name}}</h1>
    </header>-->
    <mt-header :title="titleName">
      <!-- <router-link to="/" slot="left"> -->
      <a href="javascript:" @click="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
      <!-- </router-link> -->
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import base from "@/assets/js/base";

export default {
  name: "SubHeader",
  data() {
    return {

    };
  },
  props: ["title"],
  computed:{
    titleName(){
     return this.title
    }
  },
  methods: {
    back() {
      base.back(this);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
