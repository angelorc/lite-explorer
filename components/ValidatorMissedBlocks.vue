<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title>Missed Blocks</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      :items="missed_blocks"
      height="290"
    >
      <template v-slot:item.proposer_address="{ item }">
        <proposer :address="item.proposer_address"></proposer>
      </template>
      <template v-slot:item.height="{ item }">
        <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
      </template>
      <template v-slot:item.timestamp="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ item.timestamp | timeDistance }}</span>
          </template>
          <span>{{ new Date(item.timestamp) }}</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Proposer from '@/components/Proposer'
import { prettyUsd, getTimeDistance } from '@/lib/utils'

export default {
  components: {
    Proposer
  },
  filters: {
    timeDistance: value => prettyUsd(getTimeDistance(value))
  },
  props: {
    valoper: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { text: 'Height', value: 'height' },
        { text: 'Proposer Address', value: 'proposer_address' },
        { text: 'Timestamp', align: 'right', value: 'timestamp' }
      ],
      missed_blocks: [],
      loading: true
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true

      const missed_blocks = await this.$api.getMissedBlocks(this.valoper)

      this.missed_blocks = missed_blocks.data
      this.loading = false
    }
  },
  computed: {
    lastBlock() {
      return this.$store.getters[`app/last_block`]
    }
  },
  watch: {
    lastBlock() {
      this.fetch()
    }
  }
}
</script>
