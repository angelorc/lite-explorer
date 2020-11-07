<template>
  <page-template>
    <h1 class="text-h4 mb-4">Account Details</h1>
    <account-header
      class="mb-8"
      :address="address"
      :total-balance="totalBalance"
    ></account-header>

    <h2 class="text-h5 mb-4">
      Balances
      <v-icon color="grey darken-3" style="margin-top: -2px"
        >mdi-chevron-right</v-icon
      >
    </h2>
    <account-balances class="mb-8" :balances="balances"></account-balances>

    <h2 class="text-h5 mb-4">
      Transactions
      <v-icon color="grey darken-3" style="margin-top: -2px"
        >mdi-chevron-right</v-icon
      >
    </h2>
    <transactions-data-table
      class="mb-8"
      :transactions="txs"
      default_pagination
      :items_per_page="10"
    ></transactions-data-table>

    <h2 class="text-h5 mb-4">
      Staking
      <v-icon color="grey darken-3" style="margin-top: -2px"
        >mdi-chevron-right</v-icon
      >
    </h2>

    <v-tabs v-model="tab" color="primary" background-color="transparent">
      <v-tab :key="0" v-if="delegations.length">Delegations</v-tab>
      <v-tab :key="1" v-if="unbondings.length">Unbondings</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item :key="0" v-if="delegations.length">
        <account-delegations :delegations="delegations"></account-delegations>
      </v-tab-item>
      <v-tab-item :key="1" v-if="unbondings.length">
        <account-unbondings :unbondings="unbondings"></account-unbondings>
      </v-tab-item>
    </v-tabs-items>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import AccountBlances from '@/components/AccountBalances'

import Amount from '@/components/Amount'
import TransactionsDataTable from '@/components/TransactionsDataTable'

export default {
  components: {
    PageTemplate,
    TransactionsDataTable,
    AccountBlances,
    Amount,
  },
  data() {
    return {
      tab: 0,
    }
  },
  async asyncData({ app, params }) {
    const account = await app.$btsg.getAccount(params.address)

    // if nothing is available add default coin
    if (!account.value.coins.length) {
      account.value.coins = [
        {
          denom: process.env.MICROSTAKEDENOM,
          amount: 0,
        },
      ]
    }

    let totalBalance

    let stakeCoin = account.value.coins.find(
      (c) => c.denom === process.env.MICROSTAKEDENOM
    )
    if (stakeCoin) {
      stakeCoin = stakeCoin.amount
    }

    totalBalance = Number(stakeCoin)
    if (isNaN(totalBalance)) {
      totalBalance = 0
    }

    const delegations = await app.$btsg.getDelegations(params.address)

    delegations
      .filter((d) => d.balance.denom === process.env.MICROSTAKEDENOM)
      .forEach((d) => {
        totalBalance = Number(totalBalance) + Number(d.balance.amount)
      })

    const txs = await app.$api.getTransactionsByAccount(params.address, 100)

    const unbondings = await app.$btsg.getUnbondingDelegations(params.address)

    return {
      address: params.address,
      stakeDenom: process.env.STAKEDENOM,
      account: account.value,
      balances: account.value.coins,
      totalBalance,
      delegations: delegations.sort(
        (d1, d2) => d2.balance.amount - d1.balance.amount
      ),
      txs,
      unbondings,
    }
  },
}
</script>
