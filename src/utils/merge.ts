export const merge = <T>(...args: T[]): T => {
  return Object.assign({}, ...args)
}
