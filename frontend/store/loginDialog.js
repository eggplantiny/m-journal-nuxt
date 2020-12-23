export const state = () => {
  return {
    model: false
  }
}

export const mutations = {
  DIALOG_MODEL (state, model) {
    state.model = model
  }
}

export const actions = {
  openDialog ({ commit }) {
    commit('DIALOG_MODEL', true)
  },
  closeDialog ({ commit }) {
    commit('DIALOG_MODEL', false)
  }
}

export const getters = {
  model: state => state.model
}
