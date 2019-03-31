<template>
<div> 
  
</div>
 
</template>

<script>
 
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

<style lang="scss" scoped>

.bottom-nav-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2999;
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

 