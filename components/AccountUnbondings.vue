<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items-per-page="5"
      :items="unbondings"
      height="290"
    >
      <template v-slot:item.validator_address="{ item }">
        <nuxt-link :to="`/staking/${item.validator_address}`">{{
          item.validator_address
        }}</nuxt-link>
      </template>
      <template v-slot:item.initial_balance="{ item }">
        {{ initial_balance }}
      </template>
      <template v-slot:item.balance="{ item }">
        {{ balance }}
      </template>
      <template v-slot:item.height="{ item }">{{ item.height }}</template>
    </v-data-table>
  </v-card>
</template>

<script>
import Amount from '@/components/Amount'

export default {
  props: {
    unbondings: {
      type: Array,
      required: true,
    },
  },
  components: {
    Amount,
  },
  data() {
    return {
      headers: [
        { text: 'Validator Address', value: 'validator_address' },
        { text: 'Height', value: 'creation_height', align: 'center' },
        { text: 'Initial Balance', align: 'right', value: 'initial_balance' },
        { text: 'Balance', align: 'right', value: 'balance' },
      ],
    }
  },
}
</script>
