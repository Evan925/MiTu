<template>
  <div class="me">
   <mt-header title="我的">
      <mt-button class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <a class="logout" @click="logout " v-show="isShowLogoutBtn">注销</a>   
  </div>
</template>

<script>
import $ from "jquery" 
import store from "@/store"
import localStore from "@/Utils/localStore"
import base from "@/assets/js/base"

export default {
  name: "me", 
  created() {},
  mounted(){
    $('#no-login-container').hide()
    $('#is-login-container').show() 
    base.initToggleMenu() 
  },
  data() {
    return {
      isShowLogoutBtn: localStore.get("isLogin")
    };
  }, 
  methods: {
    logout() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定要注销当前登录吗？</p>",
        onOk: () => {
          localStore.set("isLogin",false);
          localStore.remove("MiTuUser_token");
          localStore.remove("MiTuUserName");
 
          this.isShowLogoutBtn = !this.isShowLogoutBtn;
          this.$Message.error("注销成功！");
          this.$router.push("/login");
        },
        onCancel: () => {}
      });
      this.rsetModal();
    },
    rsetModal() {
      const timer = setTimeout(() => {
        $(".ivu-modal-confirm-footer,.ivu-modal-content").css({
          "text-align": "center"
        });
        $(".ivu-btn-text").css({
          "border-color": "#cbcbcb"
        });
        $(".ivu-modal").css({
          margin: "15%"
        });
        $(".ivu-modal-confirm-body").css({
          "padding-left": "0"
        });
        clearTimeout(timer);
      }, 1);
    },
    testGetApiWithToken() { 
      this.$axios
        .get("http://localhost:24063/api/Values")
        .then(res => {
          console.log(res);
        });
    },
    testGetCookies() {
      this.$axios.get('http://localhost:24063/api/Login',{
        id:1
      }).then(res=>{
        console.log(res)
      })
    }
  },
  components: {
    // HelloWorld
  }
};
</script>
<style lang="less" scoped>
.me {
  // background: #f8a5c2;
  // height: 736px;
  text-align: center;
  h2 {
    margin: 0;
  }
}
.logout {
  // position: fixed;
  // top: 10px;
  // right: 10px;
  // color: red;
}
</style>
