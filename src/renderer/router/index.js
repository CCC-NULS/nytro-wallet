import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Login from '../components/Login.vue'
import New from '../components/New.vue'
import Add from '../components/Add.vue'
import Account from '../components/Account.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/new',
      name: 'New',
      component: New
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/account/:address',
      name: 'Account',
      component: Account,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
