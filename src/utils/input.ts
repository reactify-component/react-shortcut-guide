export const checkIsPressInInputEl = () => {
  const $activeElement = document.activeElement as HTMLElement

  if (
    $activeElement &&
    (['input', 'textarea'].includes($activeElement.tagName.toLowerCase()) ||
      $activeElement.getAttribute('contenteditable') === 'true')
  ) {
    return true
  }
  return false
}
