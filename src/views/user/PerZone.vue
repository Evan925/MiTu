<template>
  <div class="perZone">
    <!-- 个人空间页面：基本资料、认证信息、关注量、荣誉、个人动态、 -->
    <mt-header title="咪兔 - 个人空间">
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
  name: "perZone",
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
