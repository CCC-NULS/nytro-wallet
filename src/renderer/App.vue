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
        {{ account_count }}
        <hr class="my-3" />
        <h6 class="navbar-heading text-muted">
            Actions
        </h6>
        <ul class="navbar-nav vertical">
          <li class="nav-item">
            <router-link class="nav-link" to="/login">
              <LogInIcon /> Add an account
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new">
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
    console.log(this.accounts)
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

h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6
{
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;

    margin-bottom: 1.125rem;

    color: inherit;
}

h1,
.h1
{
    font-size: 1.625rem;
}

h2,
.h2
{
    font-size: 1.25rem;
}

h3,
.h3
{
    font-size: 1.0625rem;
}

h4,
.h4
{
    font-size: .9375rem;
}

h5,
.h5
{
    font-size: .8125rem;
}

h6,
.h6
{
    font-size: .625rem;
}

h1,
.h1
{
    font-size: 1.5rem;

    margin-bottom: 1.125rem;
}
@media (min-width: 768px)
{
    h1,
    .h1
    {
        font-size: 1.625rem;
    }
}

h2,
.h2
{
    margin-bottom: 1.125rem;
}

h3,
.h3
{
    margin-bottom: .84375rem;
}

h4, .h4, h5, .h5, h6, .h6
{
    margin-bottom: .5625rem;
}

.mt--1 {
  margin-top: -.1875rem !important;
}
.mt--2 {
  margin-top: -.375rem !important;
}
.mt--3 {
  margin-top: -.75rem !important;
}
.mt--4 {
  margin-top: -1.5rem !important;
}
.mt--5 {
  margin-top: -2.25rem !important;
}

.header-body
{
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.header-footer
{
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

.header-pretitle
{
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #95aac9;
}

.header-title
{
    margin-bottom: 0;
}

.header-subtitle
{
    margin-top: .375rem;
    margin-bottom: 0;
    color: #95aac9;
}

.nuls-blue {
    background-image: linear-gradient(-133deg, #002e5e 0%, #092243 89%, #0a2140 100%);
}

table{
  font-size: 90%;
}

.navbar-brand-img, .navbar-brand > img {
  max-height: 2.5rem;
}

i.nuls,
i.nuls-dark {
  display: inline-block;
  height: 0.8em;
  width: 0.5em;
  background: url(./assets/logo1.png);
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
  filter: grayscale(100%) contrast(160%) brightness(0.1);
}

i.nuls-dark {
  filter: none;
}

i.nuls:hover {
  filter: none;
}

a.address, span.address {
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 30vw;
}

.cell-full { max-width:1px; width:100%; }
.cell-20 { max-width:1px; width:20%;  }
.cell-ellipsis { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.cell-noWrap { white-space:nowrap; }

@media screen and (min-width: 640px) {
  .tabbed-pagination ul {
    margin-top: -2.8em;
  }
}

.chart-middle-caption {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 992px) {
  .navbar-nav .nav-link > .fe {
    min-width: 1.5em;
    font-size: inherit;
    line-height: normal;
  }
  .navbar-nav .nav-link {
    margin-right: 1em;
  }
}

pre code {
  font-size: 87.5%;
  word-break: break-word;
  color: #2c7be5;
}

.navbar-nav a.nav-link>svg {
  height: 1em;
  min-width: 1.5em;
  font-size: inherit;
  line-height: normal;
  display: inline-block;
}
</style>
