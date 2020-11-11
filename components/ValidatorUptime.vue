<template>
  <v-card :loading="lastBlock === 0" v-if="success">
    <v-card-title
      >Uptime last 100 blocks
      <span class="caption ml-2"
        >{{ uptime }}% ({{ minBlock }} - {{ lastBlock }})</span
      ></v-card-title
    >
    <v-card-text>
      <v-tooltip bottom v-for="(block, i) in blocks" :key="i">
        <template v-slot:activator="{ on }">
          <v-btn class="ma-1" icon :to="`/blocks/${block.height}`">
            <v-icon
              v-on="on"
              v-if="!block.missed"
              color="green lighten-2"
              size="46"
              >mdi-cube-outline</v-icon
            >
            <v-icon v-on="on" v-else color="red" size="46"
              >mdi-cube-off-outline</v-icon
            >
          </v-btn>
        </template>
        <span>Block Height: {{ block.height }}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    valoper: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      blocks: [],
      success: true
    }
  },
  async created() {
    await this.create()
  },
  methods: {
    async create() {
      if (this.lastBlock === 1) return

      const uptime = await this.$api.getUptime(
        this.valoper, this.minBlock, this.lastBlock, true
      )

      if (uptime.success === false) {
        this.success = false
        return
      }

      const signedBlocks = uptime.blocks

      for (let i = this.lastBlock; i > this.minBlock; i--) {
        const signed = signedBlocks.findIndex((b) => b === i)
        this.blocks.push({
          height: i,
          missed: signed === -1,
        })
      }
    },
    async refresh() {
      try {
        if (!this.success) return
        if (this.blocks.length === 0) this.create()

        const uptime = await this.$api.getUptime(
          this.valoper, this.blocks[0].height + 1, this.lastBlock, true
        )

        if (uptime.success === false) return

        const signed = uptime.blocks.findIndex((b) => b === this.lastBlock)

        this.blocks.splice(0, 0, {
          height: this.lastBlock,
          missed: signed === -1,
        })
        this.blocks.pop()
      } catch (e) {

      }
    },
  },
  watch: {
    lastBlock() {
      this.refresh()
    },
  },
  computed: {
    lastBlock() {
      const app_block = this.$store.getters[`app/last_block`]
      if (app_block === 0) {
        return 1
      }

      return app_block - 1
    },
    minBlock() {
      if (this.lastBlock > 100) return Number(this.lastBlock - 100)
      return 1
    },
    uptime() {
      const missed = this.blocks.filter(b => b.missed === true).length
      const blocks = this.blocks.length
      return 100 - ((missed / blocks) * 100)
    }
  },
}
</script>
