<template>
  <div class="perZone">
    <!-- 个人空间页面：基本资料、认证信息、关注量、荣誉、个人动态、 -->
    <!-- <mt-header title="咪兔 - 个人空间">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header> -->
     <SubHeader :title="subTitle"/>

     <div class="content">
        <div class="content-data">
            <img :src="user.avatar" alt="">

        </div>
     </div>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import base from "@/assets/js/base";
import SubHeader from "@/components/SubHeader.vue";
let _this;

export default {
  name: "perZone",
  created() {
    _this=this;
  },
  mounted() {
    _this.init()
  },
  data() {
    return {
      user:{},
      userId:this.$route.params.userId, //非地址栏传参
      subTitle:'' //this.user.name+' 的个人空间'
    };
  },
  // props:['userId','visitUserId'], //通过地址栏传参 方可接收
  methods:{
    init(){
      base.init_app_content()
      _this.getUserInfo()
    },
    getUserInfo(){ 
      this.user={
        id:this.userId,
        avatar:'http://mitu-alliance.kuaiyunds.com/mitu-alliance/avatar/user_avatar_002.png',
        name:'咪兔校园'
      }
      this.subTitle=this.user.name+' 的空间'
      // _this.$axios.get(api.perzone.userInfo,{
      //   id:_this.$route.params.userId
      // }).then(res=>{
      //   console.log(res);
      //   _this.user=res.data.data;
      // })      
    }
  },
  components: {SubHeader}
};
</script>

<style lang="scss" scoped>


</style>
