<template>
  <header class="bg-blue-002">
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
            <small class="caption-200 text-muted">v1.0.0-beta1</small>
          </h1>
        </b-col>
        <b-col cols="auto" class="justify-content-center align-self-center">
          <small class="caption-100 text-muted">{{$t('header.lastBlock')}} {{last_height}} ({{settings.api_server}})</small>
        </b-col>
        <b-col cols="auto" class="justify-content-center align-self-center">
          <b-dropdown id="ddown1" :text="this.langs[this.lang]" size="s">
            <b-dropdown-item v-for="lang of Object.entries(this.langs)"
                        @click="changeLang(lang[0])">
              {{lang[1]}}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="app-selector py-5">
      <b-row>
         <b-col>
           <b-dropdown id="ddown1" :text="this.selectTitle ? this.selectTitle : $t('nav.select')" size="lg">
            <b-dropdown-item class="first-level" to="/" active-class="n">{{$t('nav.all')}}</b-dropdown-item>
            <b-dropdown-header>{{$t('nav.configuredWallets')}}</b-dropdown-header>
            <b-dropdown-item v-for="account of this.accounts"
                        v-bind:to="'/account/' + account.address">
              {{account.name}}
            </b-dropdown-item>
            <b-dropdown-separator></b-dropdown-separator>
            <b-dropdown-header>{{$t('nav.actions')}}</b-dropdown-header>
            <b-dropdown-item to="/login/">
              <LogInIcon/>
              {{$t('nav.addAccount')}}
            </b-dropdown-item>
            <b-dropdown-item to="/new/">
              <PlusIcon/>
              {{$t('nav.createAccount')}}
            </b-dropdown-item>
          </b-dropdown>
         </b-col>
      </b-row>
    </b-container>
  </header>
</template>
<script>
import axios from 'axios'
import {private_key_to_public_key,
  address_from_hash,
  hash_from_address,
  public_key_to_hash,
  get_outputs_for_sum
} from 'nulsworldjs/src/model/data.js'
import { mapState } from 'vuex'
import store from '../store'

export default {
  name: 'app-header',
  data () {
    return {
      'langs': {
        'cn': '简体中文',
        'cz': 'čeština',
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'pt': 'Português',
      }
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    accounts() {
      return this.$store.state.accounts
    },
    settings() {
      return this.$store.state.settings
    },
    last_height() {
      return this.$store.state.last_height
    }
  },
  watch: {
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
    },
  },
  props: ['select-title'],
  components: {
  },
  async created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
