<template>
  <div>
    <!-- 展示子组件 -->
    <router-view></router-view>
    <!-- 展示标签栏 -->
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

export default {
  components: {
    TabBar,
  },
};
</script>

<style>
</style>
