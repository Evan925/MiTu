<template>
  <div class="login-container" id="login-container">
    <mt-header title="登录">
      <router-link to="/register" slot="right">
        <mt-button class="go-register">注册</mt-button>
      </router-link>
    </mt-header>
    <div class="login-content">
      <!-- <div class="login-head">
        <h1>登录</h1>
      </div>-->
      <div class="login-body">
        <input name="username" type="text" v-model="username" placeholder="请输入用户名/邮箱...">
        <input name="password" type="password" v-model="password" placeholder="请输入密码...">
        <p>
          <a href="#" class="btn-go-register" @click="goRegister">没有账号？立即注册</a>
          <a href="#" class="btn-go-forget" @click="goForget">忘记密码？</a>
        </p>
        <span class="login-error-message">用户名或密码输入错误，请检查！</span>
        <button type="button" class="btn-login" @click="doLogin">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import store from "@/store";
import localStore from "@/Utils/localStore";
import cookie from "@/Utils/localStore";
import base from "@/assets/js/base";
import common from "@/Utils/common";

export default {
  name: "login",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      token: "",
      username: "mitu",
      password: "123456"
    };
  },
  methods: {
    init() {
      base.removeHandleRight();
      this.listenInputChange();
    },
    doLogin() {
      let _this = this;
      if (_this.username === "") {
        _this.showError(true, true, false, "请输入用户名！");
        // this.$Message.warning("请输入用户名！");
        return false;
      }
      if (_this.password === "") {
        _this.showError(true, false, false, "请输入密码！");
        //  this.$Message.warning("请输入密码！");
        return false;
      }
      $(".btn-login").attr("disabled", "disabled");
      base.onHandleRight();
      base.showLoading(1000);
      localStore.set("isLogin", true);
      _this.$Message.success("登录成功");
      _this.$router.push("/me");
      // // const loginSuccessTimer = setTimeout(() => {
      // //   _this.$axios
      // //     .post("http://localhost:24063/api/Login", {
      // //       username: _this.username,
      // //       password: _this.password
      // //     })
      // //     .then(res => {
      // //       console.log(res);
      // //       if (res.status === 200) {
      // //         if (res.data.code === 0) {
      // //           localStore.set("isLogin", true);
      // //           localStore.set("MiTuUserName", _this.username);
      // //           localStore.set("MiTuUser_token", res.data.token);
      // //           localStore.set(
      // //             "MiTuUser_loginIdentity",
      // //             res.data.loginIdentity
      // //           );
      // //           cookie.set(
      // //             ".AspNetCore.Identity.Application",
      // //             res.data.loginIdentity,
      // //             "s10"
      // //           );

      // //           _this.info();
      // //           _this.$Message.success("登录成功");
      // //           _this.$router.push("/me");
      // //         } else {
      // //           _this.$Message.error(res.data.message);
      // //         }
      // //       } else {
      // //         _this.$Message.error("登录失败");
      // //       }
      // //     })
      // //     .catch(error => {

      // //     });
      //   $(".btn-login").removeAttr("disabled");
      //   clearTimeout(loginSuccessTimer);
      // }, 2000);
    },
    goRegister() {
      //TODO:切换注册界面
      // this.$Message.success("TODO:切换到注册页面！");
      this.$router.push("/register");
    },
    goForget() {
      //TODO:切换找回密码界面
      this.$Message.success("TODO:切换到找回密码页面！");
    },
    listenInputChange() {
      let _this = this;
      //监听用户名输入和密码输入内容改变状态
      const timer = setTimeout(() => {
        $("input[name='username'],input[name='password']").change(function(e) {
          e.preventDefault();
          _this.showError();
        });
        clearTimeout(timer);
      }, 1);
    },
    showError(
      isShow = false,
      isUinput = true,
      isOther = true,
      text = "&nbsp;"
    ) {
      let _$uInput = $("input[name='username']"),
        _$pInput = $("input[name='password']"),
        _$error = $(".login-error-message");
      if (isShow && isOther) {
        _$error.text(text);
        _$error.addClass("show");
        return false;
      }
      if (isShow) {
        if (isUinput) {
          _$uInput.addClass("login-input-error");
          _$uInput.focus();
        } else {
          _$pInput.addClass("login-input-error");
          _$pInput.focus();
        }
        _$error.text(text);
        _$error.addClass("show");
      } else {
        _$uInput.removeClass("login-input-error");
        _$pInput.removeClass("login-input-error");
        _$error.html("&nbsp");
        _$error.removeClass("show");
      }
    },
    info(nodesc) {
      const _iTimer = setTimeout(() => {
        this.$Notice.info({
          title: "通知",
          desc: nodesc ? "" : "恭喜您登录成功，欢迎回到咪兔校园，emmmm~"
        });
        clearTimeout(_iTimer);
      }, 3000);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/app_backgrouds/login_bg.jpeg");
  // background-size: cover;
  overflow: hidden;
  .go-register {
    font-size: 12px;
  }
  .login-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 24px 65px;
    text-align: center;
    .login-head {
      margin-bottom: 15px;

      h1 {
        font-size: 30px;
        font-weight: bold;
        color: #f89cb8;
      }
    }
    .login-body {
      overflow: hidden;
      margin: 50% auto;
      // transform: translateY(-50%);
      input {
        width: 100%;
        height: 34px;
        padding-left: 10px;
        margin-bottom: 16px;
        border: 1px solid #cccccc;
        outline: none;
        border-radius: 5px;
      }
      input[name="password"] {
        margin-bottom: 12px;
      }
      .login-input-error {
        border: 1px solid red;
      }
      p {
        overflow: hidden;
        margin-bottom: 4px;
        .btn-go-register {
          float: left;
          text-decoration: initial;
          color: #999999;
        }
        .btn-go-forget {
          float: right;
          text-decoration: initial;
          color: #999999;
        }
      }
      .login-error-message {
        font-size: 12px;
        color: red;
        opacity: 0;
      }
      .show {
        opacity: 1;
      }
      .btn-login {
        font-size: 14px;
        width: 100%;
        height: 34px;
        background: #f89cb8;
        border-radius: 5px;
        color: #fff;
        border: none;
        outline: none;
        margin-top: 8px;
      }
    }
  }
}
</style>
