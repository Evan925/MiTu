<template>
  <div class="me">
    <!-- <mt-header title="我的">
      <mt-button class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>-->
    <div class="content">
      <a class="logout" @click="logout " v-show="isShowLogoutBtn">注销</a>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import store from "@/store";
import localStore from "@/Utils/localStore";
import base from "@/assets/js/base";
import { Dialog } from "vant";

export default {
  name: "me",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      isShowLogoutBtn: localStore.isLogin()
    };
  },
  methods: {
    init() {
      base.initToggleMenu();
      base.init_app_content(0);   
    },
    logout() {
      Dialog.confirm({
        title: "提示",
        message: "您确定退出登录吗？"
      })
        .then(() => {
          localStore.set("isLogin", false);
          localStore.remove("MiTuUser_token");
          localStore.remove("MiTuUserName");

          this.isShowLogoutBtn = !this.isShowLogoutBtn;
          this.$Message.error("注销成功！");
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.me {
  // background-color: #f8a5c2;
}
.logout {
  // position: fixed;
  // top: 10px;
  // right: 10px;
  // color: red;
}
</style>
