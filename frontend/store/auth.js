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
  async onAuthStateChangedAction (context, { authUser, claims }) {
    if (!authUser) {
      console.log(claims)
      // claims = null
      // perform logout operations
      return
    }

    const idToken = await this.$fire.auth.currentUser.getIdToken()
    this.$axios.setToken(idToken, 'Bearer')

    console.log('Login success')
  }
}

export const getters = {
}
