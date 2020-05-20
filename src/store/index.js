import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: window.sessionStorage.getItem('user'),
  },
  mutations: {
    getUser(state, data) {
      state.userName = data;
      window.sessionStorage.setItem('user', data);
    },
    logout(state) {
      state.user = null;
      window.sessionStorage.removeItem('user');
    }
  },
  actions: {
  },
  modules: {
  }
})
