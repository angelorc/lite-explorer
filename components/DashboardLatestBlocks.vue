<template>
  <v-card tile elevation="1">
    <v-card-title>
      <v-icon large left>mdi-cube-send</v-icon>
      <h3 class="title">Blocks</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-container
      class="py-0"
      style="overflow-y: auto; display: block; height:550px; max-height: 550px"
    >
      <template v-for="(block, index) in blocks">
        <v-divider v-if="index !== 0" :key="`${index}-divider`"></v-divider>
        <v-row :key="`${index}-${block.height}`">
          <v-col>
            <div
              class="subtitle-1 font-weight-medium grey--text text--darken-3"
            >
              Block
              <nuxt-link class="red-link" :to="`/blocks/${block.height}`">{{
                block.height
              }}</nuxt-link>
            </div>
            <div class="body-2 grey--text text--darken-3">
              {{ block.total_txs }} txs
              <span
                >-
                <amount
                  :micro-amount="block.total_fees"
                  :denom="$store.getters[`app/stakeDenom`]"
                ></amount>
                <span class="caption">Fees</span>
              </span>
            </div>
            <div class="mt-2 body-2 grey--text text--darken-3">
              Proposer
              <proposer
                style="
                width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
                :address="block.proposer_address"
              ></proposer>
            </div>
          </v-col>
          <v-col align="right" class="body-2 grey--text text--darken-3">
            <div>{{ block.timestamp | timeDistance }}</div>
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-card-actions class="my-4">
      <v-btn to="/blocks" block color="primary lighten-1"
        >View all blocks</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { sleep, prettyUsd, getTimeDistance } from '@/lib/utils'

export default {
  filters: {
    timeDistance: value => prettyUsd(getTimeDistance(value))
  },
  data() {
    return {
      blocks: []
    }
  },
  created() {
    this.getLatestBlocks()
  },
  methods: {
    async getLatestBlocks() {
      const blocks = await this.$api.getLatestBlocks()
      this.blocks = blocks.docs
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
      this.getLatestBlocks()
    }
  }
}
</script>
