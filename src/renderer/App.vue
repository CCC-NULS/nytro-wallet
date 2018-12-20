<template>
  <div id="app" class="">
    <notifications group="wallet"/>
    <b-modal ref="myModalRef" hide-footer title="Warning" v-model="warningShow">
      <div class="d-block text-center">
        <h3>{{$t('public.warning')}}</h3>
        <p>This is just a beta-quality software.</p>
        <p>Security is not ideal, no password implemented yet.
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

    <div class="d-md-flex flex-row">
      <div class="col-md-4 col-xl-3 navbar-light app-navbar">
        <a class="wallet-logo mb-5 d-block"><img src="./assets/logo1.png"/>{{$t('public.wallet')}}</a>
        <hr class="my-3"/>
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <BookmarkIcon/>
              {{$t('nav.dashboard')}}
            </router-link>
          </li>
        </ul>
        <hr class="my-3"/>
        <h6 class="navbar-heading text-muted">
          {{$t('nav.accounts')}}
        </h6>
        <ul class="navbar-nav vertical">
          <li v-for="account of this.accounts" class="nav-item account-name">
            <router-link class="nav-link" active-class="active"
                         v-bind:to="'/account/' + account.address">{{account.name}}
            </router-link>
          </li>
        </ul>
        <hr class="my-3"/>
        <h6 class="navbar-heading text-muted">
          {{$t('nav.actions')}}
        </h6>
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/login/">
              <LogInIcon/>
              {{$t('nav.addAccount')}}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new/">
              <PlusIcon/>
              {{$t('nav.createAccount')}}
            </router-link>
          </li>
        </ul>

        <hr class="my-3"/>
        <h6 class="navbar-heading text-muted">
          <!--{{$t('nav.actions')}}-->
          SetUp
        </h6>

        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <SettingsIcon/>
              Set API
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link router-link-exact-active router-link-active">
              <MapPinIcon />
              <label @click="changeLang()">{{lang}}</label>
            </a>

          </li>
        </ul>

      </div>
      <div class="grow">
        <router-view></router-view>
      </div>
    </div>
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

<style>
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";
  @import "./assets/css/main.css";
  @import "./assets/app.css";
</style>
