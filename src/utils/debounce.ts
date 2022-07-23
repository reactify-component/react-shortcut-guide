export const debounce = (fn: (...args: any[]) => any, wait: number) => {
  let timeout: any
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.call(null, ...args), wait)
  }
}
