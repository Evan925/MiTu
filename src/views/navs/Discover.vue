<template>
  <div class="discover">
    <div id="mescroll-container" ref="mescroll" class="mescroll content">
      <div>
        <van-notice-bar :text="notice.content" left-icon="volume-o"/>
        <!-- 轮播 -->
        <van-swipe :autoplay="5000" indicator-color="white" class="banner">
          <van-swipe-item v-for="(item,index) in banner" :key="index">
            <img :src="item" v-lazy="item">
          </van-swipe-item>
        </van-swipe>
        <div class="content-data">
          <!-- <p class="null" v-if="isNull">没有数据</p> -->
          <Card class="d-user-card" v-for="(item,index) in list" :key="index">
            <div slot="title" class="d-user-card-head">
              <img
                class="d-user-avatar mitu-circle"
                :src="item.avatar"
                @click="goUserPreZone(item.userId,$event)"
              >
              <div class="d-user-info">
                <h5 @click="goUserPreZone(item.userId,$event)">
                  {{item.nickname}}
                  <Icon v-if="item.sex==='男生'" class="mitu-female mitu-sex" type="md-female"/>
                  <Icon v-else-if="item.sex==='女生'" class="mitu-male mitu-sex" type="md-male"/>
                </h5>
                <p>{{item.time}}</p>
              </div>
            </div>
            <Button
              class="d-user-follow-btn"
              type="warning"
              slot="extra"
              @click="follow(item.userId,item.nickname,$event)"
              ghost
            >+ 关注</Button>
            <div class="d-user-card-body">
              <div class="d-user-card-content">
                <a href="javascript:" @click="getDetail(item.id)">{{item.content}}</a>
                <ul class="d-user-images" @click="showImagePreview(item.id)">
                  <li v-for="img in item.images" :key="img">
                    <img :src="img" v-lazy="img">
                  </li>
                </ul>
                <div class="d-user-position">
                  <span class="d-user-visit-count">浏览{{item.visit}}次</span>
                  <span>
                    <Icon type="ios-pin-outline"/>
                    <span>{{item.position}}</span>
                  </span>
                </div>
              </div>

              <div class="d-user-likes">
                <div class="d-like-left">
                  <img
                    class="d-user-like-avatar mitu-circle"
                    v-for="likeAvatar in item.likes"
                    :key="likeAvatar"
                    :src="likeAvatar"
                    v-lazy="likeAvatar"
                  >
                </div>
                <div class="d-like-right">
                  <i
                    class="d-user-like-common-btn iconfont icon-dianzan2"
                    @click="clap(item.id,$event)"
                  ></i>
                  <i class="d-user-like-common-btn iconfont icon-pinglun" @click="comment(item.id)"></i>
                  <i
                    class="d-user-like-common-btn iconfont icon-aixin1"
                    @click="collect(item.id,$event)"
                  ></i>
                  <!-- <Icon
                    class="d-user-like-common-btn"
                    @click="clap(item.id)"
                    type="ios-hand-outline"
                  />
                  <Icon
                    class="d-user-like-common-btn"
                    @click="comment(item.id)"
                    type="ios-text-outline"
                  />-->
                  <!-- <Icon
                    class="d-user-like-common-btn"
                    @click="collect(item.id)"
                    type="ios-heart-outline"
                  />-->
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import MeScroll from "mescroll.js";
import store from "@/store";
import base from "@/assets/js/base";
import api from "@/Utils/api";

import { Toast, Dialog } from "vant";

