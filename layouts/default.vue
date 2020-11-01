<template>
  <v-app dark style="background-color: #fafafa">
    <toolbar />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar,
  },
  data() {
    return {}
  },
}
</script>
