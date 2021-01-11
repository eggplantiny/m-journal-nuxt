export const state = () => {
  return {
    model: false
  }
}

export const mutations = {
  DRAWER (state, model) {
    state.model = model
  }
}

export const actions = {
  open ({ commit }) {
    commit('DRAWER', true)
  },
  close ({ commit }) {
    commit('DRAWER', false)
  }
}

export const getters = {
  model: state => state.model
}
