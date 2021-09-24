<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-bank-transfer</v-icon>
      <h3 class="title">Transactions</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-container
      class="py-0"
      style="overflow-y: auto; display: block; height: 550px; max-height: 550px"
    >
      <template v-for="(tx, index) in txs">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-row :key="`${index}-${tx.height}`">
          <v-col cols="12" class="pb-0">
            <div
              class="subtitle-1 font-weight-medium grey--text text--darken-3"
            >
              TX
              <nuxt-link class="body-2" :to="`/transactions/${tx.tx_hash}`">{{
                tx.tx_hash | hash
              }}</nuxt-link>
            </div>
          </v-col>
          <v-col cols="9" class="pb-0 pt-1 body-2 grey--text text--darken-3">
            From
            <nuxt-link :to="`/account/${tx.signers[0]}`">{{
              tx.signers[0] | hash
            }}</nuxt-link>
          </v-col>
          <v-col
            align="right"
            cols="3"
            class="body-2 grey--text text--darken-3 py-0"
          >
            {{ tx.timestamp | timeDistance }}

            <div>
              <v-tooltip bottom v-if="tx.logs">
                <template v-slot:activator="{ on }">
                  <v-icon color="green" v-on="on">mdi-check-bold</v-icon>
                </template>
                <span>Success</span>
              </v-tooltip>
              <v-tooltip bottom v-else>
                <template v-slot:activator="{ on }">
                  <v-icon color="red" v-on="on">mdi-alert-circle</v-icon>
                </template>
                <span>Fail</span>
              </v-tooltip>
            </div>
          </v-col>

          <v-col class="body-2 grey--text text--darken-3 pt-0" cols="12">
            <v-chip outlined small>{{
              tx.messages[0]['@type'] | convertMessageType
            }}</v-chip>
            <v-chip outlined small v-if="tx.messages.length - 1"
              >+{{ tx.messages.length - 1 }}</v-chip
            >
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-card-actions class="my-4">
      <v-btn to="/transactions" block color="primary lighten-1"
        >View all transactions</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  prettyUsd,
  prettyRound,
  shortFilter,
  getTimeDistance,
  sleep,
  convertMessageType
} from '@/lib/utils'

export default {
  filters: {
    hash: value => shortFilter(value, 12),
    timeDistance: value => prettyUsd(getTimeDistance(value)),
    convertMessageType: value => convertMessageType(value)
  },
  data() {
    return {
      txs: []
    }
  },
  created() {
    this.getLatestTxs()
  },
  methods: {
    async getLatestTxs() {
      const txs = await this.$api.getLatestTxs()
      this.txs = txs.docs
    }
  },
  computed: {
    lastHeight() {
      return this.$store.getters[`app/last_block`]
    }
  },
  watch: {
    async lastHeight() {
      await sleep(800)
      this.getLatestTxs()
    }
  }
}
</script>
