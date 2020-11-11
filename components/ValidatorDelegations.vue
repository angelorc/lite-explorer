<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title>Delegations</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      :items="delegations"
      height="290"
    >
      <template v-slot:item.delegator_address="{ item }">
        <nuxt-link :to="`/account/${item.delegator_address}`">{{
          item.delegator_address
        }}</nuxt-link>
      </template>
      <template v-slot:item.balance="{ item }">
        <amount
          :micro-amount="item.balance.amount"
          :denom="item.balance.denom"
        ></amount>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Amount from '@/components/Amount'

export default {
  props: {
    valoper: {
      type: String,
      required: true
    }
  },
  components: {
    Amount,
  },
  data() {
    return {
      headers: [
        {
          text: 'Delegator Address',
          value: 'delegator_address',
          sortable: false,
        },
        { text: 'Amount', value: 'balance', align: 'right', sortable: false },
      ],
      loading: true,
      delegations: []
    }
  },
  async created() {
    const delegations = await this.$btsg.getValidatorDelegations(
      this.valoper
    )
    this.delegations = delegations.result
    this.loading = false
  }
}
</script>
