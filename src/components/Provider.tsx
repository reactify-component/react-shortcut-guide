import React, { FC, memo, useCallback } from 'react'

import { macosMetaKeyCharMap } from '~/constants/key-map'
import { Modifier } from '~/enums/modifier'
import { RegisterShortcutType, ShortcutType } from '~/types'

import { ShortcutContext } from '..'
import { GuidePanel } from './Guide'

export const ShortcutProvider: FC = memo((props) => {
  const [shortcuts, setShortcuts] = React.useState<ShortcutType[]>([])

  const registerShortcut: RegisterShortcutType = useCallback(
    (key, modifierFlags, action, discoverabilityTitle) => {
      setShortcuts((shortcuts) => {
        return [
          ...shortcuts,
          {
            keys: [
              ...modifierFlags.map((modifier) => macosMetaKeyCharMap[modifier]),
              key.toUpperCase(),
            ],
            title: discoverabilityTitle,
          },
        ]
      })
    },
    [],
  )

  return (
    <ShortcutContext.Provider value={{ shortcuts, registerShortcut }}>
      {props.children}

      <GuidePanel />
    </ShortcutContext.Provider>
  )
})
