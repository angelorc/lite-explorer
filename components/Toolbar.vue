<template>
  <v-app-bar app color="red darken-1" fixed dark>
    <v-row class="px-4">
      <v-toolbar-title class="pl-1">
        <router-link
          to="/"
          aria-label="BitSong"
          class="d-flex align-center"
          title="BitSong"
        >
          <img
            alt="BitSong"
            min-width="135"
            width="135"
            src="/bitsong_logo.svg"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text :to="`/blocks`">Blocks</v-btn>
        <v-btn text :to="`/transactions`">Transactions</v-btn>
        <v-btn text :to="`/staking`">Staking</v-btn>
        <v-btn text>Governance</v-btn>
        <v-btn text>
          <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon>
          <span>{{ $store.getters[`app/chain_id`] }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-row>
  </v-app-bar>
</template>
