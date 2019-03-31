<template>
  <div class="follows">
    <mt-header title="关注">
      <mt-button  class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import base from "@/assets/js/base"

export default {
  name: "follows",
  mounted(){
    base.initToggleMenu()
  },
  created(){},
  methods:{
   
  },
  components: {
    // HelloWorld
  }
};
</script>
<style lang="scss" scoped>
.follows {
  // background: #3dc1d3;
  height: 736px;
  text-align: center;
  h2 {
    margin: 0;
  }
}
</style>
