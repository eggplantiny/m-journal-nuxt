export const state = () => {
  return {
    fireUser: null,
    user: null
  }
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state, { authUser, claims }) {
    if (!authUser) {
      state.fireUser = null
      return
    }

    const { displayName, email, emailVerified, photoURL } = authUser
    state.fireUser = { displayName, email, emailVerified, photoURL }
  },
  FETCH_USER (state, userInfo) {
    state.user = userInfo
  }
}

export const actions = {
  onAuthStateChangedAction (context, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // perform logout operations
    }

    // const idToken = await this.$fire.auth.currentUser.getIdToken()
    // this.$axios.setToken(idToken, 'Bearer')
  },
  async fetchUser ({ commit }) {
    const { userInfo, exists } = await this.$axios.get('/auth/CheckUser').then(({ data }) => data.result)
    if (exists) {
      commit('FETCH_USER', userInfo)
    }
    return { userInfo, exists }
  },
  async logout ({ commit }) {
    await this.$fire.auth.signOut()
    commit('FETCH_USER', null)
  }
}

export const getters = {
  user: state => state.user
}
