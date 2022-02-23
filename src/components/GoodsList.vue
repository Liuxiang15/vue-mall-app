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
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <GoodsCard
            v-for="item in goodsList"
            :key="item"
            :title="item.title"
            :desc="item.desc"
            :price="item.price"
            :images="item.images"
            :tags="item.tags"
          />
          >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from './GoodsCard.vue';

export default {
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  components: {
    GoodsCard,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList,
    }),
  },
  methods: {
    onRefresh() {

    },
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
    onLoad() {

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
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
</style>
