<template>
  <div class="bg-blue-001">
    <AppHeader>
    </AppHeader>
    <b-container>

      <div class="row justify-content-center">
        <div class="col-10 my-5 bg-blue-004 p-5">

          <!-- Heading -->
          <h1 class="display-4 mb-3">
            {{$t('create.heading')}}
          </h1>

          <b-form-select v-model="mode" class="my-4" size="lg">
            <option v-for="mode of modes" :value="mode">
              {{$t('create.' + mode)}}
            </option>
          </b-form-select>

          <div v-if="mode == 'create'">
            <div class="text-center">
              <vue-markdown :html="false">{{$t('create.new_text')}}</vue-markdown>
            </div>
            <!-- Form -->
            <form>

              <!-- Email address -->
              <div class="form-group my-5">

                <!-- Label -->
                <label>Private Key</label>
                <code class="d-block text-truncate my-2">{{private_key}}</code>

                <label>Public Key</label>
                <code class="d-block text-truncate my-2">{{public_key}}</code>

                <label>Address</label>
                <code class="d-block text-truncate my-2">{{address}}</code>

              </div>

              <!-- Submit -->
              <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="generate">
                {{$t('actions.regenerate')}}
              </button>
              <button class="btn btn-lg btn-block btn-primary mb-3" v-on:click="add">
                {{$t('actions.add_it')}}
              </button>

            </form>
          </div>

          <div v-if="mode == 'import_privkey'">
            <div class="text-center">
              <vue-markdown :html="false">{{$t('create.import_text')}}</vue-markdown>
            </div>
            <!-- Form -->
            <form>

              <!-- Form -->
              <form>

                <!-- Email address -->
                <div class="form-group my-5">

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
                <button class="btn btn-lg btn-block btn-primary mb-3" :disabled="!prvState" v-on:click="add">
                  {{$t('actions.add_it')}}
                </button>

              </form>

            </form>
          </div>

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
import {
  PlusIcon
} from 'vue-feather-icons'
import VueMarkdown from 'vue-markdown'

const secp256k1 = require('secp256k1')


var hexRegEx = /([0-9]|[a-f])/gim

function isHex (input) {
  return typeof input === 'string' &&
    (input.match(hexRegEx) || []).length === input.length
}

export default {
  name: 'add',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      'mode': 'import_privkey',
      'private_key': '',
      'public_key': null,
      'address': null,
      'modes': [
        'create',
        'import_privkey',
        'import_encrypted_privkey',
        'import_keystore',
        'add_view_only'
      ]
    }
  },
  components: {
    PlusIcon,
    AppHeader,
    VueMarkdown
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
  watch: {
    mode() {
      this.init()
    }
  },
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
    init () {
      this.private_key = ''
      this.public_key = null
      this.address = null

      if (this.mode == 'create')
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
    this.init()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
