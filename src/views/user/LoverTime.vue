<template>
  <div class="lovers">
    <!-- 情侣空间页面 ：成长值、情侣宝贝、两人的记录、纪念日 -->
    <mt-header title="相恋的每一天">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!--mescroll滚动区域的基本结构,为避免id重复导致的多次初始化,这里使用ref-->
    <div ref="mescroll" class="mescroll">
      <div>
        <!--内容...-->
        <span id="null">暂无相关数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import MeScroll from "mescroll.js"
import { setTimeout } from 'timers';

export default {
  name: "lovers",
  created() {},
  data() {
    return {
      mescroll: null, //mescroll实例对象
      dataList: [] //列表数据
    };
  },
  mounted: function() {
    //创建MeScroll对象
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
      // down:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则down可不用写了)
      up: {
        callback: this.upCallback,
        // 以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
        noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          //回到顶部按钮
          // src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "null", //父布局的id (1.3.5版本支持传入dom元素)
          // icon: "@/assets/mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      }
    });
  },
  methods:{
     //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page) {
      //联网请求
      // axios.get("xxxxxx", {
      //   params: {
      //     num: page.num, //页码
      //     size: page.size //每页长度
      //   }
      // }).then((response)=> {
      //   //请求的列表数据
        // let arr = response.data;
        let arr=[]
        //如果是第一页需手动制空列表
        if (page.num == 1) this.dataList = [];
        //把请求到的数据添加到列表
        this.dataList = this.dataList.concat(arr);
        //数据渲染成功后,隐藏下拉刷新的状态
        setTimeout(()=>{
   this.$nextTick(() => {
          this.mescroll.endSuccess(arr.length);
        })
        },1000)
     
      // }).catch((e)=> {
      //   //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      //   this.mescroll.endErr();
      // })
    }
  },
  // 进入路由时,恢复列表状态 
  beforeRouteEnter(to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      if (vm.mescroll) {
      	// 恢复到之前设置的isBounce状态
        if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
        // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
        if (vm.mescroll.lastScrollTop) {
          vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
          setTimeout(() => { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
            vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
          }, 16)
        }
      }
    })
  },
  // 离开路由时,记录列表状态
  beforeRouteLeave (to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true) // 允许bounce
      this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0)// 隐藏回到顶部按钮,无渐隐动画
    }
    next()
  },
  components: {}
};
</script>

<style lang="scss" scoped>
</style>
