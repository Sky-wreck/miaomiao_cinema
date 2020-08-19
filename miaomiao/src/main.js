import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios;
// 引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import Srcoller from '@/components/Srcoller'
Vue.component('Srcoller' , Srcoller);

import Loading from '@/components/Loading'
import vueConfig from '../vue.config'
Vue.component('Loading',Loading);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
