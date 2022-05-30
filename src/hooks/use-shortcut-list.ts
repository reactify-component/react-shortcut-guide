import { useContext } from 'react'

import { ShortcutContext } from '../context/ShortcutContext'

export const useShortcutList = () => {
  const { shortcuts } = useContext(ShortcutContext)
  return shortcuts
}
