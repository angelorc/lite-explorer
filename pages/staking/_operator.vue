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
      <v-row>
        <v-col cols="6">
          <validator-proposed-blocks
            :blocks="proposed_blocks"
          ></validator-proposed-blocks>
        </v-col>
        <v-col cols="6">
          <validator-missed-blocks
            :blocks="missed_blocks"
          ></validator-missed-blocks>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <validator-delegations
            :delegations="delegations"
          ></validator-delegations>
        </v-col>
        <v-col cols="6">
          <validator-unbondings :unbondings="unbondings"></validator-unbondings>
        </v-col>
      </v-row>
    </v-container>
  </page-template>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const validator = await app.$api.getValidator(params.operator)
    const delegations = await app.$btsg.getValidatorDelegations(params.operator)
    const unbondings = await app.$btsg.getValidatorUnbondings(params.operator)
    const proposed_blocks = await app.$api.getProposedBlocks(params.operator)
    const missed_blocks = await app.$api.getMissedBlocks(params.operator)

    return {
      validator: {
        ...validator.result,
        delegator_address: validator.delegator_address,
        address: validator.address,
      },
      delegations,
      unbondings,
      missed_blocks: missed_blocks.data,
      proposed_blocks: proposed_blocks.data,
    }
  },
}
</script>
