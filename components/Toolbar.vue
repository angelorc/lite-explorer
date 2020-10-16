<template>
  <v-app-bar app color="transparent" fixed flat>
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
            src="/bitsong_logo_red.svg"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <span class="hain_name">
          <v-icon dark class="pr-3" color="green" size="12">mdi-circle</v-icon>
          <span>{{ $store.getters[`app/chain_id`] }}</span>
        </span>
      </v-toolbar-items>
    </v-row>
  </v-app-bar>
</template>

<style scoped>
.chain_name {
  display: flex;
  height: 100% !important;
  align-items: center;
  vertical-align: middle;
  font-weight: 500;
}
.chain_name_padding {
  padding: 0 20px;
}
</style>
