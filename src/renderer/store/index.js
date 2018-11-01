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
    },
    'rename_show': false,
    'rename_account': null
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
    },
    start_rename(state, account) {
      state.rename_account = account
      state.rename_show = true
    },
    rename_account(state, {account, name}) {
      account.name = name
      state.rename_account = null
      state.rename_show = false
      state.accounts = state.accounts
    },
    end_rename(state) {
      state.rename_account = null
      state.rename_show = false
    }
  },
  actions: {

  },
  //strict: process.env.NODE_ENV !== 'production'
})
