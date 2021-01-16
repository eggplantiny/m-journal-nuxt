export const state = () => {
  return {
    dark: false,
    detail: false,
    color: '#e3f6f5'
  }
}

export const mutations = {
  UPDATE (state, { dark, detail, color }) {
    state.dark = dark
    state.detail = detail
    state.color = color
  }
}

export const actions = {
  async fetch ({ commit }) {
    const res = await this.$axios.$get('/setting')
    const setting = res.result

    if (setting) {
      commit('UPDATE', setting)
    }
  },
  async update ({ commit }, { nickName, dark, detail, color }) {
    await this.$axios.$put('/setting', { nickName, dark, detail, color })
    commit('UPDATE', { dark, detail, color })
  }
}

export const getters = {
  dark: state => state.dark,
  detail: state => state.detail,
  color: state => state.color
}
