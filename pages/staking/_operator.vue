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
        <v-col cols="12">
          <validator-uptime :missed-blocks="missed_blocks"></validator-uptime>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <validator-proposed-blocks
            :loading="loadings.proposed_blocks"
            :blocks="proposed_blocks"
          ></validator-proposed-blocks>
        </v-col>
        <v-col cols="6">
          <validator-missed-blocks
          :loading="loadings.missed_blocks"
            :blocks="missed_blocks"
          ></validator-missed-blocks>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <validator-delegations
            :loading="loadings.delegations"
            :delegations="delegations"
          ></validator-delegations>
        </v-col>
        <v-col cols="6">
          <validator-unbondings :loading="loadings.unbondings" :unbondings="unbondings"></validator-unbondings>
        </v-col>
      </v-row>
    </v-container>
  </page-template>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const validator = await app.$api.getValidator(params.operator)

    return {
      validator: {
        ...validator.result,
        delegator_address: validator.delegator_address,
        address: validator.address,
      }
    }
  },
  data() {
    return {
      delegations: [],
      missed_blocks: [],
      proposed_blocks: [],
      unbondings: [],
      loadings: {
        delegations: false,
        proposed_blocks: false,
        missed_blocks: false,
        unbondings: false
      }
    }
  },
  async mounted() {
    await this.getProposedBlocks()
    await this.getMissedBlocks()
    await this.getDelegations()
    await this.getUnbondings()
  },
  methods: {
    async getDelegations() {
      this.loadings.delegations = !this.loadings.delegations

      const delegations = await this.$btsg.getValidatorDelegations(this.validator.operator_address)
      this.delegations = delegations.result

      this.loadings.delegations = !this.loadings.delegations
    },
    async getProposedBlocks() {
      this.loadings.proposed_blocks = !this.loadings.proposed_blocks

      const proposed_blocks = await this.$api.getProposedBlocks(this.validator.operator_address)
      this.proposed_blocks = proposed_blocks.data

      this.loadings.proposed_blocks = !this.loadings.proposed_blocks
    },
    async getMissedBlocks() {
      this.loadings.missed_blocks = !this.loadings.missed_blocks

      const missed_blocks = await this.$api.getMissedBlocks(this.validator.operator_address)
      this.missed_blocks = missed_blocks.data

      this.loadings.missed_blocks = !this.loadings.missed_blocks
    },
    async getUnbondings() {
      this.loadings.unbondings = !this.loadings.unbondings

      const unbondings = await this.$btsg.getValidatorUnbondings(this.validator.operator_address)
      this.unbondings = unbondings

      this.loadings.unbondings = !this.loadings.unbondings
    }
  },
  computed: {
    lastBlock() {
      return this.$store.getters[`app/last_block`]
    }
  },
  watch: {
    lastBlock() {
      this.getMissedBlocks()
    }
  }
}
</script>
