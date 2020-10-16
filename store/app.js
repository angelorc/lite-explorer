export const state = () => ({
  connected: false,
  last_block: 0,
  total_supply: 0,
  community_pool: 0,
  inflation: 0,
  chain_id: ''
})

export const getters = {
  last_block: state => {
    return state.last_block
  },
  chain_id: state => {
    return state.chain_id
  },
  isConnected: state => {
    return state.connected
  },
  total_supply: state => {
    return state.total_supply
  },
  community_pool: state => {
    return state.community_pool
  },
  inflation: state => {
    return state.inflation
  }
}

export const mutations = {
  setHeaders: (state, headers) => {
    state.connected = true
    state.chain_id = headers.value.block.header.chain_id
    state.last_block = headers.value.block.header.height
  },
  setTotalSupply: (state, supply) => {
    state.total_supply = supply
  },
  setCommunityPool: (state, total) => {
    state.community_pool = total
  },
  setInflation: (state, inflation) => {
    state.inflation = inflation
  }
}


export const actions = {
  startListening({ commit }) {
    this.$tm.subscribe(
      {
        query: `tm.event = 'NewBlock'`,
      },
      async (response) => {
        commit('setHeaders', response.data)

        const supply = await this.$btsg.getTotalSupply()
        commit('setTotalSupply', supply.result[0].amount)

        const cp = await this.$btsg.getCommunityPool()
        commit('setCommunityPool', cp.result[0].amount)

        const inflation = await this.$btsg.getInflation()
        commit('setInflation', inflation.result)
      }
    )
  }
}
