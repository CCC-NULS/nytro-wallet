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
    'rename_account'
  ]),
  mounted() {
    this.update_price()
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
    }
  },
};
</script>

<style lang="scss">
  // @import "~bootstrap/dist/css/bootstrap.css";
  @import "./assets/design-system/00_global/styles/main";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "./assets/app.scss";
</style>
