<template>
  <div class="square">
    <!-- 广场：用户墙、心愿墙 -->
    <!-- <mt-header title="广场">
      <mt-button  class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>-->
    <div class="content">
       <van-notice-bar :text="notice" left-icon="volume-o"/>
        <!-- 轮播 -->
        <van-swipe :autoplay="3000" indicator-color="white" class="banner">
          <van-swipe-item v-for="(item,index) in images" :key="index">
            <img :src="item">
          </van-swipe-item>
        </van-swipe>
        <div class="content-data">
        <h4 style="width:100%;height:100%;color:red;">暂无数据</h4>
        </div> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from "jquery"; //加载jQuery
import base from "@/assets/js/base";

export default {
  name: "square",
  mounted() {
    base.initToggleMenu();
    base.init_app_content(0);
  },
  data() {
    return {
        images: [
        "http://i2.bvimg.com/682254/b3d3b31bb272c156.jpg",
        "http://i2.bvimg.com/682254/5249b3f672f9d7dd.jpg",
        "http://i2.bvimg.com/682254/339952ad93324f00.jpg"
      ],
      notice:
        "咪兔校园，把心里 秘密都告诉咪兔吧，这里有表白墙，心愿墙，还有陪你聊天的咪兔哦。",
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
  // background-color: #303952; 
  h2 {
    margin: 0;
  }
  .banner {
    width: 100%;
    height: 120px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
