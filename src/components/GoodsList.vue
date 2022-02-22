<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type === 'all' }" @click="changeType('all')">
        综合
      </div>
      <div :class="{ active: type === 'sale' }" @click="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type === 'price-up',
          'price-down': type === 'price-down',
        }"
        @click="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'all',
    };
  },
  methods: {
    changeType(type) {
      //   this.type = type;
      //   if (type === 'price') {
      //     if (this.type === 'price-up') {
      //       this.type === 'price-down'
      //     }
      //     else if (this.type === 'price-down') {
      //       this.type === 'price-up'
      //     }
      //   }
      if (type === 'all' || type === 'sale') {
        this.type = type;
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        // 默认是向上的
        this.type = 'price-up';
      }
    },
  },
};
</script>

<style lang="less">
.list-header {
  display: flex;
  justify-content: flex-end;
  //   align-items: center;
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  box-sizing: border-box;
  > div {
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
    // 方便给伪元素定位
    position: relative;
  }
  .active,
  .price-up,
  .price-down {
    color: #ff1a90;
    font-weight: bold;
  }
  .price::before {
    content: '';
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    top: 4px;
    right: 2px;
  }
  .price::after {
    content: '';
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    bottom: 4px;
    right: 2px;
  }

  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down::after {
    border-top-color: #ff1a90;
  }
}
</style>
