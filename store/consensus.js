export const state = () => ({
  height: 0,
  proposer: '-',
  round: 0,
  step: '-',
  signatures: 0
})

export const getters = {
  height: state => {
    return state.height
  },
  proposer: state => {
    return state.proposer
  },
  round: state => {
    return state.round
  },
  step: state => {
    return state.step
  },
  signatures: state => {
    return state.signatures
  }
}

export const mutations = {
  setRound: (state, payload) => {
    state.height = payload.height
    state.proposer = payload.proposer.address
    state.round = payload.round
    state.step = payload.step
  },
  resetSignatures: (state) => {
    state.signatures = 0
  },
  incrementSignatures: (state) => {
    state.signatures++
  }
}


export const actions = {
  subscribe({ commit }) {
    this.$tm.subscribe(
      {
        query: `tm.event = 'NewRound'`,
      },
      async (response) => {
        commit('resetSignatures')
        commit('setRound', response.data.value)
      }
    )

    this.$tm.subscribe(
      {
        query: `tm.event = 'Vote'`,
      },
      async (response) => {
        if (response.data.value.Vote.type === 2) {
          commit('incrementSignatures')
        }
      }
    )
  }
}
