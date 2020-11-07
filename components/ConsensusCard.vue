<template>
  <v-card tile elevation="1" :loading="active && height == 0">
    <v-toolbar flat>
      <v-toolbar-title class="title">
        Consensus State
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-switch class="mt-6" v-model="active"></v-switch>
    </v-toolbar>
    <v-list v-if="active">
      <v-list-item two-line>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ height }}</v-list-item-title>
          <v-list-item-subtitle>Height</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>
            <proposer :address="proposer"></proposer
          ></v-list-item-title>
          <v-list-item-subtitle>Proposer</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ round }}</v-list-item-title>
          <v-list-item-subtitle>Round</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content class="text-center">
          <v-list-item-title>{{ signatures }}</v-list-item-title>
          <v-list-item-subtitle>Precommit</v-list-item-subtitle>
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
  data() {
    return {
      active: false
    }
  },
  beforeDestroy() {
    if (this.active) this.$store.dispatch(`consensus/unsubscribe`)
  },
  watch: {
    active(val) {
      if (val) {
        this.$store.dispatch(`consensus/subscribe`)
      } else {
        this.$store.dispatch(`consensus/unsubscribe`)
      }
    }
  },
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
