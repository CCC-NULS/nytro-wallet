<template>
  <div>
    <AppHeader />
    <b-container>
      <div class="row justify-content-center">
        <div class="col-12 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Login with a private key
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Enter your private key to access your account.<br/>
            This operation is made in your browser : This key doesn't leave your computer.
          </p>

          <!-- Form -->
          <form>

            <!-- Email address -->
            <div class="form-group">

              <b-form-group
                label="Private Key"
                label-for="private_key"
                :state="prvState"
            >
                <b-form-textarea id="private_key" :state="prvState"
                              v-model="private_key"
                              v-on:input="analyze"
                              :maxlength="66"
                              :rows="1"></b-form-textarea>
              </b-form-group>

              <label>Public Key</label>
              <code class="d-block text-truncate">{{public_key}}</code>

              <label>Address</label>
              <code class="d-block text-truncate">{{address}}</code>

            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="add">
              Log-in
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                No account yet ? <router-link to="/new">Create one</router-link>.
              </small>
            </div>

          </form>

        </div>
      </div> <!-- / .row -->
    </b-container>
  </div>
</template>

<script>
import {private_key_to_public_key,
  address_from_hash,
  public_key_to_hash
} from 'nulsworldjs/src/model/data.js'
import { mapState } from 'vuex'
import store from '../store'
import AppHeader from './AppHeader.vue'

var hexRegEx = /([0-9]|[a-f])/gim

function isHex (input) {
  return typeof input === 'string' &&
    (input.match(hexRegEx) || []).length === input.length
}

export default {
  name: 'login',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      'private_key': '',
      'public_key': null,
      'address_hash': null,
      'address': null
    }
  },
  computed: {
    prvState () {
      if (!isHex(this.private_key)) { return false }
      if (!this.private_key) { return false }
      if ((this.private_key.length === 66) && (this.private_key.substring(0, 2) === '00')) {
        this.private_key = this.private_key.substring(2, 66)
        return true
      }
      if (this.private_key.length !== 64) { return false }
      try {
        let prvbuffer = Buffer.from(this.private_key, 'hex')
        let pub = private_key_to_public_key(prvbuffer)
        return true
      } catch (e) {
        return false
      }
    },
    ... mapState([
      // map this.count to store.state.count
      'accounts',
      'settings'
    ])
  },
  methods: {
    analyze () {
      if (this.prvState) {
        let prvbuffer = Buffer.from(this.private_key, 'hex')
        let pub = private_key_to_public_key(prvbuffer)
        let hash = public_key_to_hash(pub, {
          chain_id: this.settings.chain_id
        })
        let address = address_from_hash(hash)
        // Vue.set(this, 'public_key', pub);
        this.public_key = pub.toString('hex')
        this.address_hash = hash.toString('hex')
        this.address = address
      } else {
        this.public_key = null
        this.address_hash = null
        this.address = null
      }
    },
    add () {
      store.commit('add_account', {
        'name': this.address,
        'private_key': this.private_key,
        'public_key': this.public_key,
        'address': this.address
      })
      this.$router.push('/account/' + this.address)
    },
    paste () {
      this.analyze()
      return true
    }
  },
  components: {
    AppHeader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
