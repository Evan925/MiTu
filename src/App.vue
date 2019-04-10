<template>
  <div id="app">
    <!-- 欢迎页面组件 -->
    <!-- <div id="no-login-container" v-if="!isShowMain"> 
      <transition :name="$store.state.states">
        <router-view class="mitu-router"/>
      </transition>
    </div> -->
    <!--首页共用内容-->
    <!-- 主界面移动、菜单不动 -->
    <div
      class="mui-off-canvas-wrap mui-draggable main-container" id="">
      <!-- 菜单容器 -->
      <aside class="mui-off-canvas-left" id="offCanvasSide">
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <!-- 菜单具体展示内容 -->
            <div class="main-meun-user">
              <a href="javascript:">
                <img
                  class="main-meun-user-avatar"
                  src="http://mitu-alliance.kuaiyunds.com/mitu-alliance/avatar/user_avatar_001.jpg"
                  alt="头像"
                >
                <span class="main-meun-user-nickname">提拉米苏の呆猫</span>
              </a>
            </div>
            <ul class="cmmon-menu-items">
              <li class="menu-item">
                <router-link to="/discover" href="javascript:">
                  <span class="mui-icon mui-icon-home"></span> # 首页
                </router-link>
              </li>
              <li class="menu-item">
                <a href="javascript:">
                  <span class="mui-icon mui-icon-person"></span> # 我的资料
                </a>
              </li>
              <li class="menu-item">
                <router-link to="/popularity" href="javascript:">
                  <span class="mui-icon mui-icon-star"></span> # 人气榜单
                </router-link>
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
        <ComHeader/>

        <!-- <header class="mui-bar mui-bar-nav main-bar-header" id="main-bar-header">
          <a class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars mui-pull-left" href="#offCanvasSide"></a>
                    <a class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars mui-pull-left" href="javascript:"></a>
          <h1 class="mui-title main-bar-title" id="main-bar-title">{{$route.name}}</h1>
        </header>-->
        <!-- <mt-header title="发现">
      <mt-button class="toggle-menu-btn mui-icon mui-action-menu mui-icon-bars" slot="left"></mt-button>
      <mt-button @click="search" slot="right">
        <van-icon name="search"/>
      </mt-button>
        </mt-header>-->
        <!-- 主页面底部导航 -->
        <nav class="mui-bar mui-bar-tab main-bar-tab" id="main-bar-tab">
          <router-link to="/discover" @click.native="navClick" class="mui-tab-item" title="发现">
            <span class="mui-icon">
              <van-icon name="eye-o "/>
            </span>
            <span class="mui-tab-label">发现</span>
          </router-link>
          <router-link to="/square" @click.native="navClick" class="mui-tab-item" title="广场">
            <!-- <span class="mui-icon mui-icon-paperplane"></span> -->
            <span class="mui-icon" > <Icon type="ios-paper-plane-outline" /></span>           
            <span class="mui-tab-label">广场</span>
          </router-link>
          <a @click="showMore" class="mui-tab-item main-tab-publish" id="main-tab-publish">
            <div class="common-tab-publish-btn">
              <span class="mui-tab-label">
                <span class="mui-icon mui-icon-plusempty"></span>
              </span>
            </div>
          </a>
          <router-link to="/follows" @click.native="navClick" class="mui-tab-item" title="关注">
            <span class="mui-icon">
              <van-icon name="like-o"/>
            </span>
            <span class="mui-tab-label">关注</span>
          </router-link>
          <router-link to="/me" @click.native="navClick" class="mui-tab-item" title="我的">
            <span class="mui-icon">
              <van-icon name="friends-o"/>
            </span>
            <span class="mui-tab-label">我的</span>
          </router-link>
        </nav>
        <div class="mitu-content">
          <transition :name="$store.state.states">
            <router-view class="mitu-router"/>
          </transition>
        </div>

        <!-- <div class="mui-content mui-scroll-wrapper" id="mui-scroll-wrapper">
      
          <div class="mui-scroll">
            <transition :name="$store.state.states">
              <router-view class="mitu-router"/>
            </transition> 
          </div>

        </div>-->
        <div class="mui-off-canvas-backdrop"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import localStore from "@/Utils/localStore"
import base from "@/assets/js/base"
import common from "@/Utils/common"
import ComHeader from "./components/ComHeader.vue"
export default {
  name: "app",
  created() {},
  mounted() {
    let _this = this 
    window.addEventListener(
      "popstate",
      function(e) {
        _this.$store.commit("setTransition", "turn-off")
      },
      false
    );
  },
  data() {
    return {
      isShowMain: localStore.isLogin(),
      transitionName: "slide-right" // 默认动态路由变化为slide-right
    };
  },
  methods: {
    showMore() {
      this.$notify({
        message: "更多功能",
        duration: 1000,
        background: "#333"
      });
    },  
    navClick() {
      this.$store.commit("setTransition", "turn-on");
    } 
  },
  components: {
    ComHeader
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  overflow: hidden;
  > div {
    height: 100%;
  }
  .main-container {
    .mui-scroll {
      box-sizing: border-box;
      .main-meun-user {
        height: 120px;
        // line-height: 120px;
        box-sizing: border-box;
        border-bottom: 1px solid #999;
        padding: 0 0 0 50px;
        a {
          display: inline-block;
          width: 100%;
          height: 34px;
          margin-top: 48px;
          line-height: 34px;
          img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 3px solid #fff;
            float: left;
            box-sizing: border-box;
          }
          span {
            float: left;
            color: #fff;
            margin-left: 5px;
          }
        }
      }
      .cmmon-menu-items {
        margin-top: 50px;
        padding: 0 50px;
        .menu-item {
          margin: 18px 0;
          a {
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
