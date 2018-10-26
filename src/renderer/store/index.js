import Vue from 'vue'
import Vuex from 'vuex'

//import modules from './modules'

Vue.use(Vuex)


export default new Vuex.Store({
  //modules,
  state: {
    'accounts': [],
    'settings': {
      'api_server': 'https://nuls.world/',
      'chain_id': 8964
    }
  },
  mutations: {
    set_accounts(state, accounts) {
      state.accounts = accounts
    },
    add_account(state, account) {
      console.log(state.accounts)
      if (!state.accounts.some(e => e.address === account.address)) {
        state.accounts.push(account)
      }
    },
    remove_account(state, account) {
      var index = state.accounts.indexOf(account)
      if (index > -1) {
        state.accounts.splice(index, 1)
      }
    },
    set_settings(state, settings) {
      console.log(settings)
      state.settings = settings
    }
  },
  actions: {

  },
  //strict: process.env.NODE_ENV !== 'production'
})
