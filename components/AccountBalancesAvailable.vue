<template>
  <v-card>
    <v-list>
      <v-list-item v-for="(coin, i) in balances" :key="i">
        <v-list-item-avatar>
          <v-icon
            v-if="
              coin.denom.toUpperCase().substring(1) !== stakeDenom.toUpperCase()
            "
            >mdi-help-circle-outline</v-icon
          >
          <v-img v-else src="/bitsong_logo_circle_red.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <amount :microAmount="coin.amount" denom="" />
          </v-list-item-title>
          <v-list-item-subtitle>{{
            coin.denom.toUpperCase().substring(1)
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    balances: {
      type: Array,
      default() {
        return []
      },
    },
    stakeDenom: {
      type: String,
      default: process.env.STAKEDENOM,
    },
  },
}
</script>
