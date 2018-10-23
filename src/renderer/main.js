import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueQriously from 'vue-qriously'
import axios from 'axios'

import "bootstrap-vue/dist/bootstrap-vue.css"
import App from './App.vue'
import router from './router'
import {storage} from 'nulsworldjs/src/model/store'
import Notifications from 'vue-notification'
import store from './store'

import vSelect from 'vue-select'


Vue.use(BootstrapVue)
Vue.use(VueQriously)
Vue.use(Notifications)
Vue.component('v-select', vSelect)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  data: storage,
  template: '<App/>',
  watch: {
    'accounts': {
        handler() {
          console.log('Accounts changed!');
          localStorage.setItem('accounts', JSON.stringify(this.accounts));
        },
        deep: true,
      },
  },
  mounted: function() {
    try{
      if (localStorage.getItem('accounts'))
      {
        this.accounts = JSON.parse(localStorage.getItem('accounts'));
      }
    } catch (e) {
      console.warn("Can't import data", e);
    }
  }
}).$mount('#app')
