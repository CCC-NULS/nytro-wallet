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
import i18n from './i18n/i18n'
import {mapState} from 'vuex'

import vSelect from 'vue-select'

let {ipcRenderer, remote} = require('electron');
let {machineIdSync} = remote.require('node-machine-id');

const machine_id = machineIdSync();

const elect_store = new ElectronStore({
    encryptionKey: machine_id
});

Vue.use(BootstrapVue);
Vue.use(VueQriously);
Vue.use(Notifications);
Vue.component('v-select', vSelect);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

console.log(process.env.IS_WEB);

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
                console.log('Accounts changed!');
                console.log(store.state, store.state.accounts, this.accounts);
                elect_store.set('accounts', this.accounts)
            },
            deep: true,
        },
        'settings': {
            handler() {
                console.log('Settings changed!');
                console.log(store.state, store.state.settings, this.settings);
                elect_store.set('settings', this.settings)
            },
            deep: true,
        },
    },
    mounted: function () {
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
    }
}).$mount('#app');
