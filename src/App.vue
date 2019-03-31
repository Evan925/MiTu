<template>
  <div id="app">
    <!-- 欢迎页面组件 -->
    <div id="no-login-container" v-show="!isShowMain">
      <router-view></router-view>
    </div>
    <!--首页共用内容-->
    <!-- 主界面移动、菜单不动 -->
    <div
      class="mui-off-canvas-wrap mui-draggable main-container"
      id="is-login-container"
      v-show="isShowMain"
    >
      <!-- 菜单容器 -->
      <aside class="mui-off-canvas-left" id="offCanvasSide">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 菜单具体展示内容 -->
            <div class="main-meun-user">
              <a href="javascript:">
                <img
                  class="main-meun-user-avatar"
                  src="./assets/user_avatar/user_avatar_001.jpg"
                  alt="头像"
                >
                <span class="main-meun-user-nickname">提拉米苏の呆猫</span>
              </a>
            </div>
            <ul class="cmmon-menu-items">
              <li class="menu-item">
                <a href="javascript:">
                  <span class="mui-icon mui-icon-home"></span> # 首页
                </a>
              </li>
              <li class="menu-item">
                <a href="javascript:">
                  <span class="mui-icon mui-icon-person"></span> # 我的资料
                </a>
              </li>
              <li class="menu-item">
                <a href="javascript:">
                  <span class="mui-icon mui-icon-star"></span> # 我的钱包
                </a>
              </li>
              <li class="menu-item">
                <a href="javascript:">
                  <span class="mui-icon mui-icon-starhalf"></span> # 我的积分
                </a>
              </li>
              <li class="menu-item">
                <router-link to="/about" href="javascript:">
                  <span class="mui-icon mui-icon-info"></span> # 关于咪兔
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- 主页面容器 -->
      <div class="mui-inner-wrap" id="main-inner-content">
        <!-- 主页面标题 -->
        <!-- <header class="mui-bar mui-bar-nav main-bar-header" id="main-bar-header">
          <a class="mui-icon mui-action-menu mui-icon-bars mui-pull-left" href="#offCanvasSide"></a>
          <h1 class="mui-title main-bar-title" id="main-bar-title">发现</h1>
        </header>-->

        <!-- 主页面底部导航 -->
        <nav class="mui-bar mui-bar-tab main-bar-tab" id="main-bar-tab">
          <router-link to="/discover" class="mui-tab-item" title="发现">
            <span class="mui-icon mui-icon-paperplane"></span>
            <span class="mui-tab-label">发现</span>
          </router-link>
          <router-link to="/square" class="mui-tab-item" title="广场">
            <span class="mui-icon mui-icon-flag"></span>
            <span class="mui-tab-label">广场</span>
          </router-link>
          <a @click="showMore" class="mui-tab-item main-tab-publish" id="main-tab-publish">
            <div class="common-tab-publish-btn">
              <span class="mui-tab-label">
                <span class="mui-icon mui-icon-plusempty"></span>
              </span>
            </div>
          </a>
          <router-link to="/follows" class="mui-tab-item" title="关注">
            <span class="mui-icon mui-icon-star"></span>
            <span class="mui-tab-label">关注</span>
          </router-link>
          <router-link to="/me" class="mui-tab-item"  title="我的">
            <span class="mui-icon mui-icon-person"></span>
            <span class="mui-tab-label">我的</span>
          </router-link>
        </nav>

        <div class="mui-content mui-scroll-wrapper" id="mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 主内容渲染显示区域 通过路由方式渲染子页面-->
            <router-view></router-view>
          </div>
        </div>
        <div class="mui-off-canvas-backdrop"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import BottomNavBar from "./components/BottomNavBar.vue";
import localStore from "@/Utils/localStore";
import base from "@/assets/js/base";
import common from "@/Utils/common";
import { setTimeout } from "timers";

export default {
  name: "app",
  created() {},
  mounted() {
    this.init_app();
    this.onHandleLeft();
  },
  data() {
    return {
      isShowMain: localStore.isLogin()
    };
  },
  methods: {
    init_app() {
      let _appTimer = setTimeout(() => {
        let _wH = window.screen.height;
        document.querySelector("#app").style.height = _wH + "px";
        // console.log("_wH=>", _wH);
        clearTimeout(_appTimer);
      }, 1);
    },
    showMore() {
      this.$notify({
        message: "更多功能",
        duration: 1000,
        background: "#333"
      });
    },
    onHandleLeft() {
      // setTimeout(() => {
          let _dom=document.querySelector('.main-container')
        common.bindEvent(_dom, "swiperight", function() { base.toggle() });
      // }, 100);
    }
  },
  components: {
    // BottomNavBar
  }
};
</script>

<style lang="scss" scoped>
// .mui-scroll{
//   overflow-y: auto;
// }
#app > div {
  height: 100%;
}
</style>
