<template>
  <v-card>
    <v-list>
      <v-list-item v-for="(balance, label) in balances" :key="label">
        <v-list-item-avatar>
          <v-img src="/bitsong_logo_circle_red.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <amount :microAmount="balance" :denom="stakeDenom" />
          </v-list-item-title>
          <v-list-item-subtitle>{{
            label.charAt(0).toUpperCase() + label.slice(1)
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
      type: Object,
      default() {
        return {
          delegated: 0,
        }
      },
    },
    stakeDenom: {
      type: String,
      default: process.env.STAKEDENOM,
    },
  },
}
</script>
