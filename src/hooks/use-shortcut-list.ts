import { useContext } from 'react'

import { ShortcutContext } from '..'

export const useShortcutList = () => {
  const { shortcuts } = useContext(ShortcutContext)
  return shortcuts
}
