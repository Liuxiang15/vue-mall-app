import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    showContent: false,
  },
  mutations: {
    setSideList(state, data) {
      state.sideBarList = data;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
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
  },
  modules: {},
});
