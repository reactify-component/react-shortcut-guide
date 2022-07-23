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

export const chunk = <T>(array: T[], size: number) => {
  const length = array == null ? 0 : array.length
  if (!length || !size || size < 1) {
    return []
  }

  const result = []
  let index = 0
  while (index < length) {
    result.push(array.slice(index, (index += size)))
  }

  return result
}
