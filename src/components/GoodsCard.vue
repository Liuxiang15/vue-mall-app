<template>
  <div class="card-wrapper van-hairline-bottom">
    <!-- 左边部分 -->
    <div class="card-img">
      <img :src="images[0]" alt="" ref="img" />
    </div>
    <!-- 右边 -->
    <div class="card-content">
      <!-- 从上到下 -->
      <!-- 文字需要加入溢出处理 -->
      <div class="title overflow-hidden">{{ title }}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div v-for="t in tags" :key="t">
          {{ t }}
        </div>
      </div>
      <div class="price">￥{{ price }}</div>
      <div class="counter">
        <div @touchend="counter(id, -1)" v-if="num">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num" v-if="num">{{ num }}</div>
        <div @touchend="counter(id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'id', 'num'],
  methods: {
    ...mapMutations(['storageChange']),
    counter(id, num) {
      console.log('enter counter', id, num);
      this.storageChange({ id, value: num });
      if (num === -1) {
        return;
      }
      // 飞入购物车，新生成一张图片
      // 图片的位置
      const { img: imgDom } = this.$refs;
      const imgDomRect = imgDom.getBoundingClientRect();
      const { top, left } = imgDomRect;
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = imgDomRect;
      const shopCar = document.getElementById('shop-car');
      // 购物车的位置
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();
      // 购物车宽高
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight,
      });
    },

  },
};
</script>

<style lang='less'>
// 卡片会复用
.card-wrapper {
  width: 100%;
  display: flex;
  height: 100px;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;

    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      margin-top: 5px;
    }
    // 都写margin-top,避免margin塌陷、合并问题
    .desc {
      color: #aaa;
      font-size: 10px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .price {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
    .counter {
      position: absolute;
      right: 15px;
      bottom: 12px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          // 高度自适应
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }

  .overflow-hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
