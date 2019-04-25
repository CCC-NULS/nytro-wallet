<template>
  <div>
    <h4>{{reason}}</h4>
    <div class="form-group" v-if="tx !== null">

      <div v-if="transactions.length > 1">
        <label>{{$t('resource.transactions')}}</label>
        <code class="d-block text-wrap-word">{{transactions.length}}</code>
      </div>

      <label>{{$t('resource.fee')}}</label>
      <code class="d-block text-wrap-word">{{total_fees/100000000}}</code>

      <div v-if="!Array.isArray(tx)">
        <b-link v-b-toggle.collapsetx><i class="fe fe-eye"></i> {{$t('actions.view_detail')}}</b-link>
        <b-collapse id="collapsetx">

          <label>{{$t('resource.transaction_content')}}</label>
          <pre class="tx-detail text-wrap-word">{{tx.to_dict() | pretty}}</pre>

          <label>{{$t('resource.unsigned_raw_transaction')}}</label>
          <pre class="tx-detail text-wrap-word">{{tx.serialize().toString('hex')}}</pre>
        </b-collapse>
      </div>

    </div>

    <!-- Submit -->
    <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="sign" :disabled="tx==null">
      {{$t('actions.sign_transaction')}}
    </button>

    <div class="form-group" v-if="signed_tx !== null">
      <div v-if="transactions.length > 1">
        <b-link v-b-toggle.collapsesignedtx><i class="fe fe-eye"></i> {{$t('actions.view_detail')}}</b-link>
        <b-collapse id="collapsesignedtx">

          <label>{{$t('resource.signed_transaction')}}</label>
          <pre class="tx-detail text-wrap-word">{{signed_tx}}</pre>
        </b-collapse>
      </div>

      <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="broadcast">
        {{$t('actions.broadcast_transaction')}}
      </button>

    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {private_key_to_public_key,
  address_from_hash,
  hash_from_address,
  public_key_to_hash
} from 'nulsworldjs/src/model/data.js'
import Transaction from 'nulsworldjs/src/model/transaction.js'
import { mapState } from 'vuex'


let ipcpRenderer = null
if (!process.env.IS_WEB) {
  ipcpRenderer = require('electron-ipcp').ipcpRenderer
}

export default {
  name: 'sign',
  data () {
    return {
      'signed_tx': null,
      'fee': 0
    }
  },
  watch: {
    tx: async function () {
      this.signed_tx = null
    }
  },
  computed: {
    tx_raw () {
      return this.tx.serialize().toString('hex')
    },
    tx_dict () {
      return this.tx.to_dict()
    },
    transactions () {
      if (!Array.isArray(this.tx))
        return [this.tx]
      else
        return this.tx
    },
    total_fees () {
      let fee = 0
      for (let tx of this.transactions) {
        fee += tx.get_fee()
      }
      return fee
    }
  },
  methods: {
    prepareTx () {
      // this.tx_raw = this.tx.serialize().toString('hex')
      // this.tx_dict = this.tx.to_dict()
    },
    async sign () {
      let signed_tx = []
      for (let tx of this.transactions) {
        if (this.account.private_key !== null) {
          tx.sign(Buffer.from(this.account.private_key, 'hex'))
          signed_tx.push(tx.serialize().toString('hex'))
        } else if (this.account.type === 'ledger') {
          //tx.scriptSig = null
          let scriptSig = null
          if (!process.env.IS_WEB) {
            scriptSig = await ipcpRenderer.sendMain(
              'ledger_get_scriptsig', this.$store.state.settings.chain_id,
              tx.serialize().toString('hex'))
          } else {
            const {ledger_get_scriptsig} = require('../ledger_browser')
            scriptSig = await ledger_get_scriptsig(this.$store.state.settings.chain_id, tx.serialize().toString('hex'))
          }
          if (scriptSig !== null) {
            tx.scriptSig = Buffer.from(scriptSig, 'hex')
            console.log(tx.serialize().toString('hex'))
            signed_tx.push(tx.serialize().toString('hex'))
          } else {
            this.$notify({
              group: 'wallet',
              title: 'Signature error',
              'type': 'error'
            })
          }
        }

      }
      this.signed_tx = signed_tx
    },
    async broadcast () {
      for (let tx_hex of this.signed_tx) {
        let response = await axios.post(`${this.api_server}/broadcast`, {
          txHex: tx_hex
        })
        if ((response.data !== null) && (response.data.value !== undefined)) {
          this.$notify({
            group: 'wallet',
            title: 'Transaction sent',
            'type': 'success',
            text: 'TX hash: ' + response.data.value
          })
        } else {
          this.$notify({
            group: 'wallet',
            title: 'Error',
            'type': 'error',
            text: 'An error occured while trying to broadcast the TX.'
          })
        }
        this.$emit('message-broadcasted', response.data)
      }
    }
  },
  props: ['account', 'tx', 'reason', 'api_server'],
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
