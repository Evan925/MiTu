<template>
  <div class="signIn">
    <!-- 签到页面：签到、签到记录、签到排行 -->
    <mt-header title="签到">
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
  name: "siginIn",
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
