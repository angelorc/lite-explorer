<template>
  <v-card class="elevation-1">
    <v-toolbar flat>
      <v-toolbar-title class="subtitle-1">
        {{ transactions.totalCount }} transactions found
      </v-toolbar-title>
      <div class="flex-grow-1"></div>

      <pagination
        v-if="!default_pagination"
        :pagination-info="{
          pages: transactions.totalPage,
          page: transactions.pagination.next
            ? transactions.pagination.next.page - 1
            : transactions.totalPage,
        }"
      >
      </pagination>
      <v-btn
        v-if="default_pagination && totalTxs > 25 && address && !height"
        outlined
        nuxt
        :to="`/transactions?address=${address}`"
        >View All</v-btn
      >
      <v-btn
        v-if="default_pagination && totalTxs > 25 && height && !address"
        outlined
        nuxt
        :to="`/transactions?height=${height}`"
        >View All</v-btn
      >
    </v-toolbar>
    <v-divider></v-divider>
    <app-table
     field="transactions"
     :items="transactions.data"
    ></app-table>
    <v-divider v-if="!default_pagination"></v-divider>
    <v-toolbar flat v-if="!default_pagination">
      <div class="flex-grow-1"></div>
      <pagination
        v-if="!default_pagination"
        :pagination-info="{
          pages: transactions.totalPage,
          page: transactions.pagination.next
            ? transactions.pagination.next.page - 1
            : transactions.totalPage,
        }"
      >
      </pagination>
    </v-toolbar>
  </v-card>
</template>

<script>
import { shortFilter, getTimeDistance } from '~/lib/utils'
import Pagination from '@/components/Pagination'
import Amount from '@/components/Amount'
import Proposer from '@/components/Proposer'
import AppTable from '@/components/app/Table'

export default {
  props: {
    transactions: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    default_pagination: {
      type: Boolean,
      default: false,
    },
    items_per_page: {
      type: Number,
      default: 25,
    },
    address: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Pagination,
    Amount,
    Proposer,
    AppTable
  },
  filters: {
    hash: (value) => shortFilter(value, 5),
    timeDistance: (value) => getTimeDistance(value),
    convertMessageType: (value) => {
      return value
        .replace('cosmos-sdk/Msg', '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    },
  },
  data() {
    return {
      limitRecords: 25,
      transactions_header: [
        { text: 'Tx Hash', value: 'tx_hash', sortable: false },
        { text: 'Height', value: 'height', sortable: false },
        { text: 'Age', value: 'timestamp', sortable: false },
        { text: 'From', value: 'address', sortable: false },
        { text: 'Type', value: 'messages', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Amount', value: 'amount', align: 'right', sortable: false },
      ],
    }
  },
  computed: {
    totalTxs() {
      if (!this.transactions) return 0
      if (!this.transactions.data) return 0
      if (this.transactions.data.length === 0) return 0
      return this.transactions.count
    },
  },
}
</script>
