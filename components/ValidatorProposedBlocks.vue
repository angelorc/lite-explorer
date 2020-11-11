<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title>Proposed Blocks</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      :items="blocks"
      height="290"
    >
      <template v-slot:item.height="{ item }">
        <nuxt-link :to="`/blocks/${item.height}`">{{ item.height }}</nuxt-link>
      </template>
      <template v-slot:item.timestamp="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <span v-on="on">{{ item.timestamp | timeDistance }} ago</span>
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
    Proposer,
  },
  filters: {
    timeDistance: (value) => prettyUsd(getTimeDistance(value)),
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
        { text: 'Timestamp', align: 'right', value: 'timestamp' },
      ],
      loading: true,
      blocks: []
    }
  },
  async created() {
    const proposed_blocks = await this.$api.getProposedBlocks(
      this.valoper
    )
    this.blocks = proposed_blocks.data
    this.loading = false
  }
}
</script>
