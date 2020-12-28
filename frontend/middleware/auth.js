export default async function ({ $axios, $fire, route }) {
  const idToken = await $fire.auth.currentUser.getIdToken()
  if (!idToken) {
    return route.push('/a/Login')
  }
  $axios.setToken(idToken, 'Bearer')
}
