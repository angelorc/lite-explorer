<template>
  <v-card>
    <v-container>
      <v-row no-gutters>
        <v-col cols="1" align-self="center" class="text-center">
          <v-icon size="64" color="grey darken-3">mdi-qrcode</v-icon>
        </v-col>
        <v-col cols="5" align-self="center">
          <span class="subtitle-1 font-weight-medium">Address</span><br />
          <span>{{ address }}</span>
        </v-col>
        <v-col cols="6" class="text-right" align-self="center">
          <span class="subtitle-2">Balance</span><br />
          <span>
            <amount
              large
              :microAmount="totalBalance"
              :denom="stakeDenom"
            ></amount>
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      required: true,
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    stakeDenom: {
      type: String,
      default: process.env.STAKEDENOM,
    },
  },
}
</script>
