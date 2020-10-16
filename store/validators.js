export const state = () => ({
  validators: []
})

export const getters = {
  validators: state => {
    return state.validators
  },
  total_active: state => {
    return state.validators.filter(v => v.status === 2).length
  },
  total_power: state => {
    let vals = state.validators.filter(v => v.status === 2)

    if (vals.length === 0) return 0

    return vals.reduce((a, b) => {
      const sum = Number(a) + Number(b.tokens)
      return sum
    }, 0)
  }
}

export const mutations = {
  setValidators: (state, vals) => {
    state.validators = vals
  }
}


export const actions = {
  async getAll({ commit }) {
    const vals = await this.$btsg.getValidators()

    commit('setValidators', vals.result)
  }
}
