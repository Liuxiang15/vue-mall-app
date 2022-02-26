<template>
  <div id="app">
    <!-- 加入动画 -->
    <transition
      :name="transitionName"
      :mode="$router.back ? 'out-in' : 'in-out'"
    >
      <router-view class="view"> </router-view>
    </transition>
  </div>
</template>
<script>
export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  data() {
    return {
      transitionName: 'left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'classify' && from.name === 'search') {
        this.$router.back = true;
      }
      // 从哪侧进入
      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
.view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
