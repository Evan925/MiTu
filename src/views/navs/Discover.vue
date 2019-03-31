<template>
  <div class="discover">
    <mt-header title="发现">
      <mt-button class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- <p>刷新次数: {{ count }}</p> -->

      <!-- 轮播 -->
      <!-- <van-swipe :autoplay="3000" indicator-color="white" class="banner">
      <van-swipe-item v-for="(item,index) in images" :key="index">
        <img :src="item">
      </van-swipe-item>
      </van-swipe>-->
      <div class="content">
        <p class="null" v-if="isNull">没有数据</p>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import $ from "jquery"; //加载jQuery
import base from "@/assets/js/base";

export default {
  name: "discover",
  mounted() {
    // this.onRefresh()
    $(".null").height(window.screen.height - 44 - 50);
    $(".discover").height(window.screen.height - 44 - 50);
    base.initToggleMenu();
  },
  created() {
    this.onRefresh();
  },
  data() {
    return {
      images: [
        "http://i2.bvimg.com/682254/b3d3b31bb272c156.jpg",
        "http://i2.bvimg.com/682254/5249b3f672f9d7dd.jpg",
        "http://i2.bvimg.com/682254/339952ad93324f00.jpg"
      ],
      isNull: true,
      count: 0,
      isLoading: false,
      isFirstLoading: true
    };
  },
  methods: {
    onRefresh() {
       
      let _timer = setTimeout(() => {
        this.$toast("刷新成功");
        $(".null").remove();
        this.isNull = false;
        this.isLoading = false;
        this.count++;
        let template = '<p class="p">发现第' + this.count + "条记录</p>";
        let _content = $(".content");

        if (this.isFirstLoading) {
          this.isFirstLoading = !this.isFirstLoading;
          _content.html(template);
        } else {
          _content.html(template + _content.html());
        }
        clearTimeout(_timer);
      }, 1000);
    }
  },
  components: {
    // HelloWorld
  }
};
</script>
<style lang="scss" scoped>
.discover {
  text-align: center;
  // background: #f5cd79;
  // height: 736px;
  // margin: 0 0 50px 0;
  padding-bottom: 50px;
  h2 {
    margin: 0;
  }
  .banner {
    width: 100%;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.content {
  overflow-y: auto;
  height: 100%;
}
.p {
  width: 100%;
  color: aquamarine;
  height: 20px;
  background-color: #fff;
  border-bottom: 1px solid #999;
}
.null {
  height: 100%;
  color: red;
  text-align: center;
  margin-bottom: 0;
}
</style>
