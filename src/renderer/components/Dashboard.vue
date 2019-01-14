<template>
  <div>
    <b-container>
      <b-card class="bs-24-40 my-5">
        <b-row>
          <b-col md="6">
            <h4 class="text-center">
              Amounts
            </h4>
            <doughnut-chart :chart-data="amounts_chart"
                            :height="200" :width="200"></doughnut-chart>
            <div class="chart-middle-caption">
              <h6 class="text-secondary">Total:</h6>
              <h3 class="text-primary">{{total_unspent/100000000}}</h3>
              <h6 class="text-secondary">Available:</h6>
              <h3 class="text-primary">{{total_available/100000000}}</h3>
            </div>
          </b-col>
          <b-col md="6">
            <h4 class="text-center">
              Accounts
            </h4>
            <doughnut-chart :chart-data="accounts_chart"
                            :height="200" :width="200"></doughnut-chart>
            <div class="chart-middle-caption">
              <h6 class="text-secondary">Total accounts:</h6>
              <h3 class="text-primary">{{accounts.length}}</h3>
            </div>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
      </b-card>
    </b-container>

    <b-container>
      <b-row>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header"><i class="nuls-green"></i> Balance <span class="text-muted">(incl. locked)</span></h4>
            <p class="card-price"><i class="nuls-green"></i> {{(total_unspent || 0)/100000000}}</p>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header">Total Balance</h4>
            <p class="card-price"></p>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header">Price</h4>
            <p class="card-price"></p>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header"><i class="nuls-green"></i> Available balance</h4>
            <p class="card-price"><i class="nuls-green"></i> {{(total_available || 0)/100000000}}</p>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header"><i class="nuls-green"></i> Consensus Locked Balance</h4>
            <p class="card-price"><i class="nuls-green"></i> {{(total_consensus_locked || 0)/100000000}}</p>
          </b-card>
        </b-col>
        <b-col>
          <b-card class="mb-4">
            <h4 slot="header"><i class="nuls-green"></i> Time locked balance</h4>
            <p class="card-price"><i class="nuls-green"></i> {{(total_time_locked || 0)/100000000}}</p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import DoughnutChart from './DoughnutChart.js'
import {
  PlusIcon, LogInIcon, MoreVerticalIcon, Edit3Icon, DeleteIcon
} from 'vue-feather-icons'
import { mapState } from 'vuex'
import store from '../store'



export default {
  name: 'dashboard',
  data () {
    return {
      total_consensus_locked: 0,
      total_time_locked: 0,
      total_available: 0,
      unspent_info: {},
      last_height: 0,
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
  computed: mapState([
    // map this.count to store.state.count
    'accounts',
    'settings'
  ]),
  methods: {
    async update () {
      let result = await axios.get(`${this.settings.api_server}addresses/stats`, {
        params: {
          addresses: this.accounts.map((acct) => acct.address)
        }
      })
      this.unspent_info = result.data.unspent_info
      this.last_height = result.data.last_block_height
      this.total_unspent = Object.values(this.unspent_info).map((u) => u.unspent_value).reduce((e, i) => e + i)
      this.total_available = Object.values(this.unspent_info).map((u) => u.available_value).reduce((e, i) => e + i)
      this.total_consensus_locked = Object.values(this.unspent_info).map((u) => u.consensus_locked_value).reduce((e, i) => e + i)
      this.total_time_locked = Object.values(this.unspent_info).map((u) => u.time_locked_value).reduce((e, i) => e + i)
      this.update_charts()
    },
    update_charts () {
      this.amounts_chart = {
        labels: ['Available Balance', 'Time Locked', 'Consensus locked'],
        datasets: [{
          data: [
            this.total_available / 100000000,
            this.total_time_locked / 100000000,
            this.total_consensus_locked / 100000000
          ],
          backgroundColor: ["#FFFFFF", "#0A3B89", "#002E78"],
          borderColor: "#001E4F",
          hoverBorderColor: "#001E4F"
        }]
      }
      this.accounts_chart = {
        labels: this.accounts.map((a) => a.name),
        datasets: [{
          data: this.accounts.map((a) => (Object.keys(this.unspent_info).includes(a.address) ? this.unspent_info[a.address].unspent_value / 100000000 : 0)),
          backgroundColor: "#FFFFFF",
          borderColor: "#001E4F",
          hoverBorderColor: "#001E4F"
        }]
      }
    },
    rename_account (account) {
      store.commit('start_rename', account)
    },
    delete_account (account) {
      if (confirm(`Delete account ${account.name} ?\n\nPlease backup your private key before doing this!`)) {
        if (confirm(`The address is ${account.address}\n\nAre you really sure? There is no way to going back!`)) {
          alert(`Ok, deleting address ${account.address}`)
          store.commit('remove_account', account);
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
