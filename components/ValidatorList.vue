<template>
  <v-card>
    <v-simple-table class="vals-table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left grey--text text--darken-3 rank">
              Rank
            </th>
            <th class="text-left grey--text text--darken-3 moniker">
              Moniker
            </th>
            <th class="text-right grey--text text--darken-3 tokens">
              Tokens
            </th>
            <th class="text-right grey--text text--darken-3 commission">
              Commission
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(validator, i) in validators" :key="i">
            <td class="text-center">
              <span
                v-if="validator.rank <= 10"
                class="red--text text--accent-3 font-weight-bold"
                >{{ validator.rank }}</span
              >
              <span v-else class="caption grey--text text--darken-3">{{
                validator.rank
              }}</span>
            </td>
            <td class="font-weight-bold">
              <div class="d-flex align-center justify-start">
                <validator-avatar
                  :identity="validator.description.identity"
                  :valoper="validator.operator_address"
                  size="26px"
                  class="mr-4"
                />
                <nuxt-link :to="`/staking/${validator.operator_address}`">
                  {{ validator.description.moniker }}
                </nuxt-link>
              </div>
            </td>
            <td class="text-right">
              <div class="tokens">
                <amount
                  :no-decimals="true"
                  :microAmount="validator.tokens"
                  :denom="stakeDenom"
                />
                <span class="caption"
                  >({{ validator.voting_power_percent }} %)</span
                >
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
              </div>
            </td>
            <td class="text-right">
              <div
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
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import ValidatorAvatar from '@/components/ValidatorAvatar'

export default {
  components: {
    ValidatorAvatar
  },
  computed: {
    stakeDenom() {
      return process.env.STAKEDENOM
    },
    validators() {
      return this.$store.getters[`validators/validators`]
    }
  }
}
</script>

<style lang="sass" scoped>
.vals-table
  th
    &.rank
      width: 3%
    &.moniker
      width: 65%
    &.tokens
      width: 22%
    &.commission
      width: 10%
  div.tokens
    min-width: 150px
    display: inline-block
</style>
