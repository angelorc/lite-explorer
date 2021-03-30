<template>
  <v-simple-table class="txs-table" v-bind="$attrs" v-on="$listeners">
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

            <template v-else-if="header.value === 'tx_hash'">
              <div class="text-truncate tx_hash mt-2">
                <v-tooltip bottom v-if="!item.logs">
                  <template v-slot:activator="{ on }">
                    <v-icon
                      style="margin-top: -3px"
                      size="16"
                      color="red"
                      v-on="on"
                      >mdi-alert-circle</v-icon
                    >
                  </template>
                  <span>Fail</span>
                </v-tooltip>
                <nuxt-link :to="`/transactions/${item[header.value]}`">{{
                  item[header.value]
                }}</nuxt-link>
              </div>
            </template>

            <template v-else-if="header.value === 'timestamp'">
              <div class="timestamp">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{
                      item[header.value] | timeDistance
                    }}</span>
                  </template>
                  <span>{{ new Date(item[header.value]) }}</span>
                </v-tooltip>
              </div>
            </template>

            <template v-else-if="header.value === 'signatures'">
              <div class="text-truncate address text-mono">
                <nuxt-link :to="`/account/${item[header.value][0].address}`">{{
                  item[header.value][0].address
                }}</nuxt-link>
              </div>
            </template>

            <template v-else-if="header.value === 'to'">
              <div class="text-truncate address text-mono">
                <span v-if="item.messages[0].type === 'cosmos-sdk/MsgSend'">
                  <nuxt-link
                    :to="`/account/${item.messages[0].value.to_address}`"
                    >{{ item.messages[0].value.to_address }}</nuxt-link
                  >
                </span>
                <span v-else>-</span>
              </div>
            </template>

            <template v-else-if="header.value === 'messages'">
              <v-chip outlined small>{{
                item.messages[0].type | convertMessageType
              }}</v-chip>
              <v-chip outlined small v-if="item.messages.length - 1"
                >+{{ item.messages.length - 1 }}</v-chip
              >
            </template>

            <template v-else-if="header.value === 'amount'">
              <span v-if="item.messages[0].type === 'cosmos-sdk/MsgSend'">
                <amount
                  v-for="amount in item.messages[0].value.amount"
                  v-bind:key="amount.amount"
                  :microAmount="amount.amount"
                  :denom="amount.denom"
                />
              </span>
              <span
                v-else-if="item.messages[0].type === 'cosmos-sdk/MsgDelegate'"
              >
                <amount
                  :microAmount="item.messages[0].value.amount.amount"
                  :denom="item.messages[0].value.amount.denom"
                />
              </span>
              <nuxt-link
                v-else
                :to="`/transactions/${item.tx_hash}`"
                style="text-decoration: none"
              >
                <v-icon size="18">mdi-open-in-new</v-icon>
              </nuxt-link>
            </template>

            <template v-else-if="header.value === 'fee'">
              <template v-if="item.fee.length > 1">
                <amount
                  v-for="(amount, i) in item.fee.amount"
                  v-bind:key="i"
                  :microAmount="
                    item.fee.amount[i].amount ? item.fee.amount[i].amount : 0
                  "
                  :denom="item.fee.amount[i].denom"
                />
              </template>

              <template v-else-if="item.fee.amount === null">
                <amount
                  :microAmount="0"
                  :denom="$store.getters[`app/stakeDenom`]"
                />
              </template>

              <template v-else-if="item.fee.length === 1">
                <amount
                  :microAmount="item.fee[0].amount"
                  :denom="$store.getters[`app/stakeDenom`]"
                />
              </template>
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
  { text: 'Tx Hash', value: 'tx_hash' },
  { text: 'Height', value: 'height' },
  { text: 'Age', value: 'timestamp' },
  { text: 'From', value: 'signatures' },
  { text: 'To', value: 'to' },
  { text: 'Msgs', value: 'messages' },
  { text: 'Amount', value: 'amount' },
  { text: 'Fee', value: 'fee' }
]

export default {
  name: 'TransactionsTable',

  components: {
    AppSheet
  },

  props: {
    items: Array
  },

  filters: {
    timeDistance: value => getTimeDistance(value),
    convertMessageType: value => {
      return value
        .replace('cosmos-sdk/Msg', '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    }
  },

  computed: {
    headers() {
      return HEADERS
    }
  }
}
</script>

<style lang="sass" scoped>
div.timestamp
  width: 80px
  display: inline-block
.text-truncate
  &.tx_hash
    max-width: 160px
    display: inline-block
  &.address
    max-width: 180px
    display: inline-block
.txs-table
  th
    &.height
      width: 4%
    &.signatures
      width: 10%
    &.to
      width: 10%
    &.messages
      width: 20%
    &.amount
      width: 13%
    &.fee
      width: 12%
  .regular-row td
    padding: 8px 16px !important
  .regular-row.has-extra-row td
    border-bottom: none !important
  .extra-row:hover
    background: initial !important
  .extra-row td
    padding: 8px 0 !important
  .v-markdown ::v-deep p
    margin-bottom: 0
</style>
