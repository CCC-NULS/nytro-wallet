<template>
  <div>
    <AppHeader :select-title="account.name" />
    <b-modal id="transferModal" ref="transferModal" hide-footer title="Transfer" v-model="transferShow">
      <transfer v-if="transferShow" :account="account" :stats="stats" @message-broadcasted="transferShow = !transferShow"></transfer>
    </b-modal>
    <b-modal id="requestModal" ref="requestModal" hide-footer title="Request" v-model="requestShow">
      <request v-if="requestShow" :account="account"></request>
    </b-modal>
    <b-modal id="stakeModal" ref="stakeModal" hide-footer title="Stake" v-model="stakeShow">
      <stake v-if="stakeShow" :account="account" :stats="stats" :consensus="consensus" @message-broadcasted="stakeShow = !stakeShow"></stake>
    </b-modal>
    <b-modal id="signModal" ref="signModal" hide-footer :title="signReason" v-model="signShow">
      <sign v-if="signShow" :account="account" :tx="signTx" :reason="signReason" :api_server="settings.api_server" @message-broadcasted="signShow = !signShow"></sign>
    </b-modal>
    <b-modal id="backupModal" ref="backupModal" title="Backup Account" v-model="backupShow" ok-variant>
      <div v-if="backupShow">
        <h2>Backup your account</h2>
        <div class="form-group" v-if="tx !== null">
          <label>Address</label>
          <pre class="tx-detail text-wrap-word">{{account.address}}</pre>
          <label>Private Key</label>
          <pre class="tx-detail text-wrap-word">{{account.private_key}}</pre>
        </div>
      </div>
    </b-modal>
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <h1 class="head-400">
            <CreditCardIcon />
            {{account.name}}
            <b-link @click="rename" class="text-muted" v-b-popover.hover.bottom="'Rename'">
              <small>
                <Edit3Icon />
              </small>
            </b-link>
            <b-link @click="backupShow = !backupShow" class="text-muted" v-b-popover.hover.bottom="'Backup'">
              <small>
                <EyeIcon />
              </small>
            </b-link>
          </h1>
        </b-col>
        <b-col cols="auto" class="text-right">
          <h3 class="body-200 text-blue-30">{{account.address}}</h3>
        </b-col>
      </b-row>
      <carousel :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 3]]"
                paginationActiveColor="#FFFFFF" paginationColor="#5376AC"
                paginationPadding="3.5" paginationSize="7">
        <slide>
          <b-card class="m-2">
            <h4 slot="header">{{$t('wallet.wallet_value')}}</h4>
            <p class="card-price"></p>
          </b-card>
        </slide>
        <slide>
          <b-card class="m-2">
            <h4 slot="header"><i class="nuls-green"></i> {{$t('public.balance')}} <span class="text-muted">{{$t('public.including_locked')}}</span></h4>
            <p class="card-price"><i class="nuls-green"></i> {{(stats.unspent_value || 0)/100000000}}</p>
          </b-card>
        </slide>
        <slide>
          <b-card class="m-2">
            <h4 slot="header"><i class="nuls-green"></i> {{$t('public.available')}}</span></h4>
            <p class="card-price"><i class="nuls-green"></i> {{(stats.available_value || 0)/100000000}}</p>
          </b-card>
        </slide>
        <slide>
          <b-card class="m-2">
            <h4 slot="header"><i class="nuls-green"></i> {{$t('public.time_locked')}}</span></h4>
            <p class="card-price"><i class="nuls-green"></i> {{(stats.time_locked_value || 0)/100000000}}</p>
          </b-card>
        </slide>
        <slide>
          <b-card class="m-2">
            <h4 slot="header"><i class="nuls-green"></i> {{$t('public.staked')}}</span></h4>
            <p class="card-price"><i class="nuls-green"></i> {{(stats.consensus_locked_value || 0)/100000000}}</p>
          </b-card>
        </slide>
      </carousel>
    </b-container>
    <div class="header pb-4 mb-0 nuls-blue">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-end">
            <div class="col">
              <h6 class="header-pretitle text-secondary">Account {{account.address}}</h6>
              <h1 class="header-title text-white">
                <CreditCardIcon />
                {{account.name}}
                <b-link @click="rename" class="text-muted" v-b-popover.hover.bottom="'Rename'">
                  <small>
                    <Edit3Icon />
                  </small>
                </b-link>
                <b-link @click="backupShow = !backupShow" class="text-muted" v-b-popover.hover.bottom="'Backup'">
                  <small>
                    <EyeIcon />
                  </small>
                </b-link>
              </h1>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Staked
              </h6>
              <h3 class="text-white mb-0">
                {{(stats.consensus_locked_value || 0)/100000000}}&nbsp;<i class="nuls-dark"></i>
              </h3>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Time Locked
              </h6>
              <h3 class="text-white mb-0">
                 {{(stats.time_locked_value || 0)/100000000}}&nbsp;<i class="nuls-dark"></i>
              </h3>
            </div>
            <div class="col-auto text-center">
              <h6 class="header-pretitle text-secondary">
                Available
              </h6>
              <h3 class="text-white mb-0">
                {{(stats.available_value || 0)/100000000}}&nbsp;<i class="nuls-dark"></i>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt--5">
      <div class="row">
        <div class="col-12 col-md-6">
          <b-button-group>
            <b-button variant="primary" @click="transferShow = !transferShow"><SendIcon /> Send</b-button>
            <b-button @click="requestShow = !requestShow"><InboxIcon /> Request</b-button>
            <b-button :disabled="(stats.unspent_count < 30)" @click="consolidate"><GitMergeIcon /> Consolidate</b-button>
            <!--<b-button disabled><i class="fe fe-sunrise"></i> Create Agent</b-button>-->
          </b-button-group>
          <!-- Devices -->
          <b-card class="mt-3" no-body>
            <div slot="header">
              <div class="row align-items-center">
                <div class="col">
                  <h4 class="card-header-title">Current Staking</h4>
                </div>
                <div class="col-auto" v-if="((stats.available_value || 0)/100000000) > 2000">
                  <b-button size="sm" @click="stakeShow = !stakeShow" variant="outline-primary"><i class="fa fa-hand-holding-usd"></i> Stake</b-button>
                </div>
              </div>
            </div>
            <div class=" card-body text-muted" v-if="account_value <= 2000">
              No staking available (you need more than 2000 <i class="nuls"></i>).
            </div>
            <div v-if="account_value > 2000">
              <p class="text-muted" v-if="!account_stakes.length">No staking yet. You are losing out!</p>
              <b-list-group class="list-group-flush">
                <b-list-group-item v-for="stake in account_stakes"
                v-if="stake.active && Object.keys(consensus).includes(stake.agentHash)" class="d-flex justify-content-between align-items-center">
                  <span>
                    {{ consensus[stake['agentHash']].agentName || consensus[stake['agentHash']].agentId }} ({{stake.value/100000000}} <i class="nuls"></i>)
                  </span>
                  <div>
                    <!--<b-button variant="info" size="sm"><i class="fe fe-edit-2"></i></b-button>-->
                    <b-link v-if="stake['type'] == 'stake'" href="#" @click="removeStake(stake)" v-b-popover.hover="'Un-Stake'"><XIcon /></b-link>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </b-card>
        </div>
        <div class="col-12 col-md-6">
          <!-- Devices -->
          <div class="card">
            <div class="card-header">
              <!-- Title -->
              <h4 class="card-header-title">
                Summary
              </h4>
            </div>
            <table class="card-table table table-sm table-striped table-responsive-sm">
              <tbody>
                <tr>
                  <td>Address</td>
                  <td class="text-right">{{address}}</td>
                </tr>
                <tr>
                  <td>Unspent outputs (including locked)</td>
                  <td class="text-right">{{stats.unspent_count}}</td>
                </tr>
                <tr>
                  <td>Unspent Balance (including locked)</td>
                  <td class="text-right">{{stats.unspent_value/100000000}} <i class="nuls"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <b-card no-body
              title="Transactions"
              class="mb-2 table-responsive-sm">
        <div class="card-header">
          <!-- Title -->
          <h4 class="card-header-title">
            Summary
          </h4>
        </div>
        <b-table show-empty
             stacked="md"
             class="card-table table-sm table-stripped"
             :items="transactions"
             :fields="tx_fields"
             :current-page="currentPage"
             :per-page="perPage"
             :sort-by.sync="tx_sortBy"
             :sort-desc.sync="tx_sortDesc"
          >
          <template slot="source" slot-scope="data">
            {{data.item.source}}
          </template>
          <template slot="tags" slot-scope="data">
            <span class="badge badge-primary">
              {{data.item.display_type}}
            </span>&nbsp;<span v-if="data.item.remark"
                  v-b-popover.hover="data.item.remark" title="Remark">
                  <InfoIcon />
            </span>
          </template>
          <template slot="value" slot-scope="data">
            {{(data.item.value/100000000).toFixed(3)}}&nbsp;<i class="nuls"></i>
          </template>
          <template slot="fee" slot-scope="data">
            {{(data.item.fee/100000000).toFixed(3)}}
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AppHeader from './AppHeader.vue'
import Transfer from './Transfer.vue'
import Request from './Request.vue'
import Stake from './Stake.vue'
import Sign from './Sign.vue'
import {hash_from_address} from 'nulsworldjs/src/model/data.js'
import {Coin, Transaction} from 'nulsworldjs/src/model/transaction.js'
import { mapState } from 'vuex'
import store from '../store'
import { Carousel, Slide } from 'vue-carousel';

