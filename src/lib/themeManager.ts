export function themeManager() {
  const htmlTag = document.getElementsByTagName('html')[0]
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    htmlTag.classList.toggle('dark')

  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      event.matches
        ? htmlTag.classList.add('dark')
        : htmlTag.classList.remove('dark')
    })
}
