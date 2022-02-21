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
  
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);
      commit('setSideList', value);
      commit('setShowContent', true);
      console.log(value);
    },
    async getGoodsList({ state }, options) {
      const { page, type, sortType } = options;
      const { list } = await api.getGoodsList(type, page, state.size, sortType);
      console.log(list);
      this.commit('setGoodsList', list);
    },
  },
  modules: {},
});
