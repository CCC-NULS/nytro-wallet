<template>
  <div id="window">
    <AppHeader :select-title="account.name">
      <b-col class="py-1 justify-content-center align-self-center" cols="auto">
        <b-button variant="icon-lg" @click="transferShow = !transferShow" v-b-popover.hover.bottom="$t('actions.send')"><UploadIcon /></b-button>
        <b-button variant="icon-lg" @click="requestShow = !requestShow" v-b-popover.hover.bottom="$t('actions.request')"><DownloadIcon /></b-button>

      </b-col>
      <b-col class="py-1 justify-content-center align-self-center" cols="auto">
        <b-dropdown variant="link" size="lg" no-caret right>
          <template slot="button-content">
            <MoreVerticalIcon /><span class="sr-only">actions</span>
          </template>
          <b-dropdown-item href="#" :disabled="((stats.unspent_count || 0)< 30)" @click="consolidate"><GitMergeIcon /> {{$t('actions.consolidate')}}</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item href="#" @click="backupShow = !backupShow"><EyeIcon /> {{$t('actions.backup')}}</b-dropdown-item>
          <b-dropdown-item href="#" @click="rename"><Edit3Icon /> {{$t('actions.rename')}}</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item href="#" @click="delete_account"><DeleteIcon /> {{$t('actions.delete')}}</b-dropdown-item>
        </b-dropdown>
      </b-col>
    </AppHeader>
    <div id="content" class="flex-fill">
      <b-container class="mt-4">
        <b-modal id="transferModal" ref="transferModal" hide-footer :title="$t('actions.send')" v-model="transferShow">
          <transfer v-if="transferShow" :account="account" :stats="stats" @message-broadcasted="transferShow = !transferShow"></transfer>
        </b-modal>
        <b-modal id="requestModal" ref="requestModal" hide-footer :title="$t('actions.request')" v-model="requestShow">
          <request v-if="requestShow" :account="account"></request>
        </b-modal>
        <b-modal id="stakeModal" ref="stakeModal" hide-footer :title="$t('actions.stake')" v-model="stakeShow">
          <stake v-if="stakeShow" :account="account" :stats="stats" :consensus="consensus" @message-broadcasted="stakeShow = !stakeShow"></stake>
        </b-modal>
        <b-modal id="signModal" ref="signModal" hide-footer :title="signReason" v-model="signShow">
          <sign v-if="signShow" :account="account" :tx="signTx" :reason="signReason" :api_server="settings.api_server" @message-broadcasted="signShow = !signShow"></sign>
        </b-modal>
        <b-modal id="backupModal" ref="backupModal" :title="$t('actions.backup')" v-model="backupShow" ok-variant>
          <div v-if="backupShow">
            <div class="form-group" v-if="tx !== null">
              <label>{{$t('resource.address')}}</label>
              <pre class="tx-detail text-wrap-word">{{account.address}}</pre>
              <label>{{$t('resource.private_key')}}</label>
              <pre class="tx-detail text-wrap-word">{{account.private_key}}</pre>
            </div>
          </div>
        </b-modal>
        <b-row>
          <b-col>
            <h1 class="head-400">
              <CreditCardIcon />
              {{account.name}}
              <b-link @click="rename" class="text-muted" v-b-popover.hover.bottom="$t('actions.rename')">
                <small>
                  <Edit3Icon />
                </small>
              </b-link>
            </h1>
          </b-col>
          <b-col cols="auto" class="text-right align-self-center">
            <h3 class="body-200 text-blue-30">{{account.address}}</h3>
          </b-col>
        </b-row>
        <carousel :scrollPerPage="true" :perPageCustom="[[480, 2], [768, 3]]"
                  paginationActiveColor="#FFFFFF" paginationColor="#5376AC"
                  :paginationPadding="3.5" :paginationSize="7"
                  :navigationEnabled="true" navigationPrevLabel=" "
                  navigationNextLabel=" " :navigationClickTargetSize="2">
          <slide>
            <b-card class="m-2">
              <h4 slot="header">{{$t('wallet.wallet_value')}}</h4>
              <p class="card-price">
                {{price_info.DISPLAY.NULS[to_symbol].TOSYMBOL}}
                {{(((stats.unspent_value || 0)/100000000) * price_info.RAW.NULS[to_symbol].PRICE).toFixed(2)}}
              </p>
            </b-card>
          </slide>
          <slide>
            <b-card class="m-2">
              <h4 slot="header"><i class="nuls-green"></i> {{$t('public.balance')}} <span class="text-muted">{{$t('public.including_locked')}}</span></h4>
              <p class="card-price"><i class="nuls-green"></i> {{((stats.unspent_value || 0)/100000000).toFixed(2)}}</p>
            </b-card>
          </slide>
          <slide>
            <b-card class="m-2">
              <h4 slot="header"><i class="nuls-green"></i> {{$t('public.available')}}</span></h4>
              <p class="card-price"><i class="nuls-green"></i> {{((stats.available_value || 0)/100000000).toFixed(2)}}</p>
            </b-card>
          </slide>
          <slide>
            <b-card class="m-2">
              <h4 slot="header"><i class="nuls-green"></i> {{$t('public.time_locked')}}</span></h4>
              <p class="card-price"><i class="nuls-green"></i> {{((stats.time_locked_value || 0)/100000000).toFixed(2)}}</p>
            </b-card>
          </slide>
          <slide>
            <b-card class="m-2">
              <h4 slot="header"><i class="nuls-green"></i> {{$t('public.staked')}}</span></h4>
              <p class="card-price"><i class="nuls-green"></i> {{((stats.consensus_locked_value || 0)/100000000).toFixed(2)}}</p>
            </b-card>
          </slide>
          <slide>
            <b-card class="m-2">
              <h4 slot="header">{{$t('wallet.unspent_outputs')}}</span></h4>
              <p class="card-price">{{(stats.unspent_count || 0)}}</p>
            </b-card>
          </slide>
        </carousel>

        <b-card no-body class="my-4">
          <b-tabs pills card>
            <b-tab :title="$t('wallet.tab_transactions')" active no-body>
              <b-table show-empty
                   stacked="md"
                   class="card-table table-sm table-striped bg-blue-003"
                   :items="transactions"
                   :fields="tx_fields"
                   :current-page="currentPage"
                   :per-page="perPage"
                   :sort-by.sync="tx_sortBy"
                   :sort-desc.sync="tx_sortDesc"
                >
                <template slot="time" slot-scope="data">
                  {{dateformat(data.item.time)}}
                </template>
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
              <b-row class="pb-3 px-3">
                <b-col md="6" class="my-1">
                  <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
              </b-row>
            </b-tab>

            <b-tab :title="$t('wallet.tab_staking')">
              <div class="row align-items-center mb-4">
                <div class="col">
                  <h4 class="card-header-title">{{$t('wallet.current_staking')}}</h4>
                </div>
                <div class="col-auto" v-if="((stats.available_value || 0)/100000000) > 2000">
                  <b-button @click="stakeShow = !stakeShow" size="lg"><PlusIcon /> {{$t('actions.stake')}}</b-button>
                </div>
              </div>

              <div class="text-muted" v-if="account_value <= 2000">
                {{$t('wallet.more_than_2000_required')}}
              </div>

              <div v-if="account_value > 2000">
                <div class="text-muted"
                    v-if="!(account_stakes.filter(st=>(st.active&& Object.keys(consensus).includes(st.agentHash))).length)">
                    {{$t('wallet.no_staking_yet')}}
                </div>
                <b-row>
                  <b-col v-for="stake in account_stakes"
                         v-if="stake.active && Object.keys(consensus).includes(stake.agentHash)" :key="stake.hash"
                         cols="6" xl="4" class="mb-3">
                    <agent-view :agent="consensus[stake['agentHash']]" :stake="stake" :removeStake="removeStake" />
                  </b-col>
                </b-row>
              </div>

            </b-tab>
          </b-tabs>
        </b-card>
      </b-container>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import Transfer from './Transfer.vue'
