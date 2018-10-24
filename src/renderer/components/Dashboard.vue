<template>
  <div>
    <div class="header bg-dark pb-4 mb-0 nuls-blue">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-end">
            <div class="col">
              <h6 class="header-pretitle text-secondary">Accounts overview</h6>
              <h1 class="header-title text-white">Dashboard</h1>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Staked
              </h6>
              <h3 class="text-white mb-0">
                {{(total_consensus_locked || 0)/100000000}} <i class="nuls-dark"></i>
              </h3>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Time Locked
              </h6>
              <h3 class="text-white mb-0">
                 {{(total_time_locked || 0)/100000000}}  <i class="nuls-dark"></i>
              </h3>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Available
              </h6>
              <h3 class="text-white mb-0">
                {{(total_available || 0)/100000000}} <i class="nuls-dark"></i>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt--5">
      <b-row>
        <b-col md="6">
          <b-card no-body
                  title="Amounts"
                  class="mb-2 table-responsive-sm">
            <div class="card-header">
              <h4 class="card-header-title">
                Amounts
              </h4>
            </div>
            <div class="card-body chart">
              <doughnut-chart :chart-data="amounts_chart"
                              :height="250"></doughnut-chart>
            </div>
            <div class="chart-middle-caption">
              <h6 class="text-secondary">Total:</h6>
              <h3 class="text-primary">{{total_unspent/100000000}}</h3>
              <h6 class="text-secondary">Available:</h6>
              <h3 class="text-primary">{{total_available/100000000}}</h3>
            </div>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card no-body
                  title="Amounts"
                  class="mb-2 table-responsive-sm">
            <div class="card-header">
              <h4 class="card-header-title">
                Accounts
              </h4>
            </div>
            <div class="card-body vchart">
              <doughnut-chart :chart-data="accounts_chart"
                              :height="250"></doughnut-chart>
            </div>
            <div class="chart-middle-caption">
              <h6 class="text-secondary">Total accounts:</h6>
              <h3 class="text-primary">{{accounts.length}}</h3>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-card no-body
              title="Accounts"
              class="mb-2 table-responsive-sm">
        <div class="card-header">
          <!-- Title -->
          <b-row>
            <b-col>
              <h4 class="card-header-title">
                Accounts
              </h4>
            </b-col>
            <b-col cols="auto" class="text-muted">
              <router-link to="/login" v-b-tooltip.hover title="Add an account">
                <LogInIcon />
              </router-link>
              <router-link to="/new" v-b-tooltip.hover title="Create an account">
                <PlusIcon />
              </router-link>
            </b-col>
          </b-row>
        </div>
        <b-table
             v-if="accounts"
             show-empty
             stacked="md"
             class="card-table table-sm table-stripped"
             :items="accounts"
             :fields="account_fields"
             :sort-by.sync="address_sortBy"
             :sort-desc.sync="address_sortDesc"
             empty-text="No accounts (yet ?)"
          >
          <template slot="name" slot-scope="data">
            <span v-if="data.item.address!==data.item.name">
              <router-link
                 v-bind:to="'/account/' + data.item.address">{{data.item.name}}</router-link>
            </span>
            <span v-else class="text-muted">
              ...
            </span>
          </template>
          <template slot="address" slot-scope="data">
            <router-link
               v-bind:to="'/account/' + data.item.address">{{data.item.address}}</router-link>
              <span class="badge badge-primary" v-if="(unspent_info[data.item.address] == undefined)">
                new
              </span>
          </template>
          <template slot="available_value" slot-scope="data">
            <span v-if="unspent_info[data.item.address] != undefined">
              {{(unspent_info[data.item.address].available_value/100000000).toFixed(2)}} <i class="nuls"></i>
            </span>
          </template>
          <template slot="consensus_locked_value" slot-scope="data">
            <span v-if="unspent_info[data.item.address] != undefined">
              {{(unspent_info[data.item.address].consensus_locked_value/100000000).toFixed(2)}} <i class="nuls"></i>
            </span>
          </template>
          <template slot="time_locked_value" slot-scope="data">
            <span v-if="unspent_info[data.item.address] != undefined">
              {{(unspent_info[data.item.address].time_locked_value/100000000).toFixed(2)}} <i class="nuls"></i>
            </span>
          </template>
          <template slot="balance" slot-scope="data">
            <span v-if="unspent_info[data.item.address] != undefined">
              {{(unspent_info[data.item.address].unspent_value/100000000).toFixed(2)}} <i class="nuls"></i>
            </span>
          </template>
          <template slot="actions" slot-scope="data">
            <b-dropdown variant="link" class="menu-btn" no-caret right>
              <template slot="button-content">
                <MoreVerticalIcon /><span class="sr-only">actions</span>
              </template>
              <b-dropdown-item href="#" @click="rename_account(data.item)"><Edit3Icon /> Rename</b-dropdown-item>
              <b-dropdown-item href="#" @click="delete_account(data.item)"><DeleteIcon /> Delete</b-dropdown-item>
            </b-dropdown>
          </template>
        </b-table>
        <b-card-body v-else>
          No account found. You can <router-link to="/new">Create one</router-link> or <router-link to="/login">Import one</router-link>.
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import DoughnutChart from './DoughnutChart.js'
import {
  PlusIcon, LogInIcon, MoreVerticalIcon, Edit3Icon, DeleteIcon
} from 'vue-feather-icons'


