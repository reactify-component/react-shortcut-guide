import { useContext } from 'react'

import { ShortcutContext } from '..'

export const useShortcutOptions = () => {
  const { options, setOptions } = useContext(ShortcutContext)
  return {
    options,
    setOptions,
  }
}
