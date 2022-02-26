import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    // 固定一页为10
    size: 10,
    goodsList: [],
    // 是否展示侧边栏和商品列表
    showContent: false,
    type: '',
    counterMap: {},
  },
  mutations: {
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, data) {
      state.sideBarList = data;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      // 数据合并
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
      // console.log(value);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      // 传参可能没有type
      const type = options.type || state.type;
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      // console.log(list);
      commit('setGoodsList', list);
      commit('setGoodsType', type);
      if (total > state.goodsList.length) {
        // 可以继续加载
        return true;
      }
      return false;
    },
  },
  modules: {},
});
