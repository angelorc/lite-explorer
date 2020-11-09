<template>
  <v-card>
    <template v-for="(msg, i) in msgs">
      <v-card-title>{{ msg.type | convertMessageType }}</v-card-title>
      <template v-for="([key, value], i) in Object.entries(msg.value)">
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" md="2" :class="{'py-0': $vuetify.breakpoint.smAndDown }" class="grey--text text--darken-2">
              {{ key | convertKey }}
            </v-col>
            <v-col cols="12" md="10" :class="{'pt-0': $vuetify.breakpoint.smAndDown }">
              <span v-if="key !== 'amount'">{{ value }}</span>
              <amount v-else :micro-amount="value.amount" :denom="value.denom" />
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
      default () {
        return []
      }
    }
  },
  components: {
    Amount
  },
  filters: {
    convertMessageType: (value) => {
      return value
        .replace('cosmos-sdk/Msg', '')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    },
    convertKey: (value) => {
      return upperCaseFirstLetter(value.replace('_', ' ').trim())
    }
  }
}
</script>
