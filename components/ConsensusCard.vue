<template>
  <v-card tile elevation="1" :loading="active && height == 0">
    <v-toolbar flat>
      <v-toolbar-title class="title"> Consensus State </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-switch class="mt-6" v-model="active"></v-switch>
    </v-toolbar>
    <v-container v-if="active">
      <v-row>
        <v-col cols="12" md="3" class="text-center">
          <v-list-item-title>
            <proposer :address="proposer"></proposer
          ></v-list-item-title>
          <v-list-item-subtitle class="grey--text text--darken-2"
            >Proposer</v-list-item-subtitle
          >
        </v-col>
        <v-col cols="4" md="3" class="text-center">
          <v-list-item-title>{{ height }}</v-list-item-title>
          <v-list-item-subtitle class="grey--text text--darken-2"
            >Height</v-list-item-subtitle
          >
        </v-col>
        <v-col cols="4" md="3" class="text-center">
          <v-list-item-title>{{ round }}</v-list-item-title>
          <v-list-item-subtitle class="grey--text text--darken-2"
            >Round</v-list-item-subtitle
          >
        </v-col>
        <v-col cols="4" md="3" class="text-center">
          <v-list-item-title>{{ signatures }}</v-list-item-title>
          <v-list-item-subtitle class="grey--text text--darken-2"
            >Precommit</v-list-item-subtitle
          >
        </v-col>
        <v-col cols="12" class="text-center px-4">
          <v-progress-linear
            v-model="percentage"
            color="red darken-1"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      active: false,
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
    },
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
