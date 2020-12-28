export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state, { authUser, claims }) {
    if (!authUser) {
      state.user = null
    }
    const { displayName, email, emailVerified, photoURL } = authUser

    state.user = { displayName, email, emailVerified, photoURL }
  },
  FETCH_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  onAuthStateChangedAction (context, { authUser, claims }) {
    if (!authUser) {
      console.log(claims)
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
    } else {
      throw new Error('NEED_SIGNUP')
    }
  }
}

export const getters = {
  user: state => state.user
}
