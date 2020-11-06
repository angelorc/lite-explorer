<template>
  <page-template>
    <h1 class="text-h4 mb-4">Blocks</h1>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 hidden-sm-and-down"
          >Block #{{ blocks.data[0].height }} to #{{
            blocks.data[blocks.count - 1].height
          }}
          (Total of {{ blocks.count }} blocks)</v-toolbar-title
        >
        <div class="flex-grow-1"></div>
        <pagination
          :pagination-info="{
            pages: blocks.totalPage,
            page: blocks.pagination.next
              ? blocks.pagination.next.page - 1
              : blocks.totalPage,
          }"
        >
        </pagination>
      </v-toolbar>
      <v-divider></v-divider>

      <v-data-table
        :headers="blocks_header"
        hide-default-footer
        :items-per-page="25"
        :items="blocks.data"
      >
        <template v-slot:item.height="{ item }">
          <nuxt-link :to="`/blocks/${item.height}`">{{
            item.height
          }}</nuxt-link>
        </template>
        <template v-slot:item.hash="{ item }">{{ item.hash | hash }}</template>
        <template v-slot:item.proposer_address="{ item }">
          <proposer :address="item.proposer_address" />
        </template>
        <template v-slot:item.time="{ item }">{{
          item.time | timeDistance
        }}</template>
      </v-data-table>
      <v-divider></v-divider>
      <v-toolbar flat>
        <v-toolbar-title class="subtitle-1 hidden-sm-and-down"
          >Block #{{ blocks.data[0].height }} to #{{
            blocks.data[blocks.count - 1].height
          }}
          (Total of {{ blocks.count }} blocks)</v-toolbar-title
        >
        <div class="flex-grow-1"></div>
        <pagination
          :pagination-info="{
            pages: blocks.totalPage,
            page: blocks.pagination.next
              ? blocks.pagination.next.page - 1
              : blocks.totalPage,
          }"
        >
        </pagination>
      </v-toolbar>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import Proposer from '@/components/Proposer'

import { shortFilter, getTimeDistance } from '@/lib/utils'

export default {
  components: {
    PageTemplate,
    Proposer,
  },
  filters: {
    hash: (value) => shortFilter(value, 12),
    timeDistance: (value) => getTimeDistance(value),
  },
  watchQuery: ['page'],
  key: (to) => to.fullPath,
  async asyncData({ app, query }) {
    let page = 1
    if (query.page) page = parseInt(query.page)

    const blocks = await app.$api.getBlocks(page)

    return {
      blocks,
    }
  },
  data() {
    return {
      blocks_header: [
        { text: 'Block', value: 'height', sortable: false },
        { text: 'Timestamp', value: 'timestamp', sortable: false },
        { text: 'Proposer', value: 'proposer_address', sortable: false },
        { text: 'Hash', value: 'hash', sortable: false },
      ],
    }
  },
}
</script>
