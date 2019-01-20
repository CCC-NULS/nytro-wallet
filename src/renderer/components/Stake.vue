<template>
  <form :class="outputs === null ? 'is-loading is-loading-lg' : ''">
    <b-form-group
      id="address-group"
      :label="$t('staking.target_node')"
      label-for="target"
      :state="targetState"
      :invalid-feedback="invalidTargetFeedback"
      :valid-feedback="validTargetFeedback"
      >
      <v-select v-model="targetNode" :options="Object.values(consensus)"
                id="target" label="agentId"
                @change="prepareTx()">
        <template slot="option" slot-scope="option">
          <div class="row">
            <div class="col">
              {{ option.agentName || option.agentId }}
            </div>
            <div class="col-auto" v-b-tooltip.hover title="Commission">
              <span class="small text-muted">
                {{ option.commissionRate }} %
              </span>
            </div>
            <div class="col-auto" v-b-tooltip.hover title="Credit score">
              <small class="status">
                <span class="text-success" v-if="(option.creditVal > 0.8) && (option.status==1)">●</span>
                <span class="text-secondary" v-if="option.status!=1">●</span>
                <span class="text-warning" v-if="(option.creditVal >= 0) && (option.creditVal <= 0.8) && (option.status==1)">●</span>
                <span class="text-error" v-if="(option.creditVal < 0) && (option.status==1)">●</span>
                {{ option.creditVal.toFixed(2) }}
              </small>
            </div>
          </div>
        </template>
      </v-select>
    </b-form-group>
    <b-form-group
      id="address-group"
      :label="$t('resource.amount')"
      label-for="amount"
      :invalid-feedback="invalidAmountFeedback"
      :valid-feedback="validAmountFeedback"
      :state="amountState"
      >
      <b-input-group size="lg">
        <b-form-input id="amount" :state="amountState"
                      v-model.number="amount"
                      v-on:change="prepareTx"
                      v-on:input="prepareTx"></b-form-input>
        <div class="input-group-append">
          <div class="input-group-text">
            <i class="nuls"></i>
          </div>
        </div>
      </b-input-group>
    </b-form-group>

    <b-form-group
      id="remark-group"
      :label="$t('resource.remark')"
      label-for="remark"
      >
      <b-input-group>
        <b-form-input type="text" :placeholder="$t('resource.remark')" :maxlength="100"
             v-on:change="prepareTx"
             v-on:input="prepareTx" v-model="remark" />
        <div class="input-group-append">
          <div class="input-group-text" v-text="(100 - remark.length)"></div>
        </div>
      </b-input-group>
    </b-form-group>

    <sign :account="account" :tx="tx" :api_server="settings.api_server" @message-broadcasted="broadcasted" />

  </form>
</template>
<script>
import axios from 'axios'
import {private_key_to_public_key,
  address_from_hash,
  hash_from_address,
  public_key_to_hash,
  get_outputs_for_sum
} from 'nulsworldjs/src/model/data.js'
import Transaction from 'nulsworldjs/src/model/transaction.js'
import Sign from './Sign.vue'
import { mapState } from 'vuex'

export default {
  name: 'stake',
  data () {
    return {
      'targetNode': null,
      'amount': 2000,
      'tx': null,
      'tx_dict': null,
      'tx_raw': null,
      'signed_tx': null,
      'fee': 0,
      'remark': '',
      'outputs': null,
      'stats': {},
      'last_sync_height': 0,
      'total_outputs_value': 0
    }
  },
  computed: {
    targetState () {
      // if (!this.targetAddress.startsWith("Ns"))
      //  return false;
      console.log(this.targetNode)
      if (this.targetNode == null) { return false }
      return true
    },
    invalidTargetFeedback () {
      return this.$t('resource.invalid_target')
    },
    validTargetFeedback () {
      return this.$t('resource.valid_target')
    },
    amountState () {
      if (!this.amount) { return false }
      if (typeof this.amount === 'string' || this.amount instanceof String) { return false }
      if (this.targetNode !== null) {
        console.log(50000000000000 - this.targetNode.totalDeposit)
        if (this.amount > ((50000000000000 - this.targetNode.totalDeposit) / 100000000)) {
          this.amount = (50000000000000 - this.targetNode.totalDeposit) / 100000000
        }
      }

      if (this.amount < 2000) { return false }

      if (this.amount > (this.total_outputs_value / 100000000)) {
        this.amount = this.total_outputs_value / 100000000
      }

      return true
    },
    validAmountFeedback () {
      return this.$t('resource.valid_amount', {amount: this.amount})
    },
    invalidAmountFeedback () {
      if (this.amount < 2000) {
        return this.$t('resource.min_amount', {min: 2000})
      }
      if (this.amount > (this.stats.available_value / 100000000)) {
        return this.$t('resource.insuficient_balance', {
          balance: this.stats.available_value / 100000000
        })
      }

      return ''
    },
    ... mapState([
      // map this.count to store.state.count
      'accounts',
      'settings'
    ])
  },
  methods: {
    signTx () {

    },
    prepareTx () {
      if (!(this.amountState && this.targetState)) {
        this.tx = null
        return
      }
      this.signed_tx = null

      let target_value = this.amount * 100000000
      let {in: selected_inputs,
        val: current_value} = get_outputs_for_sum((this.amount + 0.1) * 100000000, this.outputs)

      let tx = Transaction.from_dict(
        {'inputs': selected_inputs,
          'outputs': [
            {address: hash_from_address(this.account.address),
              value: target_value,
              lockTime: -1},
            {address: hash_from_address(this.account.address),
              value: current_value - target_value} // no fee applied yet
          ],
          'type': 5,
          'scriptSig': '',
          'remark': this.remark,
          'info': {
            'deposit': target_value,
            'address': this.account.address,
            'agentHash': this.targetNode.agentHash
          }
        }
      )

      let fee = tx.calculate_fee()
      let change = current_value - target_value - fee
      if (change > 0) {
        tx.outputs[1].na = change
      } else {
        tx.outputs[0].na += change
        this.amount = tx.outputs[0].na / 100000000
        tx.outputs.splice(1, 1)
      }

      this.tx = tx
    },
    paste () {
      this.prepareTx()
      return true
    },
    broadcasted (msg) {
      Object.assign(this.$data, this.$options.data())
      this.$emit('message-broadcasted', msg)
    },
    async getOutputs () {
      let response = await axios.get(`${this.settings.api_server}addresses/outputs/${this.account.address}.json`)
      this.$set(this, 'stats', response.data.unspent_info)
      this.$set(this, 'outputs', response.data.outputs)
      this.$set(this, 'last_sync_height', response.data.last_height)
      this.$set(this, 'total_outputs_value', response.data.total_available)
    }
  },
  components: {
    Sign
  },
  props: ['account', 'consensus'],
  async created () {
    await this.getOutputs()
  }
}
</script>