import {
  Edit3Icon, EyeIcon, InboxIcon,
  GitMergeIcon, SendIcon, XIcon,
  InfoIcon, CreditCardIcon} from 'vue-feather-icons'

export default {
  name: 'accounts',
  props: ['address'],
  data () {
    this.$nextTick(this.update)
    return {
      account: {},
      stats: {},
      consensus: {},
      account_stakes: [],
      outputs: [],
      last_sync_height: 0,
      total_outputs_value: 0,
      transactions: [],
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      transferShow: false,
      requestShow: false,
      stakeShow: false,
      signShow: false,
      backupShow: false,
      account_value: 0, // available + consensus locked (no time locked)
      signTx: null,
      signReason: '',
      tx_sortBy: 'time',
      tx_sortDesc: true,
      tx_fields: [
        { key: 'time',
          label: 'Date',
          formatter: 'dateformat',
          sortable: true },
        {
          key: 'source'
        },
        {
          key: 'target'
        },
        {
          key: 'tags',
          label: ' '
        },
        {
          key: 'value',
          sortable: true
        },
        {
          key: 'fee',
          sortable: true
        }
      ]
    }
  },
  watch: {
    address: async function () {
      this.last_sync_height = 0
      this.transactions = []
      this.account_stakes = []
      await this.update()
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'accounts',
    'settings'
  ]),
  methods: {
    dateformat (dt) {
      return moment.unix(dt / 1000).format('lll')
    },
    async updateConsensus () {
      let response = await axios.get(`${this.settings.api_server}consensus/agents.json`)
      this.$set(this, 'consensus', response.data.agents)
    },
    async updateTxs (min_height) {
      let response = await axios.get(`${this.settings.api_server}addresses/${this.address}/summary/all.json?min_height=${min_height}`)
      this.transactions = this.transactions.concat(response.data.transactions)
      this.totalRows = this.transactions.length
      this.last_sync_height = response.data.last_height
    },
    async updateStatus () {
      let response = await axios.get(`${this.settings.api_server}addresses/consensus/${this.address}.json`)
      this.$set(this, 'account_stakes', response.data.positions)

      response = await axios.get(`${this.settings.api_server}addresses/stats`, {
        params: {
          addresses: [this.address]
        }
      })
      let stats = response.data.unspent_info[this.address]
      if (stats !== undefined) { this.$set(this, 'stats', stats) } else { this.$set(this, 'stats', {}) }
      store.commit('set_last_height', response.data.last_height)
    },
    async update () {
      this.$set(this, 'account', this.accounts.find(obj => {
        return obj.address === this.address
      }))
      await this.updateStatus()
      await this.updateConsensus()
      // this.transactions = []
      // this.totalRows = 0
      await this.updateTxs(this.last_sync_height)

      this.$set(this, 'account_value',
        ((this.stats.consensus_locked_value || 0) + (this.stats.available_value || 0)) /
          100000000)
    },
    async removeStake (stake) {
      let tx = Transaction.from_dict(
        {'inputs': [
          {
            'fromHash': stake.hash,
            'fromIndex': 0, // Are we sure it's always 0 ? We should look into tx there.
            'value': stake.value,
            'lockTime': -1 // consensus lock
          }
        ],
        'outputs': [
          {address: hash_from_address(this.account.address),
            value: stake.value}
        ],
        'info': {
          'joinTxHash': stake.hash
        },
        'type': 6,
        'scriptSig': '',
        'remark': 'bye!'
        }
      )

      let fee = tx.calculate_fee()
      tx.outputs[0].na = stake.value - fee

      this.signTx = tx
      this.signReason = ('Unstake ' + (stake.value / 100000000) +
            ' from ' +
            (this.consensus[stake['agentHash']].agentName ||
               this.consensus[stake['agentHash']].agentId))
      this.signShow = true
    },
    async consolidate () {
      let outputs_data = await this.getOutputs()

      let tx = Transaction.from_dict(
        {'inputs': [

        ],
        'outputs': [
          {address: hash_from_address(this.account.address),
            value: outputs_data.total_available}
        ],
        'type': 2,
        'scriptSig': '',
        'remark': 'consolidation'
        }
      )

      let total_value = 0
      while (tx.get_max_size() < 290000) {
        let utxo = outputs_data.outputs.shift()
        if (utxo === undefined) { break }

        total_value += utxo.value
        tx.inputs.push(Coin.from_dict({
          fromHash: utxo.hash,
          fromIndex: utxo.idx,
          value: utxo.value,
          lockTime: utxo.lockTime
        }))
      }
      tx.outputs[0].na = total_value - tx.calculate_fee()

      this.signTx = tx
      this.signReason = (`Consolidate ${tx.inputs.length} inputs`)
      this.signShow = true
    },
    async getOutputs () {
      let response = await axios.get(`${this.settings.api_server}addresses/outputs/${this.account.address}.json`)
      return response.data
    },
    rename () {
      store.commit('start_rename', this.account)
    },
    delete_account () {
      if (confirm(`Delete account ${this.account.name} ?\n\nPlease backup your private key before doing this!`)) {
        if (confirm(`The address is ${this.account.address}\n\nAre you really sure? There is no way to going back!`)) {
          alert(`Ok, deleting address ${this.account.address}`)
          store.commit('remove_account', this.account)
          this.$router.push('/')
        }
      }
    }
  },
  components: {
    AppHeader,
    Transfer,
    Request,
    Stake,
    Sign,
    Edit3Icon, EyeIcon, InboxIcon,
    GitMergeIcon, SendIcon, XIcon,
    InfoIcon, CreditCardIcon,
    Carousel, Slide
  },
  async created () {
    this.last_sync_height = 0
    this.transactions = []
    this.account_stakes = []
    // await this.update()
    setInterval(this.update.bind(this), 10000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tx-detail {
  font-size: 60%;
  max-height: 8rem;
  background-color: #f9fbfd;
  border-bottom: 1px solid #edf2f9;
  padding: .5rem;

  white-space: pre-wrap;       /* css-3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
