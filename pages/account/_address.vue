<template>
  <page-template>
    <h1 class="text-h4 mb-4">Account Details</h1>
    <account-header
      class="mb-4"
      :address="address"
      :total-balance="sumBalances"
    ></account-header>

    <v-tabs v-model="tabBalance" color="primary" background-color="transparent">
      <v-tab :key="0">Available</v-tab>
      <v-tab :key="1">Staking</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabBalance">
      <v-tab-item :key="0">
        <account-balances-available
          class="mb-8"
          :balances="balances"
        ></account-balances-available>
      </v-tab-item>
      <v-tab-item :key="1">
        <account-balances-staking
          :key="1"
          class="mb-8"
          :balances="stakingBalance"
        ></account-balances-staking>
      </v-tab-item>
    </v-tabs-items>

    <h2 class="text-h5 mb-4">
      Transactions
      <v-icon color="grey darken-3" style="margin-top: -2px"
        >mdi-chevron-right</v-icon
      >
    </h2>
    <transactions-data-table
      class="mb-8"
      :transactions="txs"
      :address="address"
    ></transactions-data-table>

    <h2 class="text-h5 mb-4">
      Staking
      <v-icon color="grey darken-3" style="margin-top: -2px"
        >mdi-chevron-right</v-icon
      >
    </h2>

    <v-tabs v-model="tabStaking" color="primary" background-color="transparent">
      <v-tab :key="0" v-if="delegations.length">Delegations</v-tab>
      <v-tab :key="1" v-if="unbondings.length">Unbondings</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabStaking">
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

import Amount from '@/components/Amount'
import TransactionsDataTable from '@/components/TransactionsDataTable'

export default {
  head() {
    const title = `Account ${this.address}`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  components: {
    PageTemplate,
    TransactionsDataTable,
    Amount
  },
  data() {
    return {
      tabStaking: 0,
      tabBalance: 0
    }
  },
  async asyncData({ app, params }) {
    const account = await app.$btsg.getAccount(params.address)

    // if nothing is available add default coin
    if (!account.value.coins.length) {
      account.value.coins = [
        {
          denom: process.env.MICROSTAKEDENOM,
          amount: 0
        }
      ]
    }

    const delegations = await app.$btsg.getDelegations(params.address)
    const txs = await app.$api.getTransactions(params.address, null, 0, 10)
    const unbondings = await app.$btsg.getUnbondingDelegations(params.address)
    const rewards = await app.$btsg.getDelegatorRewards(params.address)
    const commission = await app.$api.getValidatorDelegatorReward(
      params.address
    )

    return {
      address: params.address,
      stakeDenom: process.env.STAKEDENOM,
      account: account.value,
      balances: account.value.coins,
      delegations: delegations.sort(
        (d1, d2) => d2.balance.amount - d1.balance.amount
      ),
      txs,
      unbondings,
      rewards: rewards.total,
      commission:
        commission !== undefined && commission.result.val_commission !== null
          ? commission.result.val_commission[0].amount
          : 0
    }
  },
  computed: {
    stakingBalance() {
      let balances = {
        delegated: 0,
        unbonding: 0,
        reward: 0,
        commission: 0
      }

      this.delegations.map(d => {
        balances.delegated += Number(d.balance.amount)
      })

      this.unbondings.map(d => {
        balances.unbonding += Number(
          d.balance && d.balance.amount ? d.balance.amount : 0
        )
      })

      const reward =
        this.rewards !== null
          ? this.rewards.find(
              r => r.denom === this.$store.getters[`app/stakeDenom`]
            )
          : undefined

      if (reward !== undefined) {
        balances.reward += Number(reward.amount)
      }

      balances.commission = Number(this.commission)

      return balances
    },
    sumBalances() {
      const available = this.balances.find(
        r => r.denom === this.$store.getters[`app/stakeDenom`]
      )

      return Number(
        this.stakingBalance.delegated +
          this.stakingBalance.unbonding +
          this.stakingBalance.reward +
          this.stakingBalance.commission +
          Number(available !== undefined ? available.amount : 0)
      )
    },
    valueAccount() {}
  }
}
</script>
