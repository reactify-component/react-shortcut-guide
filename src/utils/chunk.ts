export function chunkTwo<T>(array: T[]): T[][] {
  const length = array == null ? 0 : array.length
  const result = [[], []] as T[][]
  if (!length) {
    return result
  }

  if (length == 2) {
    return [[array[0]], [array[1]]]
  }

  const midIndex = Math.ceil(array.length / 2)

  return [array.slice(0, midIndex), array.slice(midIndex, array.length)]
}
