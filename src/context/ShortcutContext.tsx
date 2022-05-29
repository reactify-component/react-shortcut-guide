import React from 'react'

import { RegisterShortcutType, ShortcutType } from '~/types'

export type ShortcutContextValue = {
  shortcuts: ShortcutType[]
  registerShortcut: RegisterShortcutType
}
export const ShortcutContext = React.createContext<ShortcutContextValue>({
  shortcuts: [],
  registerShortcut() {},
})
