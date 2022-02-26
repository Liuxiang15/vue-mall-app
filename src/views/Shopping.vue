<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del" />
    </div>
    <div class="card-list" v-if="this.list.length">
      <van-checkbox-group v-model="result" ref="checkBoxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <GoodsCard
            v-bind="item"
            :num="counterMap[item.id]"
            :nofly="true"
          ></GoodsCard>
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-else>
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      />
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${totalNum})`"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { Toast, Dialog } from 'vant';
import GoodsCard from '../components/GoodsCard.vue';

export default {
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        // 放大100倍，小数
        return Math.round(num * next.price * 100) + prev;
      }, 0);
      // return 1000;
    },
    totalNum() {
      console.log('totalNum', this.result);
      const resArr = this.list.filter((item) => this.result.includes(item.id));
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
      return res;
    },
  },
  components: {
    GoodsCard,
  },
  created() {
    this.getAllData();
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllData() {
      console.log(this.counterMap, '---');
      const result = Object.keys(this.counterMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
      console.log('in shopping', this.list);
    },
    async del() {
      console.log('enter del result', this.result);
      if (this.result.length === 0) {
        Toast('你没有选中商品');
        return;
      }
      try {
        await Dialog.confirm({ message: '是否删除' });
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
        });
        this.list = this.list.filter((item) => !this.result.includes(item.id));
      } catch (error) {
        Toast('用户点击了取消');
      }
    },
    onSubmit() {

    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkBoxGroup.toggleAll(true);
      } else {
        this.$refs.checkBoxGroup.toggleAll(false);
      }
    },
  },
};
</script>

<style lang="less">
.shopping {
  background-color: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background-color: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
.card-none {
  width: 100%;
  position: absolute;
  top: 46px;
  img {
    width: 100%;
  }
}
</style>
