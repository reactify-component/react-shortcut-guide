import { useContext } from 'react'

import { ShortcutContext } from '../context/ShortcutContext'

/**
 * omit `hidden in panel`
 */
export const useShortcutList = () => {
  const { shortcuts } = useContext(ShortcutContext)
  return shortcuts.filter(({ hiddenInPanel }) => !hiddenInPanel)
}
