export default function ({ $dialog, params, store, redirect }) {
  //  이미 로그인 되어있다면
  const user = store.getters['auth/user']

  if (!user) {
    return redirect('/a/Login')
  }

  if (user.uid !== params.uid) {
    $dialog.notify.error('접근권한이 없습니다 😯')
    redirect('/a/Login')
  }
}
