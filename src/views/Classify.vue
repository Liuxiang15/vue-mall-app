<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" to="/search">
      <van-icon name="search"></van-icon>
      <div>苹果特价一元一斤</div>
    </router-link>
    <OneTab></OneTab>
    <template v-if="showContent">
      <SideBar></SideBar>
      <GoodsList></GoodsList>
    </template>
    <van-loading size="2rem" vertical v-else></van-loading>
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
    }),
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
.classify-wrapper {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    // 垂直居中
    line-height: 33px;
    margin: 11px auto 0;
    border-radius: 10px;
    background-color: #eee;
    font-size: 14px;
    text-align: center;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
