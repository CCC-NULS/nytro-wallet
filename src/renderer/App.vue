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
        <a class="wallet-logo mb-5 d-block"><img src="/assets/img/logo1.png" /> Wallet</a>
        <hr class="my-3" />
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="fe fe-bookmark"></i> Dashboard
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
        {{ account_count }}
        <hr class="my-3" />
        <h6 class="navbar-heading text-muted">
            Actions
        </h6>
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <i class="fe fe-log-in"></i> Add an account
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new">
              <i class="fe fe-plus"></i> Create an account
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
    console.log(this.accounts)
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-navbar {
  background: #fff;
  padding-top: 2rem;
  max-width: 15rem;
}

.wallet-logo {
text-align: center;
  height: 2em;
  color: rgb(110, 132, 163);
  font-family: Cerebri Sans,sans-serif;
}

.wallet-logo img {
  height: 3em;
  margin-right: 1em;
}

.navbar-nav.vertical {
  flex-direction: column;
  margin-right: -1.5rem;
  margin-left: -1.5rem;
  min-width: 100%;
}

.navbar-nav.vertical .nav-link {
  padding: .5rem 1.5rem;
  display: flex;
  align-items: center;
}

.nav-item.account-name {
  font-size: 70%;
  max-width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-navbar .navbar-heading {
    font-size: .625rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    letter-spacing: .04em;
    text-transform: uppercase;
}

.grow {
  flex: 1;
}

.text-wrap-word {
  word-break: break-all;
}

</style>
