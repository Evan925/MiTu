<template>
  <div class="message">
    <!-- 消息页面：系统消息、用户消息、（普通消息、卡片消息） -->
    <mt-header title="消息">
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
  name: "message",
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
