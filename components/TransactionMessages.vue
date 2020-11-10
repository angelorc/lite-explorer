<template>
  <v-card>
    <template v-for="(msg, i) in msgs">
      <v-card-title :key="i">{{ msg.type | convertMessageType }}</v-card-title>
      <template v-for="([key, value], i) in Object.entries(msg.value)">
        <v-container class="py-0" :key="i">
          <v-row>
            <v-col
              cols="12"
              md="2"
              :class="{ 'py-0': $vuetify.breakpoint.smAndDown }"
              class="grey--text text--darken-2"
            >
              {{ key | convertKey }}
            </v-col>
            <v-col
              cols="12"
              md="10"
              :class="{ 'pt-0': $vuetify.breakpoint.smAndDown }"
            >
              <template
                v-if="value.length > 10 && value.startsWith('bitsong1')"
              >
                <nuxt-link :to="`/account/${value}`">{{ value }}</nuxt-link>
              </template>

              <template
                v-else-if="
                  value.length > 10 && value.startsWith('bitsongvaloper')
                "
              >
                <nuxt-link :to="`/staking/${value}`">{{ value }}</nuxt-link>
              </template>

              <amount
                v-else-if="key === 'amount' && value.denom !== undefined"
                :micro-amount="value.amount"
                :denom="value.denom"
              />
              <template
                v-else-if="key === 'amount' && value.length > 0"
                v-for="(amt, i) in value"
              >
                <amount
                  :key="i"
                  :micro-amount="amt.amount"
                  :denom="amt.denom"
                />
              </template>

              <template v-else>
                {{ value }}
              </template>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </template>
  </v-card>
</template>

<script>
import Amount from '@/components/Amount'

const upperCaseFirstLetter = val => {
  return val.charAt(0).toUpperCase() + val.slice(1)
}

export default {
  props: {
    msgs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Amount
  },
  filters: {
    convertMessageType: value => {
      return value
        .replace('cosmos-sdk/Msg', '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    },
    convertKey: value => {
      return upperCaseFirstLetter(value.replace('_', ' ').trim())
    }
  }
}
</script>
