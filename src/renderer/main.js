import 'babel-polyfill';
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueQriously from 'vue-qriously'
import axios from 'axios'

import "bootstrap-vue/dist/bootstrap-vue.css"
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import store from './store'
import i18n from './i18n/i18n'
import {mapState} from 'vuex'

import vSelect from 'vue-select'

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

let use_elect = true;
if (process.env.IS_WEB) {
  use_elect = false;
}
let ElectronStore, machine_id, elect_store;
let ipcRenderer = null
if (!process.env.IS_WEB) {
  ElectronStore = require('electron-store')
  let {remote} = require('electron')
  ipcRenderer = require('electron').ipcRenderer
  let {machineIdSync} = remote.require('node-machine-id')
  machine_id = machineIdSync()

  elect_store = new ElectronStore({
      encryptionKey: machine_id
  });
  ipcRenderer.send('ledger.get_accounts')
}
console.log(elect_store);

Vue.use(BootstrapVue);
Vue.use(VueQriously);
Vue.use(Notifications);
Vue.use(Donut);
Vue.component('v-select', vSelect);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    i18n,
    store: store,
    template: '<App/>',
    computed: {
        ...mapState({
            accounts: state => state.accounts,
            settings: state => state.settings
        })
    },
    watch: {
        'accounts': {
            handler() {
                if (use_elect) elect_store.set('accounts', this.accounts)
                else localStorage.setItem('accounts', JSON.stringify(this.accounts))
                this.update_ledger()
            },
            deep: true,
        },
        'settings': {
            handler() {
                if (use_elect) elect_store.set('settings', this.settings)
                else localStorage.setItem('settings', JSON.stringify(this.settings))
                this.update_ledger()
            },
            deep: true,
        },
    },
    methods: {
      async update_ledger() {
        if (use_elect) {
          const {ipcpRenderer} = require('electron-ipcp')
          const account = await ipcpRenderer.sendMain('ledger_get_accounts', store.state.settings.chain_id)
          store.commit('set_ledger', account);
        } else {

        }
      }
    },
    mounted: async function () {
        if (use_elect) {
          try {
              if (elect_store.get('accounts')) {
                  console.log(elect_store.get('accounts'));
                  store.commit('set_accounts', elect_store.get('accounts'))
              }
          } catch (e) {
              console.warn("Can't import data", e);
          }
          try {
              if (elect_store.get('settings')) {
                  store.commit('set_settings', elect_store.get('settings'))
              }
          } catch (e) {
              console.warn("Can't import data", e);
          }
        } else {
          try {
              if (localStorage.getItem('accounts')) {
                  store.commit('set_accounts', JSON.parse(localStorage.getItem('accounts')))
              }
          } catch (e) {
              console.warn("Can't import data", e);
          }
          try {
              if (localStorage.getItem('settings')) {
                  store.commit('set_settings', JSON.parse(localStorage.getItem('settings')))
              }
          } catch (e) {
              console.warn("Can't import data", e);
          }
        }
        await this.update_ledger()
    }
}).$mount('#app');
