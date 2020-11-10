<template>
  <v-simple-table class="blocks-table" v-bind="$attrs" v-on="$listeners">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value" :class="header.value">
          <div class="text-capitalize" v-text="header.text" />
        </th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in items">
        <tr :key="item.name">
          <td v-for="(header, i) in headers" :key="i" :class="header.value">
            <template v-if="header.value === 'height'">
              <div class="font-weight-bold text-mono">
                <nuxt-link :to="`/blocks/${item[header.value]}`">{{
                  item[header.value]
                }}</nuxt-link>
              </div>
            </template>

            <template v-else-if="header.value === 'hash'">
              <div class="text-truncate hash">
                {{ item[header.value] }}
              </div>
            </template>

            <template v-else-if="header.value === 'timestamp'">
              <div class="timestamp">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span
                      v-on="on"
                      >{{ item[header.value] | timeDistance }}</span
                    >
                  </template>
                  <span>{{new Date(item[header.value])}}</span>
                </v-tooltip>
              </div>
            </template>

            <template v-else-if="header.value === 'proposer_address'">
              <div class="text-truncate address text-mono">
                <proposer :address="item[header.value]" />
              </div>
            </template>

            <template v-else-if="header.value === 'total_fees'">
              <amount
                :microAmount="item[header.value]"
                :denom="$store.getters[`app/stakeDenom`]"
              />
            </template>

            <template v-else>
              {{ item[header.value] }}
            </template>
          </td>
        </tr>
      </template>
    </tbody>
  </v-simple-table>
</template>

<script>
import { getTimeDistance } from '~/lib/utils'

import AppSheet from '@/components/app/Sheet'

const HEADERS = [
  { text: 'Height', value: 'height' },
  { text: 'Hash', value: 'hash' },
  { text: 'Proposer', value: 'proposer_address' },
  { text: 'Txs', value: 'total_txs' },
  { text: 'Fees', value: 'total_fees' },
  { text: 'Age', value: 'timestamp' }
]

export default {
  name: 'BlocksTable',

  components: {
    AppSheet
  },

  props: {
    items: Array
  },

  filters: {
    timeDistance: (value) => getTimeDistance(value),
  },

  computed: {
    headers () {
      return HEADERS
    }
  },
}
</script>

<style lang="sass" scoped>
div.timestamp
  width: 100px
  display: inline-block
.text-truncate
  &.hash
    max-width: 250px
    display: inline-block
.blocks-table
  th
    &.height
      width: 5%
    &.hash
      width: 15%
    &.proposer_address
      width: 35%
</style>
