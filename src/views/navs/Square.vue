<template>
  <div class="square">
    <!-- 广场：用户墙、心愿墙 -->
    <mt-header title="广场">
      <mt-button  class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content">
      <van-notice-bar :text="notice" left-icon="volume-o"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from "jquery" //加载jQuery
import base from "@/assets/js/base"

export default {
  name: "square",
  mounted(){
       base.initToggleMenu()
  }, 
  data() {
    return {
      notice:'咪兔校园，把心里 秘密都告诉咪兔吧，这里有表白墙，心愿墙，还有陪你聊天的咪兔哦。',
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    } 
    
  }
};
</script>
 
<style lang="scss" scoped>
.square {
  // background: #303952;
  height: 736px;
  text-align: center;
  h2 {
    margin: 0;
  }
}
</style>
