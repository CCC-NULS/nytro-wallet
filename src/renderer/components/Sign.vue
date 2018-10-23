<template>
  <div>
    <h4>{{reason}}</h4>
    <div class="form-group" v-if="tx !== null">
      <b-link v-b-toggle.collapsetx><i class="fe fe-eye"></i> detail</b-link>
      <b-collapse id="collapsetx">

        <label>Transaction content</label>
        <pre class="tx-detail text-wrap-word">{{tx.to_dict() | pretty}}</pre>

        <label>Unsigned Raw Transaction</label>
        <pre class="tx-detail text-wrap-word">{{tx.serialize().toString('hex')}}</pre>

        <label>Fee</label>
        <code class="d-block text-wrap-word">{{tx.get_fee()/100000000}}</code>
      </b-collapse>

    </div>

    <!-- Submit -->
    <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="sign" :disabled="tx==null">
      Sign Transaction
    </button>

    <div class="form-group" v-if="signed_tx !== null">

      <label>Signed Transaction</label>
      <pre class="tx-detail text-wrap-word">{{signed_tx}}</pre>

      <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="broadcast">
        Broadcast Transaction
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
    }
  },
  methods: {
    prepareTx () {
      // this.tx_raw = this.tx.serialize().toString('hex')
      // this.tx_dict = this.tx.to_dict()
    },
    sign () {
      this.tx.sign(Buffer.from(this.account.private_key, 'hex'))
      this.signed_tx = this.tx.serialize().toString('hex')
    },
    async broadcast () {
      let response = await axios.post('/broadcast', {
        txHex: this.signed_tx
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
  },
  props: ['account', 'tx', 'reason'],
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
