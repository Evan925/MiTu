<template>
  <div class="popularity">
    <!-- 人气排行榜单：周榜、月榜、年度 -->
    <mt-header title="人气榜">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>


  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery

export default {
  name: "popularity",
  created() {},
  mounted() {},
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
