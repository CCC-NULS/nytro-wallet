<template>
  <div>
    <b-card no-body class="bs-24-40 node">
      <div class="card-header d-flex flex-row">
        <h4 class="mr-auto">
          {{agent.agentId}}
        </h4>
        <h4 v-if="stake !== undefined">
          <i class="nuls"></i> {{stake.value/100000000}}
          <b-link v-if="stake['type'] == 'stake'" href="#" @click="removeStake(stake)" v-b-popover.hover="'Un-Stake'"><XIcon /></b-link>
        </h4>
      </div>
      <div class="bg-blue-001 mx-0 d-flex flex-row py-3 px-4">
        <div class="pr-4">
          <vc-donut
            background="#00235B"
            foreground="#00235B"
            :sections="chart_sections"
            :total="100"
            :size="50"
            :thickness="15"
            :hasLegend="false"
          >
            <h6 class="head-300 pb-0 mb-0">{{agent.creditVal}}</h6>
          </vc-donut>
        </div>
        <div class="align-self-center text-truncate">
          <p class="mb-1 body-200 text-truncate"><small>{{ agent.agentName || agent.agentAddress }}</small></p>
          <h5 class="mb-0 head-300">
            <span :style="`color: ${color};`">●</span>
            {{agent.status ? $t("status.active") : $t("status.waiting")}}
          </h5>
        </div>
      </div>
      <b-row class="m-0 mt-4">
        <b-col cols="6">
          <h6 class="mb-0">Commission</h6>
          <p class="body-100">
            <small>
              {{agent.commissionRate}}&nbsp;%
            </small>
          </p>
        </b-col>
        <b-col cols="6">
          <h6 class="mb-0">Node Deposit</h6>
          <p class="body-100">
            <small>
              <i class="nuls"></i> {{agent.deposit / 100000000}}
            </small>
          </p>
        </b-col>
        <b-col cols="6">
          <h6 class="mb-0">Participants</h6>
          <p class="body-100">
            <small>
              {{agent.memberCount}}
            </small>
          </p>
        </b-col>
        <b-col cols="6">
          <h6 class="mb-0">Node total staked</h6>
          <p class="body-100">
            <small>
              <i class="nuls"></i> {{agent.totalDeposit / 100000000}}
            </small>
          </p>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store'
import {
  XIcon} from 'vue-feather-icons'

export default {
  name: 'agent-view',
  data () {
    return {
    }
  },
  computed: {
    color() {
      let color = "#F5A623";
      if (this.agent.creditVal > 0.9)
        color = "#74D301";
      if (this.agent.creditVal < 0)
        color = "#D0021B";

      return color;
    },
    chart_sections() {
      return [{
        color: this.color,
        value: (this.agent.creditVal * 50) + 50
      }]
    }
  },
  watch: {
  },
  methods: {
  },
  props: ['agent', 'stake'],
  components: {
    XIcon
  },
  async created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
