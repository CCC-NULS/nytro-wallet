import Vue from 'vue'
import Vuex from 'vuex'
const bs58 = require('bs58')
//import modules from './modules'

Vue.use(Vuex)


export default new Vuex.Store({
  //modules,
  state: {
    'accounts': [],
    'settings': {
      'api_server': 'https://nuls.world',
      'chain_id': 8964
      // 'api_server': 'https://testnet.nuls.world/',
      // 'chain_id': 261
    },
    'rename_show': false,
    'rename_account': null,
    'price_info': null,
    'unspent_info': {},
    'last_height': 0,
    'to_symbol': 'USD',
    'aliases': [],
    'ledger': null
  },
  getters: {
    chain_accounts: state => {
      let accounts = state.accounts.filter(account =>
        bs58.decode(account.address).readInt16LE(0) == state.settings.chain_id
      )

      if (state.ledger !== null) {
        console.log(state.ledger)
        accounts.push({
          'name': `Ledger`,
          'private_key': null,
          'public_key': state.ledger.publicKey,
          'address': state.ledger.address,
          'type': 'ledger'
        })
      }
      return accounts
    }
  },
  mutations: {
    set_ledger(state, ledger_pub) {
      state.ledger = ledger_pub
    },
    set_accounts(state, accounts) {
      state.accounts = accounts
    },
    add_account(state, account) {
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
    },
    set_price_info(state, price_info) {
      state.price_info = price_info
    },
    set_unspent_info(state, unspent_info) {
      state.unspent_info = unspent_info
    },
    set_last_height(state, last_height) {
      state.last_height = last_height
    },
    set_to_symbol(state, to_symbol) {
      state.to_symbol = to_symbol
    },
    set_aliases(state, aliases) {
      state.aliases = aliases
    }
  },
  actions: {

  },
  //strict: process.env.NODE_ENV !== 'production'
})
