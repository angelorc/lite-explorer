<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title>Unbondings</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      :items="unbondings"
      height="290"
    >
      <template v-slot:item.delegator_address="{ item }">
        <nuxt-link :to="`/account/${item.delegator_address}`">{{
          item.delegator_address
        }}</nuxt-link>
      </template>
      <template v-slot:item.amount="{ item }">
        <amount
          :micro-amount="item.balance.amount"
          :denom="item.balance.denom"
        />
      </template>
      <template v-slot:item.completion_time="{ item }">{{
        item.completion_time
      }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
import Amount from '@/components/Amount'

export default {
  props: {
    valoper: {
      type: String,
      required: true,
    }
  },
  components: {
    Amount,
  },
  data() {
    return {
      headers: [
        { text: 'Delegator Address', value: 'delegator_address' },
        { text: 'Height', value: 'height', align: 'center' },
        { text: 'Amount', align: 'right', value: 'amount' },
        { text: 'Completition Time', align: 'right', value: 'completion_time' },
      ],
      unbondings: [],
      loading: true
    }
  },
  async created() {
    const unbondings = await this.$btsg.getValidatorUnbondings(
      this.valoper
    )
    this.unbondings = unbondings
    this.loading = false
  }
}
</script>
