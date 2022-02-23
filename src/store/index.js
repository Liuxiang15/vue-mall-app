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
    showContent: false,
    type: '',
  },
  mutations: {
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
      console.log(value);
    },
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      // 传参可能没有type
      const type = options.type || state.type;
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      console.log(list);
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
