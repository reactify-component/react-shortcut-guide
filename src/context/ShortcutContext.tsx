import React from 'react'

import { RegisterShortcutType, ShortcutType } from '~/types'

export type ShortcutOptions = {
  darkMode?: 'media' | 'class'
  /**
   * @default 'body.dark'
   */
  darkClassName?: string
}
export type ShortcutContextValue = {
  shortcuts: ShortcutType[]
  registerShortcut: RegisterShortcutType
  options: ShortcutOptions
}
export const ShortcutContext = React.createContext<ShortcutContextValue>({
  shortcuts: [],
  registerShortcut() {
    return () => {}
  },
  options: {},
})
