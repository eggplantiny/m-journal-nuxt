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
  }
}

export const actions = {
  async onAuthStateChangedAction (ctx, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      const idToken = await this.$fire.auth.currentUser.getIdToken()
      // console.log('fucking!!', this.$axios)
      this.$axios.setToken(idToken, 'Bearer')
      // Do something with the authUser and the claims object...
    }
  }
}

export const getters = {
}
