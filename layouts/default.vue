<template>
  <v-app dark style="background-color: #fafafa">
    <toolbar />
    <v-main>
      <nuxt />
    </v-main>
    <mobile-toolbar v-if="$vuetify.breakpoint.smAndDown"></mobile-toolbar>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import MobileToolbar from '@/components/MobileToolbar'
import AppFooter from '@/components/Footer'

export default {
  components: {
    Toolbar,
    MobileToolbar,
    AppFooter,
  },
}
</script>
