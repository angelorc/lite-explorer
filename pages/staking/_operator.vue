<template>
  <page-template>
    <h1 class="text-h4 mb-4">Validator Detail</h1>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12">
          <validator-detail
            :validator="validator"
            class="mb-4"
          ></validator-detail>
        </v-col>
      </v-row>
      <!--
        Temporary disable validator-uptime
      <v-row>
        <v-col cols="12">
          <validator-uptime :valoper="validator.operator_address"></validator-uptime>
        </v-col>
      </v-row>
      -->
      <v-row>
        <v-col cols="12" md="6">
          <validator-proposed-blocks
            :valoper="validator.operator_address"
          ></validator-proposed-blocks>
        </v-col>
        <v-col cols="12" md="6">
          <validator-missed-blocks
            :valoper="validator.operator_address"
          ></validator-missed-blocks>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <validator-delegations
            :valoper="validator.operator_address"
          ></validator-delegations>
        </v-col>
        <v-col cols="12" md="6">
          <validator-unbondings
            :valoper="validator.operator_address"
          ></validator-unbondings>
        </v-col>
      </v-row>
    </v-container>
  </page-template>
</template>

<script>
export default {
  head() {
    const title = `${this.validator.description.moniker} | Validator`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  async asyncData({ app, params }) {
    const validator = await app.$api.getValidator(params.operator)

    return {
      validator: {
        ...validator.result,
        delegator_address: validator.delegator_address,
        address: validator.address
      }
    }
  },
  computed: {
    lastBlock() {
      return this.$store.getters[`app/last_block`]
    }
  }
}
</script>
