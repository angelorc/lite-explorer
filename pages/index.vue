<template>
  <page-template>
    <dashboard-overview class="mb-8"></dashboard-overview>
    <consensus-card class="mb-4"></consensus-card>
    <v-container class="px-0" fluid>
      <v-row>
        <v-col cols="6">
          <dashboard-latest-blocks></dashboard-latest-blocks>
        </v-col>
        <v-col cols="6">
          <dashboard-latest-txs></dashboard-latest-txs>
        </v-col>
      </v-row>
    </v-container>
  </page-template>
</template>

<script>
import PageTemplate from '@/components/PageTemplate'

import DashboardOverview from '@/components/DashboardOverview'
import DashboardLatestBlocks from '@/components/DashboardLatestBlocks'
import DashboardLatestTxs from '@/components/DashboardLatestTxs'
import ConsensusCard from '@/components/ConsensusCard'

export default {
  components: {
    PageTemplate,
    DashboardOverview,
    DashboardLatestBlocks,
    DashboardLatestTxs,
    ConsensusCard,
  },
}
</script>
