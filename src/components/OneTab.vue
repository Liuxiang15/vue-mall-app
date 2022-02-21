<template>
  <div class="one-tab-wrapper" ref="oneTab">
    <div
      class="tab-item"
      v-for="(item, i) in menuList"
      :key="item.title"
      :class="{ active: index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-wrapper">
        <img :src="item.imgURL" />
      </div>
      <div class="tab-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { moveTo } from '@/util/tool';

export default {
  data() {
    return {
      // 当前选中下标
      index: 0,
      // 当前是否在滑动
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  mounted() {
    this.getSideList();
  },
  methods: {
    ...mapActions(['getSideList']),
    scrollTo(index, e) {
      if (this.move) {
        return;
      }
      this.index = index;
      // 计算移动的距离
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const { oneTab } = this.$refs;
      const wrapperWidth = oneTab.offsetWidth;
      //   oneTab.scrollLeft += itemWidth / 2 + itemLeft - wrapperWidth / 2;
      //   this.moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2);
      moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2, oneTab, 'scrollLeft');
      // 获取侧边栏数据(sidebar+data)
      this.getSideList(this.menuList[index].type);
    },
    /**
     * start：起始位置
     * targetDis: 目标移动的距离
     */
    moveTo(start, targetDis) {
      let dis = 0;
      let speed = 5;
      if (targetDis < start) {
        speed *= -1;
      }
      const t = setInterval(() => {
        dis += speed;
        this.$refs.oneTab.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(targetDis)) {
          this.$refs.oneTab.scrollLeft = start + targetDis;
          clearInterval(t);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less">
.one-tab-wrapper {
  width: 375px;
  height: 104px;
  display: flex;
  // 超出部分滚动，设置scroll或者auto
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .tab-title {
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
      //   color: #fff;
      //   background-color: #d13193;
      //   font-weight: bold;
      //   border-radius: 30px;
    }
  }
  .img-wrapper {
    width: 50px;
    height: 50px;
    display: flex;
    // 图片居中
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 23px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  .active {
    .img-wrapper {
      border-color: #d13193;
    }
    .tab-title {
      color: #fff;
      background-color: #d13193;
      font-weight: bold;
      border-radius: 30px;
    }
  }
}

// 去除滚动条
.one-tab-wrapper::-webkit-scrollbar {
  width: 0;
  background-color: none;
}
</style>
