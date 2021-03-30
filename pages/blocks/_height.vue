<template>
  <page-template>
    <h1 class="text-h4 mb-4">
      <nuxt-link to="/blocks">Blocks</nuxt-link>
      <v-icon>mdi-chevron-right</v-icon>
      <span class="text-h6">#{{ block.block.header.height }}</span>
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
            <v-btn
              icon
              small
              style="margin-top: -3px"
              class="mr-2"
              v-if="block.block.header.height > 2"
              :to="`/blocks/${Number(block.block.header.height) - 1}`"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            {{ block.block.header.height }}
            <v-btn
              icon
              small
              style="margin-top: -3px"
              class="ml-2"
              :to="`/blocks/${Number(block.block.header.height) + 1}`"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
            {{ block.block.header.time | timeDistance }}
            <span class="caption ml-3">{{
              new Date(block.block.header.time).toUTCString()
            }}</span>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Validated by</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <proposer :address="block.block.header.proposer_address"></proposer>
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Block Hash</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            {{ block.block_id.hash }}
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Total Txs</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            {{ block.total_txs }}
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Total Gas</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            {{ block.total_gas }}
          </v-col>
          <v-col
            cols="12"
            md="2"
            :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
            class="grey--text text--darken-2"
            >Total Fees</v-col
          >
          <v-col
            cols="12"
            md="10"
            :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
          >
            <amount
              :micro-amount="block.total_fees"
              :denom="$store.getters[`app/stakeDenom`]"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <transactions-data-table
      v-if="txs !== null"
      class="mb-8"
      :transactions="txs"
    ></transactions-data-table>

    <v-expansion-panels class="mb-8">
      <v-expansion-panel v-if="block.missed_validators.length > 0">
        <v-expansion-panel-header class="text-h6">
          Missed Validators ({{ block.missed_validators.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item v-for="(val, i) in block.missed_validators" :key="i">
              <v-list-item-avatar>
                <validator-avatar :valoper="val" size="26px"></validator-avatar>
              </v-list-item-avatar>
              <v-list-item-title>
                <proposer :address="val"></proposer>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">
          Signatures ({{ block.signatures.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item v-for="(val, i) in block.signatures" :key="i">
            <v-list-item-avatar>
              <validator-avatar :valoper="val" size="26px"></validator-avatar>
            </v-list-item-avatar>
            <v-list-item-title
              ><proposer :address="val"></proposer
            ></v-list-item-title>
          </v-list-item>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import ValidatorAvatar from '@/components/ValidatorAvatar'

import { prettyUsd, getTimeDistance } from '@/lib/utils'

export default {
  head() {
    const title = `Block ${this.height}`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  components: {
    PageTemplate,
    ValidatorAvatar
  },
  filters: {
    timeDistance: value => prettyUsd(getTimeDistance(value))
  },
  async asyncData({ app, params }) {
    const block = await app.$api.getBlock(params.height)

    return {
      block,
      height: params.height
    }
  },
  data() {
    return {
      txs: null
    }
  },
  async created() {
    const txs = await this.$api.getTransactions(null, this.height, 0, 10)
    this.txs = txs
  }
}
</script>
