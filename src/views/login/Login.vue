<template>
  <div class="login" id="login">
    <h2>登录、注册页面</h2>
    <div class="login-content">
      <input placeholder="请输入token..." type="text" v-model="token" @keydown.enter="doLogin">
      <button type="button" @click="doLogin">登录</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import store from "@/store";

export default {
  name: "login",
  created() {},
  data() {
    return {
      token: ""
    };
  },
  methods: {
    doLogin() {
      if (this.token === "") {
        console.log("请输入token");
      } 
      else {
        store.state.token = this.token  
        store.state.hasLogin=true
        console.log(this.token)
        this.$router.push('/me') 
           console.log("token：", store.state.token)
      }
    }
  },
  components: {
    // HelloWorld
  }
};
</script>
<style lang="less" scoped>
.login {
  text-align: center;
  background: #ff6666;
  height: 736px;
  h2 {
    color: white;
    font-size: 14px;
  }
  .login-content {
    width: 300px;
    margin: auto;
    input {
      box-sizing: border-box;
      border: none;
      outline: none;
      padding: 10px; 
      width: 240px;
      height: 36px;
      vertical-align: bottom;
    }
    button {
       box-sizing: border-box;
      border: none;
      outline: none; 
      width: 60px;
      height: 36px;
      
    }
  }
}
</style>
