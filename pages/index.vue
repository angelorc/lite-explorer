<template>
  <page-template>
    <dashboard-overview class="mb-8"></dashboard-overview>
    <consensus-card class="mb-4"></consensus-card>
    <v-container class="px-0">
      <v-row>
        <v-col cols="6">
          <dashboard-latest-blocks></dashboard-latest-blocks>
        </v-col>
        <v-col cols="6">
          <dashboard-latest-txs></dashboard-latest-txs>
        </v-col>
      </v-row>
    </v-container>
    <v-card flat class="mt-4">
      <v-card-title>Validators</v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left grey--text text--darken-3">Moniker</th>
              <th class="text-right grey--text text--darken-3">Tokens</th>
              <th class="text-right grey--text text--darken-3">Commission</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(validator, i) in validators" :key="i">
              <td
                class="font-weight-bold"
                style="
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                "
              >
                <ValidatorAvatar
                  :validator="validator"
                  size="26px"
                  class="mr-4"
                />
                {{ validator.description.moniker }}
              </td>
              <td class="text-right">
                <Amount :microAmount="validator.tokens" denom="BTSG" />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-avatar
                      v-on="on"
                      :color="
                        validator.status === 2
                          ? `green darken-1`
                          : `red darken-1`
                      "
                      size="8"
                      class="ml-2"
                    ></v-avatar>
                  </template>
                  <span v-if="validator.status === 2">Status: Active</span>
                  <span v-else>Status: Inactive</span>
                </v-tooltip>
              </td>
              <td
                class="text-right"
                style="
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                "
              >
                <v-tooltip
                  bottom
                  v-if="
                    validator.commission.commission_rates.rate > 0.2 &&
                    validator.commission.commission_rates.rate <= 0.5
                  "
                >
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      size="18"
                      class="mr-2"
                      color="orange darken-1"
                      >mdi-alert</v-icon
                    >
                  </template>
                  <span>Commission is more than 20%</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                  v-if="validator.commission.commission_rates.rate > 0.5"
                >
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      size="18"
                      class="mr-2"
                      color="red darken-1"
                      >mdi-alert-octagram</v-icon
                    >
                  </template>
                  <span>Commission is more than 50%</span>
                </v-tooltip>
                {{ validator.commission.commission_rates.rate * 100 }}%
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'
import ValidatorAvatar from '@/components/ValidatorAvatar'

import DashboardOverview from '@/components/DashboardOverview'
import DashboardLatestBlocks from '@/components/DashboardLatestBlocks'
import DashboardLatestTxs from '@/components/DashboardLatestTxs'
import ConsensusCard from '@/components/ConsensusCard'

export default {
  components: {
    PageTemplate,
    ValidatorAvatar,
    DashboardOverview,
    DashboardLatestBlocks,
    DashboardLatestTxs,
    ConsensusCard,
  },
  methods: {
    percentage(amt) {
      return parseFloat(amt * 100).toFixed(2)
    },
  },
  computed: {
    last_block() {
      return this.$store.getters[`app/last_block`]
    },
    total_supply() {
      return this.$store.getters[`app/total_supply`]
    },
    community_pool() {
      return this.$store.getters[`app/community_pool`]
    },
    inflation() {
      return this.$store.getters[`app/inflation`]
    },
    active_validators() {
      return this.$store.getters[`validators/total_active`]
    },
    total_power() {
      return this.$store.getters[`validators/total_power`]
    },
    validators() {
      return this.$store.getters[`validators/validators`]
    },
    signatures() {
      return this.$store.getters[`app/signatures`]
    },
  },
}
</script>
