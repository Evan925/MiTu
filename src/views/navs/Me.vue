<template>
  <div class="me">
    <h2>我的页面</h2>
    <a class="logout" @click="logout " v-show="isShowLogoutBtn">注销</a>
    <br>
    <button type="button" @click="testGetApiWithToken">测试获取数据（附带token）</button>
    
    <button type="button" @click="testGetCookies">测试获取当前登录用户的cookies</button>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import store from "@/store";
import localDataHelper from "@/Utils/localDataHelper";

export default {
  name: "me",
  data() {
    return {
      isShowLogoutBtn: localDataHelper.get("isLogin")
    };
  },
  created() {},
  methods: {
    logout() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定要注销当前登录吗？</p>",
        onOk: () => {
          localDataHelper.remove("isLogin");
          localDataHelper.remove("MiTuUser_token");
          localDataHelper.remove("MiTuUserName");

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
  background: #f8a5c2;
  height: 736px;
  text-align: center;
  h2 {
    margin: 0;
  }
}
.logout {
  position: fixed;
  top: 10px;
  right: 10px;
  color: red;
}
</style>
