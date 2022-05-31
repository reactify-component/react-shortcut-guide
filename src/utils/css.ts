export const injectCSS = (css: string) => {
  const $style = document.createElement('style')
  $style.innerHTML = css
  document.head.appendChild($style)

  return () => {
    document.head.removeChild($style)
  }
}
