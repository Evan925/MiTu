<template>
  <!-- <transition name="fade"> -->
  <div class="register-container" id="register-container">
    <mt-header title="注册">    
        <mt-button icon="back" @click="back"  slot="left"></mt-button>     
    </mt-header>
    <div class="register-content">
      <!-- <div class="register-head">
        <h1>注册</h1>
      </div>-->
      <div class="register-body">
        <input name="username" type="text" v-model="username" placeholder="请输入用户名...">
        <input name="password" type="password" v-model="password" placeholder="请输入密码...">
        <input
          name="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="请再次确认密码..."
        >
        <p>
          <a href="#" class="btn-go-readTOS" @click="readTOS">
            <input name="isReadTOS" type="checkbox">已阅读并同意本站条款
          </a>
          <a href="#" class="btn-back-login" @click="backLogin">已有账号？返回登录</a>
        </p>
        <span class="register-error-message">用户名或密码输入错误，请检查！</span>
        <button type="button" class="btn-register" @click="doRegister">立即注册</button>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import $ from "jquery" //加载jQuery
import localStore from "@/Utils/localStore"
import base from '@/assets/js/base' 

export default {
  name: "Register",
  data() {
    return { 
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  created() {}, 
  methods: {
    back(){
     base.back(this)
    },
    doRegister() {
      let _this = this;
      this.$axios
        .post("http://localhost:24063/api/Register", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              _this.$Message.success("注册成功，这里应该直接登录！");
              _this.$router.push("/login");
              return false;
            }
            if (res.data.code === -1) {
              _this.$Message.error(res.data.message);
              return false;
            }
          } else {
            _this.$Message.error("注册失败！");
          }
        });
    },
    readTOS() {
      //TODO:打开阅读本站服务条款
      this.$Message.success("TODO:打开阅读本站服务条款弹窗！");
    },
    backLogin() {
      //TODO:切换登录界面
      // this.$Message.success("TODO:切换到登录页面！");
      this.$router.push("/login");
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.register-container {
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/app_backgrouds/login_bg.jpeg");
  // background-size: cover;
  overflow: hidden;

  .register-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding: 20px 65px;
    text-align: center;

    .register-head {
      margin-bottom: 15px;

      h1 {
        font-size: 30px;
        font-weight: bold;
        color: #f89cb8;
      }
    }
    .register-body {
      overflow: hidden;
      margin: 50% auto;
      input {
        width: 100%;
        height: 34px;
        padding-left: 10px;
        margin-bottom: 16px;
        border: 1px solid #cccccc;
        outline: none;
        border-radius: 5px;
        font-size: 14px;
      }

      input[name="confirmPassword"] {
        margin-bottom: 12px;
      }
      .register-input-error {
        border: 1px solid red;
      }

      p {
        overflow: hidden;
        margin-bottom: 4px;
        line-height: 18px;
        font-size: 12px;
        .btn-go-readTOS {
          float: left;
          text-decoration: initial;
          color: #999999;

          input[name="isReadTOS"] {
            width: 13px;
            height: 14px;
            margin-bottom: 0;
            vertical-align: middle;
          }
        }
        .btn-back-login {
          float: right;
          text-decoration: initial;
          color: #999999;
        }
      }
      .register-error-message {
        font-size: 12px;
        color: red;
        opacity: 0;
      }
      .show {
        opacity: 1;
      }
      .btn-register {
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