let _this;
export default {
  name: "discover",
  mounted() {
    base.initToggleMenu();
    base.init_app_content(0);
    this.init();
  },
  created() {
    _this = this;
  },
  data() {
    return {
      isOk: true, //监听请求完成状态 防止重复请求
      mescroll: null,
      list: [],
      banner: [],
      notice: {},
      searchShow: false,
      searchKey: "",
      isNull: true,
      isFirstLoading: true
    };
  },
  methods: {
    init() {
      //初始化
      base.showLoading(1020);
      setTimeout(() => {
        this.getNotice();
        this.getBanner();
        this.init_scroll();
      }, 20);
    },
    init_scroll() {
      //创建MeScroll对象
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
        down: {
          callback: this.onRefresh
        } //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
        // up: {
        //   // callback: this.getList,
        //   // // 以下是一些常用的配置,当然不写也可以的.
        //   // page: {
        //   //   num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        //   //   size: 10 //每页数据条数,默认10
        //   // },
        //   // htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        //   // noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        //   // toTop: {
        //   //   //回到顶部按钮
        //   //   src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
        //   //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
        //   // },
        //   // empty: {
        //   //   //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
        //   //   warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
        //   //   icon: "./static/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
        //   //   tip: "暂无相关数据~" //提示
        //   // }
        // }
      });
    },
    onRefresh() {
      base.throttle(this.getList(), 100, 1000);
    },
    getList() {
      _this.$axios
        .get(api.discover.list)
        .then(res => {
          if (res.status === 200) {
            let _resData = res.data.data;
            // _this.list = _resData.concat(_this.list); //进行数据合并
            _this.list = _this.list.concat(_resData); //进行数据合并
            // _this.list =_this.list.splice(0,0,_resData);//指定位置插入数据splice
            //数据渲染成功后,隐藏下拉刷新的状态
            setTimeout(() => {
              _this.$nextTick(() => {
                _this.mescroll.endSuccess(_resData.length);
              });
            }, 2000);

            console.log(res);
          } else _this.$toast("刷新失败！");
        })
        .catch(error => {
          //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          _this.mescroll.endErr();
          console.log(error);
        });
    },
    getBanner() {
      //加载轮播图
      _this.$axios
        .get(api.discover.banner)
        .then(res => {
          if (res.status === 200) {
            _this.banner = res.data.data;
            console.log(res);
          } else _this.$toast("刷新失败！");
        })
        .catch(error => {
          console.log(error);
        });
    },
    getNotice() {
      //加载公告
      _this.$axios
        .get(api.discover.notice)
        .then(res => {
          if (res.status === 200) {
            _this.notice = res.data.data[0];
            console.log(res);
          } else _this.$toast("刷新失败！");
        })
        .catch(error => {
          console.log(error);
        });
    },
    search() {
      this.searchShow = !this.searchShow;
    },
    onSearch() {},
    onCancel() {
      this.searchShow = !this.searchShow;
    },
    getDetail($id) {
      this.$router.push({
        name: "DDetail",
        params: {
          id: $id
        }
      });
    },
    follow($id, $nickname, event) {
      Dialog.confirm({
        title: "提示",
        message: "您确定要关注 " + $nickname + " 吗？ id=" + $id
      })
        .then(() => {
          Toast("关注成功 ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄");
          let _ele = event.target;
          if (event.toElement.localName === "span") {
            $(_ele)
              .parent()
              .addClass("has-follow");
            $(_ele).text("已关注");
          } else {
            $(_ele).addClass("has-follow");
            $(_ele)
              .find("span")
              .text("已关注");
          }
        })
        .catch(() => {
          Toast("好吧 (╯▽╰)");
        });
    },
    showImagePreview($id) {
      base.showImagePreview(this, api.common.images);
    },
    clap($id, event) {
      //击掌：点赞
      base.discover.setState({
        dom: event.target,
        successText: "您优雅的点了一个赞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
        cancelText: "emmm,您取消了点赞 Ծ‸Ծ"
      });
    },
    comment($id) {
      //评论
      this.getDetail($id);
    },
    collect($id, event) {
      // 收藏
      base.discover.setState({
        dom: event.target,
        successText: "收藏成功！",
        cancelText: "您取消了收藏！"
      });
    },
    goUserPreZone($userId, $visitUserId) {
      console.log($userId);
      console.log($visitUserId);
      // 用户中心
      Toast("进入用户个人空间");
      this.$router.push({
        name: "perZone",
        // path:'/perZone',
        params: {
          userId: $userId,
          visitUserId: $visitUserId
        }
      });
    }
  },
  // // 进入路由时,恢复列表状态
  //  beforeRouteEnter(to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
  //     next(vm => {
  //       if (vm.mescroll) {
  //       	// 恢复到之前设置的isBounce状态
  //         if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
  //         // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
  //         if (vm.mescroll.lastScrollTop) {
  //           vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
  //           setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
  //             vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
  //           }, 16)
  //         }
  //       }
  //     })
  //   },
  // // 离开路由时,记录列表状态
  // beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
  //   if (this.mescroll) {
  //     this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
  //     this.mescroll.setBounce(true) // 允许bounce
  //     this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
  //     this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
  //   }
  //   next()
  // },
  components: {
    // HelloWorld
  }
};
</script>
<style lang="scss" scoped>
.discover {
  // background-color: #f5cd79;
  background-color: #efeff4;
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
.d-user-card {
  margin: 5px 0;
  .ivu-card-head {
    padding: 14px 16px 10px 16px;
    .d-user-card-head {
      overflow: hidden;
      .d-user-avatar {
        float: left;
        width: 40px;
        height: 40px;
      }
      .d-user-info {
        float: left;
        padding-left: 10px;
        h5 {
          font-size: 14px;
          color: #333;
          font-weight: 700;
        }
        p {
          font-size: 10px;
          color: #999;
          font-weight: initial;
          margin-bottom: 0;
        }
      }
    }
  }
  .ivu-card-body {
    .d-user-card-body {
      overflow: hidden;
      .d-user-card-content {
        padding: 6px 12px;
        // padding-bottom: 8px;
        a {
          display: inline-block;
          width: 100%;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
          color: initial;
        }
        .d-user-images {
          overflow: hidden;
          li {
            float: left;
            width: 25%;
            height: 80px;
            padding: 0 2px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .d-user-position {
          margin-top: 4px;
          > span {
            font-size: 10px;
            color: #999;
            display: inline-block;
          }
          > span:first-child {
            margin-right: 5px;
          }
          > span:last-child > span {
            margin-left: 15px;
          }
          > span:last-child > i {
            font-size: 14px;
            position: relative;
          }
          > span:last-child > i::before {
            position: absolute;
            top: -8px;
          }
        }
      }

      .d-user-likes {
        width: 100%;
        height: 30px;
        overflow: hidden;
        // padding-top: 4px;
        padding: 0px 12px;
        padding-top: 6px;
        border-top: 1px solid #e8eaec;
        margin-bottom: 8px;
        box-sizing: border-box;

        .d-like-left {
          position: relative;
          width: 50%;
          overflow: hidden;
          height: 100%;
          float: left;
          .d-user-like-avatar {
            position: absolute;
            top: 0;
            width: 24px;
            height: 24px;
            border: 2px solid #fff;
          }
          .d-user-like-avatar:nth-child(2) {
            left: 16px;
          }
          .d-user-like-avatar:nth-child(3) {
            left: 32px;
          }
          .d-user-like-avatar:nth-child(4) {
            left: 48px;
          }
          .d-user-like-avatar:nth-child(5) {
            left: 64px;
          }
          .d-user-like-avatar:nth-child(6) {
            left: 80px;
          }
        }

        .d-like-right {
          width: 50%;
          overflow: hidden;
          height: 100%;
          float: left;
          position: relative;
          text-align: right;
          .d-user-like-common-btn {
            font-size: 20px;
            margin-left: 14px;
          }
          .d-like-active::before {
            color: #fe8cbf;
          }
        }
      }
    }
  }
}
.content-data:last-child .d-user-card {
  margin-bottom: 4px;
}

.ivu-btn-ghost.d-user-follow-btn:hover {
  background: #fff;
}

.d-user-follow-btn:hover,
.d-user-follow-btn {
  color: #fe8cbf !important;
  border-color: #fe8cbf;
  padding: 4px 8px;
}

.d-user-follow-btn:active {
  background-color: #f99cb7;
  box-shadow: #f99cb7;
}

.d-user-follow-btn:focus {
  box-shadow: 0 0 2px 1px rgba(254, 140, 191, 0.5);
}
</style>
