<template>
  <form :class="outputs === null ? 'is-loading is-loading-lg' : ''">
    <b-form-group
      id="address-group"
      label="Target address"
      label-for="target"
      :state="addressState"
      :invalid-feedback="invalidAddressFeedback"
      :valid-feedback="validAddressFeedback"
  >
      <b-form-input id="target" :state="addressState" v-model.trim="targetAddress"
                    v-on:change="prepareTx"
                    v-on:input="prepareTx"
                    v-on:paste="paste"></b-form-input>
    </b-form-group>
    <b-form-group
      id="address-group"
      label="Amount"
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
      <b-form-text id="amountHelp">
        Your balance is
        <b-link @click="set_amount(total_outputs_value/100000000)">
          {{total_outputs_value/100000000}}<i class="nuls"></i>
        </b-link>
      </b-form-text>
    </b-form-group>

    <b-form-group
      id="remark-group"
      label="Remark"
      label-for="remark"
      >
      <b-input-group>
        <b-form-input type="text" placeholder="Remark" :maxlength="100"
             v-on:change="prepareTx"
             v-on:input="prepareTx" v-model="remark" />
        <div class="input-group-append">
          <div class="input-group-text" v-text="(100 - remark.length)"></div>
        </div>
      </b-input-group>
    </b-form-group>

    <sign :tx="tx" :account="account" @message-broadcasted="broadcasted" />

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
  name: 'transfer',
  data () {
    return {
      'targetAddress': '',
      'amount': 0.0,
      'tx': null,
      'fee': 0,
      'remark': '',
      'outputs': null,
      'stats': {},
      'last_sync_height': 0,
      'total_outputs_value': 0
    }
  },
  computed: {
    addressState () {
      if (this.targetAddress.length != 32) { return false }
      // if (!this.targetAddress.startsWith("Ns"))
      //  return false;
      return true
    },
    invalidAddressFeedback () {
      return 'Invalid address'
    },
    validAddressFeedback () {
      return 'Address seems valid'
    },
    amountState () {
      if (!this.amount) { return false }
      if (typeof this.amount === 'string' || this.amount instanceof String) { return false }
      if (this.amount < 0.001) { return false }
      if (this.amount > (this.total_outputs_value / 100000000)) {
        this.amount = this.total_outputs_value / 100000000
        return true
      }

      return true
    },
    validAmountFeedback () {
      return 'Valid amount requested: ' + this.amount
    },
    invalidAmountFeedback () {
      if (this.amount < 0.001) {
        return 'Please enter an amount above 0.001.'
      }
      if (this.amount > (this.stats.available_value / 100000000)) { return 'Available balance (' + this.stats.available_value / 100000000 + ') too low.' }

      return ''
    },
    ...mapState([
      // map this.count to store.state.count
      'accounts',
      'settings'
    ])
  },
  methods: {
    prepareTx () {
      if (!(this.amountState && this.addressState)) {
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
            {address: hash_from_address(this.targetAddress),
              value: target_value},
            {address: hash_from_address(this.account.address),
              value: current_value - target_value} // no fee applied yet
          ],
          'type': 2,
          'scriptSig': '',
          'remark': this.remark
        }
      )

      let fee = tx.calculate_fee()
      this.fee = fee
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
    async getOutputs () {
      let response = await axios.get(`${this.settings.api_server}addresses/outputs/${this.account.address}.json`)
      this.$set(this, 'stats', response.data.unspent_info)
      this.$set(this, 'outputs', response.data.outputs)
      this.$set(this, 'last_sync_height', response.data.last_height)
      this.$set(this, 'total_outputs_value', response.data.total_available)
    },
    broadcasted (msg) {
      Object.assign(this.$data, this.$options.data())
      this.outputs = null
      this.$emit('message-broadcasted', msg)
    },
    set_amount (amount) {
      this.amount = amount
    }
  },
  props: ['account'],
  components: {
    Sign
  },
  async created () {
    await this.getOutputs()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
