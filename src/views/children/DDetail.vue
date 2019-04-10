<template>
  <div class="d-detail">
    <SubHeader :title="subTitle"/>
    <van-pull-refresh slot="loosing" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <div class="content">
        <div class="content-data">发现页面：用户表白详情页面 id= {{id}}</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import $ from "jquery"; //加载jQuery
import base from "@/assets/js/base";
import SubHeader from "@/components/SubHeader.vue";

export default {
  name: "DDetail",
  created() {},
  mounted() {
    base.showLoading(1000);
    base.init_app_content();
    this.init();
  },
  data() {
    return {
      subTitle: "表白内容详情",
      isLoading: false,
      id: this.$route.params.id
    };
  },
  methods: {
    init() {
      this.onRefresh();
    },
    onRefresh() {
      // base.showLoading(500)
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  },
  components: { SubHeader }
};
</script>

<style lang="scss" scoped>
.d-detail {
}
</style>
