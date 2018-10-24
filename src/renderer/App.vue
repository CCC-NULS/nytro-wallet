<template>
  <div id="app" class="">
    <notifications group="wallet" />
    <b-modal ref="myModalRef" hide-footer title="Warning" v-model="warningShow">
      <div class="d-block text-center">
        <h3>Warning</h3>
        <p>This is just a beta-quality software.</p>
        <p>Security is not ideal, no password implemented yet.
        <p>If someone accesses your computer, it has access to funds on accounts still logged in.</p>
        <p>I am not responsible if you lose any fund with it.</p>
        <p>If you want to play, play with accounts holding small amounts or verify everything and remove accounts when not in use.</p>
      </div>
    </b-modal>

    <div class="d-md-flex flex-row">
      <div class="col-md-4 col-xl-3 navbar-light app-navbar">
        <a class="wallet-logo mb-5 d-block"><img src="./assets/logo1.png" /> Wallet</a>
        <hr class="my-3" />
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <BookmarkIcon />  Dashboard
            </router-link>
          </li>
        </ul>
        <hr class="my-3" />
        <h6 class="navbar-heading text-muted">
            Accounts
        </h6>
        <ul class="navbar-nav vertical">
          <li v-for="account of this.$root.$data.accounts" class="nav-item account-name">
            <router-link class="nav-link" active-class="active"
               v-bind:to="'/account/' + account.address">{{account.name}}</router-link>
          </li>
        </ul>
        <hr class="my-3" />
        <h6 class="navbar-heading text-muted">
            Actions
        </h6>
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/login/">
              <LogInIcon /> Add an account
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new/">
              <PlusIcon /> Create an account
            </router-link>
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
import { PlusIcon, LogInIcon, BookmarkIcon } from 'vue-feather-icons'
export default {
  name: 'nworld-wallet',
  data() {
    return {
      //msg: 'Welcome to Your Vue.js App'
      'accounts': this.$root.$data.accounts,
      'warningShow': true
    }
  },
  mounted() {
  },
  components: {
    PlusIcon,
    LogInIcon,
    BookmarkIcon
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "./assets/app.css";

</style>
