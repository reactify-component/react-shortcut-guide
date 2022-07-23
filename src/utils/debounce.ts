export const debounce = (fn: () => any, wait: number) => {
  let timeout: any
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
