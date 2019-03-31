<template>
  <div class="lovers">
    <!-- 情侣空间页面 ：成长值、情侣宝贝、两人的记录、纪念日 -->
    <mt-header title="相恋的每一天">
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
  name: "lovers",
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
