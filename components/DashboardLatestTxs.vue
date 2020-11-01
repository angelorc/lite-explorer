<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-bank-transfer</v-icon>
      <h3 class="title">Transactions</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-container
      class="py-0"
      style="overflow-y: auto; display: block; max-height: 550px"
    >
      <template v-for="(tx, index) in txs">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-row :key="`${index}-${tx.height}`">
          <v-col>
            <div
              class="subtitle-1 font-weight-medium grey--text text--darken-3"
            >
              TX#
              <nuxt-link class="body-2" :to="`/transactions/${tx.tx_hash}`">{{
                tx.tx_hash | hash
              }}</nuxt-link>
            </div>
            <div class="body-2 grey--text text--darken-3">
              From
              {{ tx.signatures[0].address | hash }}
            </div>
            <div class="pt-2">
              <v-chip outlined small>{{ tx.messages[0].type }}</v-chip>
              <v-chip outlined small v-if="tx.messages.length - 1"
                >+{{ tx.messages.length - 1 }}</v-chip
              >
            </div>
          </v-col>
          <v-col
            align="right"
            class="body-2 grey--text text--darken-3 align-self-center"
          >
            {{ tx.timestamp | timeDistance }}</v-col
          >
        </v-row>
      </template>
    </v-container>
  </v-card>
</template>

<script>
import {
  prettyUsd,
  prettyRound,
  shortFilter,
  getTimeDistance,
} from '@/lib/utils'

export default {
  filters: {
    hash: (value) => shortFilter(value, 12),
    timeDistance: (value) => prettyUsd(getTimeDistance(value)),
    convertMessageType: (value) => {
      return value
        .replace('cosmos-sdk/Msg', '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    },
  },
  data() {
    return {
      txs: [],
    }
  },
  async created() {
    const txs = await this.$btsg.getLatestTxs()
    this.txs = txs.data
  },
}
</script>
