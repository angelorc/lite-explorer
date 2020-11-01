<template>
  <v-card tile elevation="1">
    <v-card-title>
      <h3 class="title">Consensus State</h3>
    </v-card-title>
    <v-list>
      <v-list-item two-line>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ height }}</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ proposer }}</v-list-item-title>
          <v-list-item-subtitle>Proposer</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ round }}</v-list-item-title>
          <v-list-item-subtitle>Round</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ signatures }}</v-list-item-title>
          <v-list-item-subtitle>Signatures</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-progress-linear
            v-model="percentage"
            color="red darken-1"
          ></v-progress-linear>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    height() {
      return this.$store.getters[`consensus/height`]
    },
    proposer() {
      return this.$store.getters[`consensus/proposer`]
    },
    round() {
      return this.$store.getters[`consensus/round`]
    },
    step() {
      return this.$store.getters[`consensus/step`]
    },
    signatures() {
      return this.$store.getters[`consensus/signatures`]
    },
    validators() {
      return this.$store.getters[`validators/total_active`]
    },
    percentage() {
      return (this.signatures / this.validators) * 100
    },
  },
}
</script>