import Request from './Request.vue'
import Stake from './Stake.vue'
import AgentView from './AgentView.vue'
import Sign from './Sign.vue'
import {hash_from_address} from 'nulsworldjs/src/model/data.js'
import {Coin, Transaction} from 'nulsworldjs/src/model/transaction.js'
import { mapState } from 'vuex'
import store from '../store'
import { Carousel, Slide } from 'vue-carousel';

import {
  Edit3Icon, EyeIcon, InboxIcon,
  GitMergeIcon, SendIcon, XIcon,
  InfoIcon, CreditCardIcon, DeleteIcon,
  UploadIcon, DownloadIcon, MenuIcon, PlusIcon,
  DollarSignIcon, MoreVerticalIcon, LockIcon, UnlockIcon,
  CommandIcon} from 'vue-feather-icons'

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
          label: this.$t('info.date'),
          formatter: 'dateformat',
          sortable: true
        },
        {
          key: 'source',
          label: this.$t('info.source')
        },
        {
          key: 'target',
          label: this.$t('info.target')
        },
        {
          key: 'tags',
          label: ' '
        },
        {
          key: 'value',
          label: this.$t('info.value'),
          sortable: true
        },
        {
          key: 'fee',
          label: this.$t('info.fee'),
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
    'settings',
    'price_info',
    'to_symbol'
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
      this.signReason = this.$t('wallet.unstake_from', {
        amount: (stake.value / 100000000),
        agent: (this.consensus[stake['agentHash']].agentName ||
            this.consensus[stake['agentHash']].agentId)
      })
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
      this.signReason = this.$t('wallet.consolidate_outputs', {count: tx.inputs.length})
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
      if (confirm(this.$t('wallet.delete_account_1', {account_name: this.account.name}))) {
        if (confirm(this.$t('wallet.delete_account_2', {account_address: this.account.address}))) {
          alert(this.$t('wallet.delete_account_3', {account_address: this.account.address}))
          store.commit('remove_account', this.account)
          this.$router.push('/')
        }
      }
    }
  },
  components: {
    AppHeader, AppFooter,
    Transfer,
    Request,
    Stake, AgentView,
    Sign, Carousel, Slide,
    Edit3Icon, EyeIcon, InboxIcon,
    GitMergeIcon, SendIcon, XIcon,
    InfoIcon, CreditCardIcon, DeleteIcon,
    UploadIcon, DownloadIcon, MenuIcon, PlusIcon,
    DollarSignIcon, MoreVerticalIcon, LockIcon, UnlockIcon,
    CommandIcon
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
