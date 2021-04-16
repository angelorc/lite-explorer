<template>
  <v-card>
    <v-container>
      <v-row no-gutters>
        <v-col cols="3" md="1" align-self="center" class="text-center">
          <v-icon size="64" color="grey darken-3">mdi-account</v-icon>
        </v-col>
        <v-col cols="9" md="5" align-self="center">
          <span class="subtitle-1 font-weight-medium">Address</span><br />
          <span>{{ address }}</span>
        </v-col>
        <v-col
          cols="12"
          md="6"
          :class="{
            'text-right': $vuetify.breakpoint.mdAndUp,
            'text-center': $vuetify.breakpoint.smAndDown
          }"
          align-self="center"
        >
          <span v-if="$vuetify.breakpoint.mdAndUp" class="subtitle-2"
            >Balance</span
          ><br />
          <span>
            <amount
              large
              :microAmount="totalBalance"
              :denom="stakeDenom"
            ></amount>
          </span>
          <div class="grey--text text--darken-2">
            ${{ prettyUsd(accountValue) }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import BigNumber from 'bignumber.js'
import { prettyUsd } from '@/lib/utils'

export default {
  props: {
    address: {
      type: String,
      required: true
    },
    totalBalance: {
      type: Number,
      default: 0
    },
    stakeDenom: {
      type: String,
      default: process.env.STAKEDENOM
    }
  },
  methods: {
    prettyUsd(val) {
      return prettyUsd(val)
    }
  },
  computed: {
    accountValue() {
      return new BigNumber(this.totalBalance)
        .times(0.000001)
        .multipliedBy(this.$store.getters['app/price'])
        .toFixed(2)
    }
  }
}
</script>
