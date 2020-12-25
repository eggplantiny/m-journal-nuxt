export const state = () => {
  return {
    loginDialog: false
  }
}

export const mutations = {
  LOGIN_DIALOG (state, model) {
    state.loginDialog = model
  }
}

export const actions = {
  loginOpen ({ commit }) {
    commit('LOGIN_DIALOG', true)
  },
  loginClose ({ commit }) {
    commit('LOGIN_DIALOG', false)
  }
}

export const getters = {
  loginDialog: state => state.loginDialog
}
