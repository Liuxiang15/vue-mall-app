<template>
  <div class="classify-wrapper">
    <div class="search-btn">
      <van-icon name="search"></van-icon>
      <div>苹果特价一元一斤</div>
    </div>
    <OneTab></OneTab>
    <SideBar></SideBar>
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    OneTab,
    SideBar,
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
