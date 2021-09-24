<template>
  <page-template>
    <h1 class="text-h4 mb-4">
      Transaction
    </h1>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Block Height</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <nuxt-link :to="`/blocks/${tx.height}`">{{ tx.height }}</nuxt-link>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Tx Hash</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            {{ tx.tx_hash }}
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Status</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <div v-if="tx.logs">
              <v-icon left color="green">mdi-check-bold</v-icon> Succes
            </div>
            <div v-else>
              <v-icon color="red" left>mdi-alert-circle</v-icon>
              <span class="red--text">{{ tx.error_log }}</span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Timestamp</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <v-icon left size="18" color="grey darken-3">
              mdi-clock-outline
            </v-icon>
            {{ tx.timestamp | timeDistance }}
            <span class="caption ml-3">{{
              new Date(tx.timestamp).toUTCString()
            }}</span>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Fee</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <amount
              v-for="(fee, i) in tx.fee.amount"
              v-bind:key="i"
              :microAmount="fee.amount"
              :denom="fee.denom"
          /></v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Gas (Used/Wanted)</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
            >{{ tx.gas_used }} / {{ tx.gas_wanted }}</v-col
          >
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Signers</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <template v-for="(sig, i) in tx.signers">
              <nuxt-link :key="i" :to="`/account/${sig}`">{{ sig }}</nuxt-link
              ><br />
            </template>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Signatures</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <template v-for="signature in tx.signatures">
              {{ signature }}<br />
            </template>
          </v-col>
          <v-col
            v-if="tx.memo"
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Memo</v-col
          >
          <v-col
            v-if="tx.memo"
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            {{ tx.memo }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <h2 class="text-h6 mb-4">
      Messages
    </h2>
    <transaction-messages
      class="mb-8"
      :msgs="tx.messages"
    ></transaction-messages>

    <h2 class="text-h6 mb-4">
      Raw Data
    </h2>
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
  head() {
    const title = `${this.hash} | Transaction`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  components: {
    PageTemplate,
    Markup
  },
  filters: {
    timeDistance: value => prettyUsd(getTimeDistance(value))
  },
  async asyncData({ app, params }) {
    const tx = await app.$api.getTransaction(params.hash)

    return {
      tx: tx.data,
      hash: params.hash
    }
  }
}
</script>
