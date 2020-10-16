<template>
  <page-template>
    <v-card flat>
      <v-row>
        <v-col cols="12" md="4">
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>LATEST BLOCK</v-list-item-subtitle>
              <v-list-item-title>{{ last_block }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>TOTAL SUPPLY</v-list-item-subtitle>
              <v-list-item-title>
                <Amount :microAmount="total_supply" denom="BTSG" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" md="4">
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>ACTIVE VALIDATORS</v-list-item-subtitle>
              <v-list-item-title>{{ active_validators }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>VOTING POWER</v-list-item-subtitle>
              <v-list-item-title
                ><Amount :microAmount="total_power" denom="BTSG"
              /></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="12" md="4">
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>COMMUNITY POOL</v-list-item-subtitle>
              <v-list-item-title
                ><Amount :microAmount="community_pool" denom="BTSG"
              /></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>INFLATION</v-list-item-subtitle>
              <v-list-item-title
                >{{ percentage(inflation) }} %</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card>
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
                  <span v-if="validator.status === 3">Status: Active</span>
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
                  <span>Commission is more then 20%</span>
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
                  <span>Commission is more then 50%</span>
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

export default {
  components: {
    PageTemplate,
    ValidatorAvatar,
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
  },
}
</script>
