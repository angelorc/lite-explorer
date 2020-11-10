<template>
  <v-card class="elevation-1">
    <v-container class="py-0">
      <v-row>
        <v-col cols="12" md="6">
          <div class="subtitle-2 mt-1">
            {{ transactions.totalDocs }} transactions found
          </div>
        </v-col>
        <v-col
          v-if="!address"
          cols="12"
          md="6"
          :class="{
            'text-right': $vuetify.breakpoint.mdAndUp,
            'text-center pt-0': $vuetify.breakpoint.smAndDown
          }"
        >
          <pagination
            :pagination-info="{
              pages: transactions.totalPages,
              page: transactions.page
            }"
          >
          </pagination>
        </v-col>
        <v-col v-else cols="12" md="6" class="text-right">
          <v-btn
            outlined
            :to="`/transactions?account=${address}`"
            small
            v-if="transactions.totalDocs > 10"
          >
            View All
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <transactions-table :items="transactions.docs"></transactions-table>

    <v-divider></v-divider>
    <v-container class="py-0" v-if="!address">
      <v-row>
        <v-col cols="12" class="text-center">
          <pagination
            :pagination-info="{
              pages: transactions.totalPages,
              page: transactions.page
            }"
          >
          </pagination>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Pagination from '@/components/Pagination'
import TransactionsTable from '@/components/TransactionsTable'

export default {
  props: {
    transactions: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    address: {
      type: String,
      default: null
    }
  },
  components: {
    Pagination
  }
}
</script>
