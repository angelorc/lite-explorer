<template>
  <v-card :loading="lastBlock === 0">
    <v-card-title>Uptime last 100 blocks <span class="caption ml-2">({{ minBlock }} - {{ lastBlock }})</span></v-card-title>
    <v-card-text>
      <v-tooltip bottom v-for="(block, i) in blocks">
        <template v-slot:activator="{ on }">
          <v-btn class="ma-1" icon :to="`/blocks/${block.height}`">
            <v-icon v-on="on" v-if="!block.missed" color="green lighten-2" size="46">mdi-cube-outline</v-icon>
            <v-icon v-on="on" v-else color="red" size="46">mdi-cube-off-outline</v-icon>
          </v-btn>
        </template>
        <span>Block Height: {{ block.height }}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['missedBlocks'],
  data() {
    return {
      blocks: []
    }
  },
  created() {
    this.create()
  },
  methods: {
    create() {
      for (let i = this.lastBlock; i > this.minBlock; i--) {
        const missed = this.missedBlocks.find(b => b.height === i)
        this.blocks.push({
          height: i,
          missed: missed !== undefined
        })
      }
    },
    refresh() {
      if (this.blocks.length === 0) this.create()

      this.blocks.splice(0, 0, {
        height: this.lastBlock,
        missed: this.missedBlocks.length && this.missedBlocks[0].height === Number(this.lastBlock)
      })
      this.blocks.pop()
    }
  },
  watch: {
    lastBlock() {
      this.refresh()
    }
  },
  computed: {
    lastBlock() {
      const app_block = this.$store.getters[`app/last_block`]
      if (app_block === 0) {
        1
      }

      return this.$store.getters[`app/last_block`]
    },
    minBlock() {
      if (this.lastBlock > 100) return Number(this.lastBlock - 100)
      return 1
    }
  }
}
</script>
