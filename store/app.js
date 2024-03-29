import BigNumber from 'bignumber.js'

export const state = () => ({
  connected: false,
  last_block: 0,
  total_supply: 0,
  community_pool: 0,
  inflation: 0,
  chain_id: '',
  signatures: {
    active: 0,
    total: 0
  },
  stakeDenom: 'ubtsg',
  price: 0,
  eth_supply: 11447149.845485103
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
  },
  signatures: state => {
    return state.signatures
  },
  stakeDenom: state => {
    return state.stakeDenom
  },
  price: state => {
    return new BigNumber(state.price).toFixed(4)
  },
  market_cap: (state, getters) => {
    const total_supply = new BigNumber(getters.total_supply).times(0.000001)
    return new BigNumber(state.price).multipliedBy(new BigNumber(state.eth_supply).plus(total_supply)).toFixed(0)
  }
}

export const mutations = {
  setHeaders: (state, headers) => {

    state.connected = true
    state.chain_id = headers.value.block.header.chain_id
    state.last_block = headers.value.block.header.height

    const signatures = headers.value.block.last_commit.signatures
    const signatureslen = signatures.length
    const signaturesNull = signatures.filter(s => s.signature === null).length
    state.signatures.total = signatureslen
    state.signatures.active = signatureslen - signaturesNull
  },
  setTotalSupply: (state, supply) => {
    state.total_supply = supply
  },
  setCommunityPool: (state, total) => {
    state.community_pool = total
  },
  setInflation: (state, inflation) => {
    state.inflation = inflation
  },
  setPrice: (state, price) => {
    state.price = price
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
  },
  async getPrice({ commit }) {
    const price = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitsong&vs_currencies=usd`).then(response =>
      response.json()
    ).then(response => response.bitsong.usd)

    commit('setPrice', price)
  }
}
