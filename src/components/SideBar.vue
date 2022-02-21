<template>
  <div class="sidebar-wrapper" ref="side">
    <div
      v-for="(item, i) in sideBarList"
      :key="item"
      :class="{ active: index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i == 0 ? '全部' : item }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import { moveTo } from '../util/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState({
      sideBarList: (state) => state.sideBarList,
    }),
  },
  methods: {
    scrollTo(i, e) {
      console.log('scrollTo', i);
      if (this.move) {
        return;
      }
      this.index = i;
      const cTop = e.target.getBoundingClientRect().top;
      const sideTop = this.$refs.side.offsetTop;
      const sideHeight = this.$refs.side.offsetHeight / 2;
      this.moveScroll(this.$refs.side.scrollTop, (sideHeight - (cTop - sideTop)));
      //   const sonHeight = e.target.offsetHeight;
      //   const sonTop = e.target.getBoundingClientRect().top;
      //   const { sidebar } = this.$refs;
      //   const pTop = sidebar.getBoundingClientRect().top;
      //   const pHeight = sidebar.offsetHeight;
      //   sidebar.scrollTop += sonTop / 2 + sonHeight / 2 - pTop - pHeight / 2;
      //   moveTo(sidebar.scrollTop, sonTop / 2 + sonHeight / 2 - pTop - pHeight / 2,
      //   sidebar, 'scrollTop');
    },
    moveScroll(start, end) {
      if (this.move) {
        this.move = false;
        return;
      }
      let dis = 0;
      let speed = 5;
      if (end > 0) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.side.scrollTop = start + dis;
        if (Math.abs(dis) >= Math.abs(end)) {
          this.$refs.side.scrollTop = start - end;
          clearInterval(t);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less">
.sidebar-wrapper {
  position: fixed;
  left: 0px;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  div {
    width: 79px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    //   垂直居中
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    content: '';
  }
}
</style>
