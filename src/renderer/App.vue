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

    <header>
      <b-container fluid class="app-header">
        <b-row>
          <b-col cols="auto" class="justify-content-center align-self-center">
            <router-link class="nav-link app-logo" to="/">
              <img src="./assets/logo1.png"/>
              ytro
            </router-link>
          </b-col>
          <b-col class="text-center justify-content-center align-self-center">
            <h1 class="app-name head-400">
              wallet
              <small class="body-200 text-muted">v1.0.0-beta1</small>
            </h1>
          </b-col>
          <b-col cols="auto" class="justify-content-center align-self-center">
            Last block XXX
          </b-col>
        </b-row>
      </b-container>
      <b-container class="app-selector py-5">
        <b-row>
           <b-col>
             <b-dropdown id="ddown1" text="Select account" size="lg">
              <b-dropdown-item class="first-level" to="/" active-class="n">All</b-dropdown-item>
              <b-dropdown-header>Configured wallets</b-dropdown-header>
              <b-dropdown-item v-for="account of this.accounts"
                          v-bind:to="'/account/' + account.address">
                {{account.name}}
              </b-dropdown-item>
              <b-dropdown-separator></b-dropdown-separator>
              <b-dropdown-header>Actions</b-dropdown-header>
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
    <router-view></router-view>
  </div>
</template>

<script>
    import {storage} from 'nulsworldjs/src/model/store';
    import {PlusIcon, LogInIcon, BookmarkIcon,MapPinIcon,SettingsIcon } from 'vue-feather-icons'
    import {mapState} from 'vuex'
    import Rename from './components/Rename.vue'

    export default {
        name: 'nworld-wallet',
        data() {
            return {
                //msg: 'Welcome to Your Vue.js App'
                'warningShow': true,
                lang: 'English',
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
            changeLang() {
                if(this.lang === 'English'){
                    this.lang = '简体中文'
                }else {
                    this.lang = 'English'
                }
                this.$i18n.locale = this.lang === 'English' ? 'en': 'cn';
            },
        },
    };
</script>

<style lang="scss">
  // @import "~bootstrap/dist/css/bootstrap.css";
  @import "./assets/design-system/00_global/styles/main";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "./assets/app.scss";
</style>
