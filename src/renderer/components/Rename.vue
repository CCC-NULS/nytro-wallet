<template>
  <form>
    <b-form-group
      id="name-group"
      :label="$t('resource.account_name')"
      label-for="name"
      :state="nameState"
  >
      <b-form-input id="name" :state="nameState" v-model.trim="name"></b-form-input>
      <b-form-text id="amountHelp" class="text-white">
        {{$t('resource.address')}}: {{address}}
      </b-form-text>
    </b-form-group>

    <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="rename" :disabled="!nameState">
      {{$t('actions.save')}}
    </button>
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
import { mapState } from 'vuex'
import store from '../store'

export default {
  name: 'rename',
  data () {
    return {
      'name': '',
      'address': ''
    }
  },
  computed: {
    nameState () {
      if (!this.name) { return false }
      if (this.name.length > 50) { return false }

      return true
    },
    ... mapState([
      // map this.count to store.state.count
      'accounts',
      'settings'
    ])
  },
  watch: {
    account() {
      console.log(this.account)
      this.name = this.account.name
      this.address = this.account.address
    }
  },
  methods: {
    rename () {
     // save the name here...
     store.commit('rename_account', {
       account: this.account,
       name: this.name
     })
    }
  },
  props: ['account'],
  components: {
  },
  async created () {
    this.name = this.account.name
    this.address = this.account.address
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
