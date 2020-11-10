<template>
  <page-template>
    <h1 class="text-h4 mb-4">Blocks</h1>
    <v-card>
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" md="6">
            <div class="subtitle-2 mt-1">
              Block #{{ blocks.docs[blocks.docs.length - 1].height }} to #{{
                blocks.docs[0].height
              }}
              (Total of {{ blocks.totalDocs }} blocks)
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            :class="{
              'text-right': $vuetify.breakpoint.mdAndUp,
              'text-center pt-0': $vuetify.breakpoint.smAndDown
            }"
          >
            <pagination
              :pagination-info="{
                pages: blocks.totalPages,
                page: blocks.page
              }"
            >
            </pagination>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>

      <blocks-table :items="blocks.docs"></blocks-table>

      <v-divider></v-divider>
      <v-container class="py-0">
        <v-row>
          <v-col cols="12" class="text-center">
            <pagination
              :pagination-info="{
                pages: blocks.totalPages,
                page: blocks.page
              }"
            >
            </pagination>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'

export default {
  head() {
    const title = `Blocks`

    return {
      title: title,
      meta: [{ hid: 'og-title', name: 'og:title', content: title }]
    }
  },
  components: {
    PageTemplate
  },
  watchQuery: ['page'],
  key: to => to.fullPath,
  async asyncData({ app, query }) {
    let page = 1
    let limit = 25

    if (query.page) page = parseInt(query.page)

    let offset = page * limit - limit

    const blocks = await app.$api.getBlocks(offset, limit)

    return {
      blocks
    }
  }
}
</script>
