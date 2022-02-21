import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
  },
  mutations: {
    setSideList(state, data) {
      state.sideBarList = data;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      const value = await api.getSideList(type);
      commit('setSideList', value);
      console.log(value);
    },
  },
  modules: {},
});
