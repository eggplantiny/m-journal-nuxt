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
      return
    }

    const idToken = await this.$fire.auth.currentUser.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    const { data } = await this.$axios.get('/auth/CheckUser')

    if (data === false) {
      await this.$axios.post('/auth/SignUp')
      console.log('signUp Success !')
    }
  }
}

export const getters = {
}
