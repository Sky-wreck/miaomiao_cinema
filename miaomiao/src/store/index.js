import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import user from './user'

Vue.use(Vuex)  //状态管理

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {   //引入子状态
    city,
    user
  }
})
