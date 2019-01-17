<template>
  <div>
    <AppHeader />
    <b-container>
      <div class="row justify-content-center">
        <div class="col-12 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Create a new account
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center">
            This is a new private key, just generated for you.
          </p>
          <p class="text-muted text-center">
            Please write it down, this is <strong>important</strong>.
          </p>
          <p class="text-muted text-center mb-5">
            Without it, no way to access your funds.
          </p>

          <!-- Form -->
          <form>

            <!-- Email address -->
            <div class="form-group">

              <!-- Label -->
              <label>Private Key</label>
              <code class="d-block text-truncate">{{private_key}}</code>

              <label>Public Key</label>
              <code class="d-block text-truncate">{{public_key}}</code>

              <label>Address</label>
              <code class="d-block text-truncate">{{address}}</code>

            </div>

            <!-- Submit -->
            <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="generate">
              Re-generate
            </button>
            <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="add">
              Add it
            </button>

            <!-- Link -->
            <div class="text-center">
              <small class="text-muted text-center">
                Already have an account ? <router-link to="/login">Add it</router-link>.
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
  hash_from_address,
  public_key_to_hash
} from 'nulsworldjs/src/model/data'
import store from '../store'
import { mapState } from 'vuex'
import AppHeader from './AppHeader.vue'

const secp256k1 = require('secp256k1')
export default {
  name: 'new',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      'private_key': '',
      'public_key': null,
      'address': null
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'accounts',
    'settings'
  ]),
  methods: {
    generate () {
      let randArr = new Uint8Array(32) // create a typed array of 32 bytes (256 bits)
      let privKey
      do {
        /// privKey = randomBytes(32)
        console.log('generating')
        window.crypto.getRandomValues(randArr)
        privKey = Buffer.from(randArr)
      } while (!secp256k1.privateKeyVerify(privKey))
      window.crypto.getRandomValues(randArr) // populate array with cryptographically secure random numbers
      this.private_key = privKey.toString('hex')
      this.analyze()
    },
    analyze () {
      let pub = private_key_to_public_key(Buffer.from(this.private_key, 'hex'))
      let hash = public_key_to_hash(pub, {
        chain_id: this.settings.chain_id
      })
      let address = address_from_hash(hash)
      // Vue.set(this, 'public_key', pub);
      this.public_key = pub.toString('hex')
      this.address_hash = hash.toString('hex')
      this.address = address
    },
    init () {
      this.generate()
    },
    add () {
      store.commit('add_account', {
        'name': this.address,
        'private_key': this.private_key,
        'public_key': this.public_key,
        'address': this.address
      })
      this.$router.push('/account/' + this.address)
    }
  },
  mounted () {
    this.generate()
  },
  components: {
    AppHeader
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
