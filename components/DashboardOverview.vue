<template>
  <v-card tile elevation="1">
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
              <amount :microAmount="total_supply" :denom="stakeDenom" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="12" md="4">
        <v-list-item>
          <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle>VALIDATORS</v-list-item-subtitle>
            <v-list-item-title
              >{{ signatures.active }}/{{ signatures.total }}</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>VALIDATORS</v-list-item-subtitle>
            <v-list-item-title
              >{{ signatures.active }}/{{ signatures.total }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle>VOTING POWER</v-list-item-subtitle>
            <v-list-item-title
              ><amount :microAmount="total_power" :denom="stakeDenom"
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
              ><amount :microAmount="community_pool" :denom="stakeDenom"
            /></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon> <v-icon>mdi-cube</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-subtitle>INFLATION</v-list-item-subtitle>
            <v-list-item-title>{{ percentage(inflation) }} %</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    percentage(amt) {
      return parseFloat(amt * 100).toFixed(2)
    },
  },
  computed: {
    stakeDenom() {
      return process.env.STAKEDENOM
    },
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
