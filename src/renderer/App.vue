<template>
  <div id="app" class="">
    <notifications group="wallet"/>
    <b-modal ref="myModalRef" hide-footer :title="$t('public.warning')" v-model="warningShow">
      <div>
        <h3 class="head-500">This is a beta-quality software.</h3>
        <p>Security is not ideal, no password implemented yet.</p>
        <p>If someone accesses your computer, it has access to funds on accounts still logged in.</p>
        <p>I am not responsible if you lose any fund with it.</p>
        <p>If you want to play, play with accounts holding small amounts or verify everything and remove
          accounts when not in use.</p>
      </div>
    </b-modal>
    <b-modal id="renameModal" ref="renameModal" hide-footer title="Rename Account"
             :visible="rename_show" @hidden="$store.commit('end_rename')">
      <rename v-if="rename_show" :account="rename_account"></rename>
    </b-modal>
    <router-view></router-view>
  </div>
</template>

<script>
import {storage} from 'nulsworldjs/src/model/store';
import {get_aliases} from 'nulsworldjs/src/api/aliases'
import {PlusIcon, LogInIcon, BookmarkIcon,MapPinIcon,SettingsIcon } from 'vue-feather-icons'
import {mapState} from 'vuex'
import Rename from './components/Rename.vue'
import axios from 'axios'

export default {
  name: 'nworld-wallet',
  data() {
    return {
      //msg: 'Welcome to Your Vue.js App'
      'warningShow': true
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'accounts',
    'settings',
    'rename_show',
    'rename_account',
    'unspent_info'
  ]),
  mounted() {
    this.update_price()
    this.update_unspent_info()
    this.update_aliases()
    setInterval(this.update_price.bind(this), 120000)
    setInterval(this.update_unspent_info.bind(this), 30000)
  },
  watch: {
    settings() {
      this.$store.commit('set_unspent_info', {})
      this.$store.commit('set_last_height', 0)
      this.update_unspent_info()
      this.update_aliases()
    }
  },
  components: {
    PlusIcon,
    LogInIcon,
    BookmarkIcon,
    MapPinIcon ,
    SettingsIcon,
    Rename
  },
  methods: {
    async update_price() {
      let response = await axios('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=NULS&tsyms=USD,EUR,BTC,ETH,CNY')
      this.$store.commit('set_price_info', response.data)
    },
    async update_unspent_info() {
      let result = await axios.get(`${this.settings.api_server}addresses/stats`, {
        params: {
          addresses: this.$store.getters.chain_accounts.map((acct) => acct.address)
        }
      })
      this.$store.commit('set_unspent_info', result.data.unspent_info)
      this.$store.commit('set_last_height', result.data.last_height)
    },
    async update_aliases() {
      let aliases = await get_aliases({api_server: this.settings.api_server})
      this.$store.commit('set_aliases', aliases)
    },
  },
};
</script>

<style lang="scss">
  // @import "~bootstrap/dist/css/bootstrap.css";
  @import "./assets/design-system/00_global/styles/main";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "./assets/app.scss";
  html,body {
      height: 100%;
  }

  #window, #app {
    height: 100%;
  }

  #window {
    display: flex;
    flex-direction: column;
  }

  #content {
    overflow-y: auto;
    height: 100%;
    max-height: 100% !important;
    min-height: 0;
  }

  footer {
    padding: 0.2rem 0;
    font-size: 1rem;
  }
</style>
