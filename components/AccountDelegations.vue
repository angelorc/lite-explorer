<template>
  <v-card elevation="1">
    <v-list v-for="(delegation, i) in delegations" :key="i" class="py-0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <amount
              :microAmount="delegation.balance.amount"
              :denom="delegation.balance.denom"
            />
          </v-list-item-title>
          <v-list-item-subtitle>
            <proposer :valoper="delegation.validator_address"></proposer>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon :to="`/staking/${delegation.validator_address}`">
            <v-icon color="primary">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    delegations: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
