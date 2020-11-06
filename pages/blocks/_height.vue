<template>
  <page-template>
    <h1 class="text-h4 mb-4">
      Block <span class="text-h6">#{{ block.block.header.height }}</span>
    </h1>
    <v-card class="mb-8">
      <v-container>
        <v-row>
          <v-col cols="2" class="grey--text text--darken-2">Block Height</v-col>
          <v-col cols="10">
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
          <v-col cols="2" class="grey--text text--darken-2">Timestamp</v-col>
          <v-col cols="10">
            <v-icon left size="18" color="grey darken-3">
              mdi-clock-outline
            </v-icon>
            {{ block.block.header.time | timeDistance }} ago
            <span class="caption ml-3">{{
              new Date(block.block.header.time).toUTCString()
            }}</span>
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2">Validated by</v-col>
          <v-col cols="10">
            <proposer :address="block.block.header.proposer_address"></proposer>
          </v-col>
          <v-col cols="2" class="grey--text text--darken-2">Block Hash</v-col>
          <v-col cols="10">
            {{ block.block_id.hash }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <transactions-data-table
      v-if="txs.count"
      class="mb-8"
      :transactions="txs"
      default_pagination
      :items_per_page="5"
      :height="Number(height)"
    ></transactions-data-table>

    <v-expansion-panels v-if="block.missed_validators.length" class="mb-8">
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">
          Missed Validators ({{ block.missed_validators.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item v-for="(val, i) in block.missed_validators" :key="i">
              <v-list-item-avatar>
                <validator-avatar
                  :validator="{ address: val, description: null }"
                  size="26px"
                ></validator-avatar>
              </v-list-item-avatar>
              <v-list-item-title>
                <proposer :address="val"></proposer
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels v-if="block.missed_validators.length">
      <v-expansion-panel>
        <v-expansion-panel-header class="text-h6">
          Signatures ({{ block.signatures.length }})
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list-item v-for="(val, i) in block.signatures" :key="i">
            <v-list-item-avatar>
              <validator-avatar
                :validator="{ address: val, description: null }"
                size="26px"
              ></validator-avatar>
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
  components: {
    PageTemplate,
    ValidatorAvatar,
  },
  filters: {
    timeDistance: (value) => prettyUsd(getTimeDistance(value)),
  },
  async asyncData({ app, params }) {
    const block = await app.$api.getBlock(params.height)

    return {
      block,
      height: params.height,
    }
  },
  data() {
    return {
      txs: {
        success: false,
        count: 0,
      },
    }
  },
  async created() {
    const txs = await this.$api.getTransactionsByHeight(this.height)
    this.txs = txs
  },
}
</script>
