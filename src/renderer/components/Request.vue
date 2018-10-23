<template>
  <div class="request">
    <qriously :value="account.address" :size="400" />
    <h3>{{account.address}}</h3>
  </div>
</template>
<script>
export default {
  name: 'request',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  props: ['account'],
  filters: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.request {
  text-align: center;
}
.request canvas {
  margin: 0 auto;
}
</style>
