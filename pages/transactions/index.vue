<template>
  <page-template>
    <h1 class="text-h4 mb-4">Transactions</h1>
    <transactions-data-table
      :transactions="txs"
      view-all
    ></transactions-data-table>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import TransactionsDataTable from '@/components/TransactionsDataTable'

export default {
  components: {
    PageTemplate,
    TransactionsDataTable
  },
  watchQuery: ['page'],
  key: to => to.fullPath,
  async asyncData({ app, query }) {
    let page = 1
    let limit = 25

    if (query.page) page = parseInt(query.page)
    let offset = page * limit - limit
    let account = query.account ? query.account : null

    const txs = await app.$api.getTransactions(account, null, offset, limit)

    return {
      txs
    }
  }
}
</script>
