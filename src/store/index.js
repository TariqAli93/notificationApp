import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    LOGIN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.token = null
    }
  },
  actions: {
    LOGIN(context, payload) {
      return new Promise((resolve, reject) => {
        Axios.post(`log/login`, payload)
        .then(response => {
          const token = response.data.result.token;
          const user = response.data.result;
          localStorage.setItem('user', JSON.stringify(response.data.result));
          localStorage.setItem('access_token', token);
          context.commit('LOGIN', token);
          resolve(response)
        })
        .catch(error => {
          reject(error);
        })
      });
    },

    LOGOUT(context) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      context.commit('LOGOUT');
    }
  },
  modules: {
  }
})
