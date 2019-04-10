<template>
  <div class="popularity">
    <!-- 人气排行榜单：周榜、月榜、年度 -->
    <!-- <mt-header title="人气榜">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>-->
    <SubHeader :title="subTitle" />
    <div class="content">
      <img src="../../assets/ui/popularity.jpg" alt>
    </div>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import base from "@/assets/js/base";
import SubHeader from "@/components/SubHeader.vue";

export default {
  name: "popularity",
  created() {},
  mounted() {
    this.init();
  },
  data() {
    return {
      subTitle:'人气榜单'
    };
  },
  props:['id'],
  methods: {
    init() {}
  },
  components: {
    SubHeader
  }
};
</script>

<style lang="scss" scoped>
.popularity {
  width: 100%;
  .content {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/ui/popularity.jpg");
    background-size: cover;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
