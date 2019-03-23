<template>
  <div class="me">
      <h2>我的页面</h2>  
       <a class="logout" @click="logout" v-show="isShowLogoutBtn">注销</a>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import store from "@/store";
export default {
  name: 'me',
  data(){ 
    return{
       isShowLogoutBtn:store.state.hasLogin
    }
  },
  created(){
      console.log(store.state.hasLogin)
      console.log(store.state)
  },
   methods:{
    logout(){
      store.state.token=''
       store.state.hasLogin=false
      this.isShowLogoutBtn= !this.isShowLogoutBtn
      
      // console.info("注销成功，isShowLogoutBtn="+this.isShowLogoutBtn+"  token="+store.state.token)
      this.$router.push('/login')
    }
  },
  components: {
    // HelloWorld
  }
}
</script>
<style lang="less" scoped>
.me{
  background: #f8a5c2;
  height: 736px;
  text-align: center;
  h2{
    margin: 0;
  }
}
.logout{
  position: fixed;
  top: 10px;
  right: 10px;
  color:red;
}
</style>
