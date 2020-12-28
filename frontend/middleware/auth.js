export default async function ({ $axios, $fire, store, redirect }) {
  //  이미 로그인 되어있다면
  const user = store.getters['auth/user']
  if (user) {
    return
  }

  //  token 이 없다면 firebase login 후 토큰 등록
  const idToken = await $fire.auth.currentUser.getIdToken()
  if (!idToken) {
    return redirect('/a/Login')
  }

  $axios.setToken(idToken, 'Bearer')

  const exists = await store.dispatch('auth/fetchUser')
  if (!exists) {
    return redirect('/a/SignUp')
  }
}
