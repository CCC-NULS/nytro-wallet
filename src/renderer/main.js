import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueQriously from 'vue-qriously'
import axios from 'axios'

import "bootstrap-vue/dist/bootstrap-vue.css"
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import store from './store'
import ElectronStore from 'electron-store'

import vSelect from 'vue-select'
var {ipcRenderer, remote} = require('electron')
let {machineIdSync} = remote.require('node-machine-id')

const machine_id = machineIdSync()

const elect_store = new ElectronStore({
  encryptionKey: machine_id
})

Vue.use(BootstrapVue)
Vue.use(VueQriously)
Vue.use(Notifications)
Vue.component('v-select', vSelect)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log(process.env.IS_WEB)

var storage = {
  'settings': {
    'api_server': 'https://nuls.world/',
    'chain_id': 8964
  },
  'accounts': []
}

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
          console.log('Accounts changed!')
          elect_store.set('accounts', this.accounts)
        },
        deep: true,
      },
    'settings': {
        handler() {
          console.log('Settings changed!')
          elect_store.set('settings', this.settings)
        },
        deep: true,
      },
  },
  mounted: function() {
    try{
      if (elect_store.get('accounts'))
      {
        this.accounts = elect_store.get('accounts')
      }
    } catch (e) {
      console.warn("Can't import data", e);
    }
    try{
      if (elect_store.get('settings'))
      {
        this.settings = elect_store.get('settings')
      }
    } catch (e) {
      console.warn("Can't import data", e);
    }
    console.log(elect_store.store)
  }
}).$mount('#app')
