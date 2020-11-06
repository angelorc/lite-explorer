<template>
  <page-template>
    <h1 class="text-h4 mb-4">
      Transaction<br /><span class="subtitle-1">{{ hash }}</span>
    </h1>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col cols="2" class="grey--text text--darken-2">Block Height</v-col>
          <v-col cols="10">
            <nuxt-link :to="`/blocks/${tx.height}`">{{ tx.height }}</nuxt-link>
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2">Tx Hash</v-col>
          <v-col cols="10">
            {{ tx.tx_hash }}
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2">Timestamp</v-col>
          <v-col cols="10">
            <v-icon left size="18" color="grey darken-3">
              mdi-clock-outline
            </v-icon>
            {{ tx.timestamp | timeDistance }} ago
            <span class="caption ml-3">{{
              new Date(tx.timestamp).toUTCString()
            }}</span>
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2"
            >Gas (Used/Wanted)</v-col
          >
          <v-col cols="10">{{ tx.gas_used }} / {{ tx.gas_wanted }}</v-col>
          <v-col cols="2" class="grey--text text--darken-2">Signature</v-col>
          <v-col cols="10">
            <template v-for="(sig, i) in tx.signatures">
              <nuxt-link :key="i" :to="`/account/${sig.address}`">{{
                sig.address
              }}</nuxt-link
              ><br />
            </template>
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2">Memo</v-col>
          <v-col cols="10">
            {{ tx.memo }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">
          Messages
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <markup :content="JSON.stringify(tx.messages)"></markup>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">
          Logs
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <markup :content="JSON.stringify(tx.logs)"></markup>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import Markup from '@/components/Markup'
import { prettyUsd, getTimeDistance } from '@/lib/utils'

export default {
  components: {
    PageTemplate,
    Markup,
  },
  filters: {
    timeDistance: (value) => prettyUsd(getTimeDistance(value)),
  },
  async asyncData({ app, params }) {
    const tx = await app.$api.getTransaction(params.hash)

    return {
      tx: tx.data,
      hash: params.hash,
    }
  },
}
</script>