const colors = {
  gray: {
    100: '#95AAC9',
    300: '#E3EBF6',
    600: '#95AAC9',
    700: '#6E84A3',
    900: '#283E59'
  },
  primary: {
    100: '#D2DDEC',
    300: '#A6C5F7',
    700: '#2C7BE5'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent'
}

var colours = [
  { // blue
    fillColor: 'rgba(151,187,205,0.2)',
    strokeColor: 'rgba(151,187,205,1)',
    pointColor: 'rgba(151,187,205,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(151,187,205,0.8)'
  },
  { // light grey
    fillColor: 'rgba(220,220,220,0.2)',
    strokeColor: 'rgba(220,220,220,1)',
    pointColor: 'rgba(220,220,220,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(220,220,220,0.8)'
  },
  { // red
    fillColor: 'rgba(247,70,74,0.2)',
    strokeColor: 'rgba(247,70,74,1)',
    pointColor: 'rgba(247,70,74,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(247,70,74,0.8)'
  },
  { // green
    fillColor: 'rgba(70,191,189,0.2)',
    strokeColor: 'rgba(70,191,189,1)',
    pointColor: 'rgba(70,191,189,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(70,191,189,0.8)'
  },
  { // yellow
    fillColor: 'rgba(253,180,92,0.2)',
    strokeColor: 'rgba(253,180,92,1)',
    pointColor: 'rgba(253,180,92,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(253,180,92,0.8)'
  },
  { // grey
    fillColor: 'rgba(148,159,177,0.2)',
    strokeColor: 'rgba(148,159,177,1)',
    pointColor: 'rgba(148,159,177,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    fillColor: 'rgba(77,83,96,0.2)',
    strokeColor: 'rgba(77,83,96,1)',
    pointColor: 'rgba(77,83,96,1)',
    pointStrokeColor: '#fff',
    pointHighlightFill: '#fff',
    pointHighlightStroke: 'rgba(77,83,96,1)'
  }
]

export default {
  name: 'dashboard',
  data () {
    return {
      total_consensus_locked: 0,
      total_time_locked: 0,
      total_available: 0,
      unspent_info: {},
      last_height: 0,
      accounts: this.$root.$data.accounts,
      amounts_chart: {},
      accounts_chart: {},
      account_fields: [
        {
          key: 'name',
          sortable: true
        },
        { key: 'address',
          sortable: true,
          class: 'text-small'
        },
        {
          key: 'consensus_locked_value',
          'class': 'text-right',
          label: 'Consensus locked'
        },
        {
          key: 'time_locked_value',
          'class': 'text-right',
          label: 'Time locked'
        },
        {
          key: 'available_value',
          'class': 'text-right',
          label: 'Available'
        },
        {
          key: 'balance',
          'class': 'text-right'
        },
        {
          key: 'actions',
          label: '',
          'class': 'text-right'
        }
      ]
    }
  },
  components: {
    DoughnutChart,
    PlusIcon, LogInIcon, MoreVerticalIcon, Edit3Icon, DeleteIcon
  },
  computed: {
    api_server() {
      return this.$root.$data.settings.api_server
    }
  },
  methods: {
    async update () {
      let result = await axios.get(`${this.api_server}addresses/stats`, {
        params: {
          addresses: this.$root.$data.accounts.map((acct) => acct.address)
        }
      })
      this.unspent_info = result.data.unspent_info
      this.last_height = result.data.last_block_height
      this.total_unspent = Object.values(this.unspent_info).map((u) => u.unspent_value).reduce((e, i) => e + i)
      this.total_available = Object.values(this.unspent_info).map((u) => u.available_value).reduce((e, i) => e + i)
      this.total_consensus_locked = Object.values(this.unspent_info).map((u) => u.consensus_locked_value).reduce((e, i) => e + i)
      this.total_time_locked = Object.values(this.unspent_info).map((u) => u.time_locked_value).reduce((e, i) => e + i)
      this.accounts = this.$root.$data.accounts
      this.update_charts()
    },
    update_charts () {
      this.amounts_chart = {
        labels: ['Available Balance', 'Time Locked', 'Consensus locked'],
        datasets: [{
          data: [
            this.total_available,
            this.total_time_locked,
            this.total_consensus_locked
          ],
          backgroundColor: [
            colors.primary[700],
            colors.primary[300],
            colors.primary[100]
          ],
          hoverBorderColor: colors.white
        }]
      }
      this.accounts_chart = {
        labels: this.accounts.map((a) => a.name),
        datasets: [{
          data: this.accounts.map((a) => (Object.keys(this.unspent_info).includes(a.address) ? this.unspent_info[a.address].unspent_value / 100000000 : 0)),
          backgroundColor: this.accounts.map((a, i) => ((i < colours.length) ? colours[i].strokeColor : colors.primary[100]))
        }]
      }
    },
    rename_account (account) {
      let new_name = prompt(
        `Renaming account ${account.address}\n\nPlease input a new name:`,
        account.name)
      if (new_name !== null) { account.name = new_name }
    },
    delete_account (account) {
      if (confirm(`Delete account ${account.name} ?\n\nPlease backup your private key before doing this!`)) {
        if (confirm(`The address is ${account.address}\n\nAre you really sure? There is no way to going back!`)) {
          alert(`Ok, deleting address ${account.address}`)
          var index = this.accounts.indexOf(account)
          if (index > -1) {
            this.accounts.splice(index, 1)
          }
        }
      }
    }
  },
  async created () {
    // We may not have a correct account list yet... So wait a bit.
    this.$nextTick(this.update.bind(this))
    // setTimeout(this.update.bind(this), 500)
    setInterval(this.update.bind(this), 60000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chart-middle-caption {
  padding-top: 2rem;
}
.card-body.vchart {
  z-index: 10;
}
.menu-btn .btn {
  padding: 0 !important;
}
.card-table td, .card-table tr {
  vertical-align: middle;
}
</style>
