<template>
  <page-template>
    <h1 class="text-h4 mb-4">Transactions</h1>
    <app-table
     field="transactions"
     :items="txs.data"
     class="mb-8"
    >
    </app-table>
    <transactions-data-table :transactions="txs"></transactions-data-table>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import TransactionsDataTable from '@/components/TransactionsDataTable'
import AppTable from '@/components/app/Table'

export default {
  components: {
    PageTemplate,
    TransactionsDataTable,
    AppTable
  },
  watchQuery: ['page'],
  key: (to) => to.fullPath,
  async asyncData({ app, query }) {
    let page = 1
    if (query.page) page = parseInt(query.page)

    const txs = await app.$api.getTransactions(page)

    return {
      txs,
    }
  }
}
</script>
