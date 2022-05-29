import { useContext } from 'react'

import { ShortcutContext } from '..'

export const useShortcut = () => {
  const { registerShortcut } = useContext(ShortcutContext)

  return {
    registerShortcut,
  }
}
