export default function ({ store }) {
  const color = store.getters['setting/color']
  const metaThemeColor = document.querySelector('meta[name=theme-color]')

  metaThemeColor.setAttribute('content', color)
}
