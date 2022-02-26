<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="placeholder"
        @search="onSearch"
        @cancel="onCancel"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showLikeList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <!-- 动画用到ID -->
          <van-icon
            :badge="badge"
            name="cart-o"
            id="shop-car"
            class="shop-car"
          ></van-icon>
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showLikeList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"> </span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showLikeList">
      <van-list
        :loading="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <GoodsCard
          v-for="item in goodsList"
          :key="item.id"
          :title="item.title"
          :desc="item.desc"
          :price="item.price"
          :images="item.images"
          :tags="item.tags"
          :id="item.id"
          :num="counterMap[item.id]"
        />
        <!-- :num="counterMap[item.id]" -->

        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </div>
    <div class="my-history" v-if="likeList.length === 0 && showLikeList">
      <MyHistory :searchList="searchList" @search="onSearch"></MyHistory>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '../components/GoodsCard.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  components: {
    GoodsCard,
    MyHistory,
  },
  data() {
    return {
      placeholder: '酒',
      value: this.placeholder,
      likeList: [],
      debounceTimer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showLikeList: true,
      total: 0,
      requestFlag: false,
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    // 计算总数
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {
    async onLoad() {
      // 标识是否在请求中
      if (this.requestFlag) {
        return;
      }
      this.requestFlag = true;
      //   this.showLikeList = false;
      const value = await this.$api.search(this.value, this.page, this.size);
      this.requestFlag = false;

      console.log('onload', value);
      this.goodsList = [...this.goodsList, ...value.list];
      this.printIds(value.list);
      // console.log('after onload', this.goodsList);
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    printIds(values) {
      values.forEach((i) => {
        console.log(i.id);
      });
    },
    // onLoad () {
    //   this.$api.search(this.value, this.page, this.size).then((res) => {
    //     console.log('onload', res);
    //   });
    // },
    onSearch(value) {
      if (this.requestFlag) {
        return;
      }
      console.log(value);
      if (value) {
        this.value = value;
      } else {
        this.value = this.placeholder;
      }
      // 判断之前有没有搜索过
      const result = this.searchList.find((item) => item.value === this.value);

      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        // 加入时间
        this.searchList.unshift({
          value: this.value,
          time: new Date().getTime(),
        });
        // 数量限制
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }

      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      // 清空
      this.likeList = [];
      this.page = 1;
      this.finished = false;

      this.onLoad();
      this.showLikeList = false;
    },
    onCancel() {

    },
    // 获取模糊搜索
    async input() {
      // 防抖
      // 输入的时候不发请求
      // 输入完卡0.3s之后才发
      if (this.value === '') {
        this.likeList = [];
      }
      if (this.timer) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
      } else {
        this.debounceTimer = setTimeout(async () => {
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          console.log(value);
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }, 300);
      }
    },
    focus() {
      this.showLikeList = true;
    },
    // 将搜索接近结果转成html
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      // 原生自带的方法
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
};
</script>

<style lang="less">
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: #fff;
  .search-head {
    // 固定在顶部
    position: fixed;
    top: 0;
    left: 15px;
    width: 345px;
    background-color: #fff;
    margin: 0 auto;
    // 放在一行
    display: flex;
    align-items: center;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 15px;
      }
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .goods-list {
    width: 345px;
    position: relative;
    margin: 48px auto 0;
    z-index: 10;
    background-color: #fff;
  }
  .my-history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
