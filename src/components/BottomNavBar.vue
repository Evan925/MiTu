<template>
<div> 
 <div class="bottom-nav-bar">
      <router-link class="nav-bar-item" to="/discover">发现</router-link>
      <router-link class="nav-bar-item" to="/follows">关注</router-link>
      <router-link class="nav-bar-item" to="/message">消息</router-link>
      <router-link class="nav-bar-item" to="/me">我的</router-link>
  </div>
</div>
 
</template>

<script>
import store from '@/store'
export default {
  name: 'BottomNavBar',
  props: { 
    msg:String//用于接收父组件传值
  },
  data() {
    return {
     
    }
  },
 
}
</script>


<style scoped lang="less">

.bottom-nav-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 50px;
  background: white;
  text-align: center;
  line-height: 50px;
  box-sizing: border-box;
  .nav-bar-item{
    margin: 0 30px;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
