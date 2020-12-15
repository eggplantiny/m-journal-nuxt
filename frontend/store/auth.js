export const state = () => {
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state, { authUser, claims }) {
    console.log('MUTATION onAuthStateChangedMutation', { authUser, claims })
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
}

export const actions = {
  onAuthStateChangedAction (ctx, { authUser, claims }) {
    console.log('ACTION onAuthStateChangedMutation', { authUser, claims })
    if (!authUser) {
      // claims = null
      // perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  }
}

export const getters = {
}
