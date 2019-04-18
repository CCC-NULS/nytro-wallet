<template>
  <header class="bg-blue-002 flex-shrink-0">
    <b-container fluid class="app-header">
      <b-row>
        <b-col cols="auto" class="justify-content-center align-self-center">
          <router-link class="nav-link app-logo" to="/">
            <img src="../assets/logo1.png" alt="N"/>ytro
          </router-link>
        </b-col>
        <b-col class="text-center justify-content-center align-self-center">
          <h1 class="app-name head-400">
            {{$t('public.wallet')}}
            <small class="caption-200 text-muted d-none d-md-inline">v0.9.2 (beta3)</small>
          </h1>
        </b-col>
        <b-col cols="auto" class="justify-content-center align-self-center">
          <small class="caption-100 text-muted d-none d-md-inline">{{$t('header.lastBlock')}} {{last_height}}</small>
        </b-col>
        <b-col cols="auto" class="align-self-center align-self-center d-none d-md-block">
          <b-dropdown id="ddown1" :text="to_symbol" size="s">
            <b-dropdown-item v-for="sym of symbols"
                        @click="changeSymbol(sym)"
                        :active="to_symbol==sym">
              {{sym}}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="ddown2" :text="chains[settings.chain_id].chain_name" size="s">
            <b-dropdown-item v-for="chain of Object.entries(chains)"
                        @click="applySettings(chain[1])"
                        :active="settings.chain_id==chain[1].chain_id">
              {{chain[1].chain_name}}
            </b-dropdown-item>
          </b-dropdown>
          <b-dropdown id="ddown3" :text="this.langs[this.lang]" size="s">
            <b-dropdown-item v-for="lang of Object.entries(this.langs)"
                        @click="changeLang(lang[0])">
              {{lang[1]}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col cols="auto" class="align-self-center align-self-center d-md-none">
          <b-dropdown variant="link" size="lg" no-caret right>
            <template slot="button-content">
              <MoreVerticalIcon /><span class="sr-only">actions</span>
            </template>
            <b-dropdown-header>{{$t('resource.symbol')}}</b-dropdown-header>
            <b-dropdown-item v-for="sym of symbols"
                        @click="changeSymbol(sym)"
                        :active="to_symbol==sym">
              {{sym}}
            </b-dropdown-item>
            <b-dropdown-header>{{$t('resource.chain')}}</b-dropdown-header>
            <b-dropdown-item v-for="chain of Object.entries(chains)"
                        @click="applySettings(chain[1])"
                        :active="settings.chain_id==chain[1].chain_id">
              {{chain[1].chain_name}}
            </b-dropdown-item>
            <b-dropdown-header>{{$t('resource.language')}}</b-dropdown-header>
            <b-dropdown-item v-for="nlang of Object.entries(this.langs)"
                        @click="changeLang(nlang[0])"
                        :active="lang === nlang[0]">
              {{nlang[1]}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="app-selector">
      <b-row>
         <b-col class="py-5 align-self-center">
           <b-dropdown id="mainnav" :text="this.selectTitle ? this.selectTitle : $t('nav.select')" size="lg">
            <b-dropdown-item class="first-level" to="/" active-class="n">{{$t('nav.all')}}</b-dropdown-item>
            <b-dropdown-header>{{$t('nav.configuredWallets')}}</b-dropdown-header>
            <b-dropdown-item v-for="account of this.accounts"
                        v-bind:to="'/account/' + account.address">
              <b-row class="justify-content-between">
                <b-col cols="6">
                  {{account.name}}
                </b-col>
                <b-col cols="4" class="text-right">
                  <small><i class="nuls"></i> {{Math.round((Object.keys(unspent_info).includes(account.address) ? unspent_info[account.address].unspent_value / 100000000 : 0))}}</small>
                </b-col>
              </b-row>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-header>{{$t('nav.actions')}}</b-dropdown-header>
            <b-dropdown-item to="/add">
              <PlusIcon/>
              {{$t('nav.addAccount')}}
            </b-dropdown-item>
          </b-dropdown>
         </b-col>
         <slot></slot>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import {PlusIcon, LogInIcon, BookmarkIcon,
  MapPinIcon,SettingsIcon, MoreVerticalIcon } from 'vue-feather-icons'
import { mapState } from 'vuex'
import store from '../store'

export default {
  name: 'app-header',
  data () {
    return {
      'langs': {
        'cn': '简体中文',
        'cz': 'čeština',
        'de': 'Deutsch',
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'pt': 'Português',
        'ru': 'русский'
      },
      'symbols': ['USD', 'EUR', 'CNY', 'BTC', 'ETH'],
      'chains': {
        8964: {
          'chain_name': 'NULS mainnet',
          'api_server': 'https://nuls.world',
          'chain_id': 8964
        },
        261: {
          'chain_name': 'NULS testnet',
          'api_server': 'https://testnet.nuls.world',
          'chain_id': 261
        }
      }
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    accounts() {
      return this.$store.getters.chain_accounts
    },
    settings() {
      return this.$store.state.settings
    },
    last_height() {
      return this.$store.state.last_height
    },
    unspent_info() {
      return this.$store.state.unspent_info
    },
    to_symbol() {
      return this.$store.state.to_symbol
    }
  },
  watch: {
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
    },
    changeSymbol(sym) {
      this.$store.commit('set_to_symbol', sym)
    },
    applySettings(settings) {
      this.$store.commit('set_settings', settings)
      this.$router.push('/')
    }
  },
  props: ['select-title'],
  components: {
    PlusIcon,
    LogInIcon,
    BookmarkIcon,
    MapPinIcon ,
    SettingsIcon,
    MoreVerticalIcon
  },
  async created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
