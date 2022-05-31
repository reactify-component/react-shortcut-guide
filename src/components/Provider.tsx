import React, { FC, memo, useCallback, useEffect, useRef } from 'react'

import { macosMetaKeyCharMap, otherKeyCharMap } from '~/constants/key-map'
import { Modifier } from '~/enums/modifier'
import { RegisterShortcutType, ShortcutType } from '~/types'
import { uniqueArray } from '~/utils/tool'

import { ShortcutContext, ShortcutOptions } from '..'
import { GuidePanelAnimated } from './GuidePanelAnimated'

const modifiers = Object.keys(Modifier)
const isModifierKey = (key: string) => !!-~modifiers.indexOf(key)

export const ShortcutProvider: FC<{ options?: ShortcutOptions }> = memo(
  (props) => {
    const { options } = props
    const [shortcuts, setShortcuts] = React.useState<ShortcutType[]>([])

    const registerShortcutKeys = useRef(new Set<string>())
    const actionMap = useRef({} as Record<string, (e: KeyboardEvent) => void>)

    useEffect(() => {
      const globalHandler = (event: KeyboardEvent) => {
        let key = event.key
        if (typeof key == 'undefined') {
          return
        }
        if (isModifierKey(key)) {
          return
        }

        const isShiftHold = event.shiftKey

        const isAltHold = event.altKey
        const isCtrlHold = event.ctrlKey
        const isMetaHold = event.metaKey

        const modifierJoint = [
          isShiftHold && 'Shift',
          isAltHold && 'Alt',
          isCtrlHold && 'Control',
          isMetaHold && 'Meta',
        ]
          .filter(Boolean)
          .sort()
          .join('+')

        key = key.length == 1 ? key.toUpperCase() : key

        const concatKey = `${modifierJoint ? `${modifierJoint}+` : ''}${key}`

        // console.log(concatKey, registerShortcutKeys.current)

        if (registerShortcutKeys.current.has(concatKey)) {
          const action = actionMap.current[concatKey]
          action?.(event)
        }
      }

      window.addEventListener('keydown', globalHandler)
      return () => {
        window.removeEventListener('keydown', globalHandler)
      }
    }, [])

    const registerShortcut: RegisterShortcutType = useCallback(
      (key, modifierFlags, action, discoverabilityTitle) => {
        const uniqueModifierFlags = uniqueArray(modifierFlags).filter(Boolean)

        const jointKey = `${
          uniqueModifierFlags.length
            ? `${uniqueModifierFlags.sort().join('+')}+`
            : ''
        }${key}`
        setShortcuts((shortcuts) => {
          if (registerShortcutKeys.current.has(jointKey)) {
            return shortcuts
          }

          registerShortcutKeys.current.add(jointKey)
          actionMap.current[jointKey] = action

          return [
            ...shortcuts,
            {
              keys: [
                ...uniqueModifierFlags.map(
                  // @ts-ignore
                  (modifier) => macosMetaKeyCharMap[modifier],
                ),
                // @ts-ignore
                otherKeyCharMap[key] ?? key.toUpperCase(),
              ],
              title: discoverabilityTitle,
              jointKey,
            },
          ]
        })

        return () => {
          if (!registerShortcutKeys.current.has(jointKey)) {
            return
          }
          setShortcuts((shortcuts) => {
            registerShortcutKeys.current.delete(jointKey)
            delete actionMap.current[jointKey]
            return shortcuts.filter(
              (shortcut) => shortcut.jointKey !== jointKey,
            )
          })
        }
      },
      [],
    )

    return (
      <ShortcutContext.Provider
        value={{ shortcuts, registerShortcut, options: options ?? {} }}
      >
        {props.children}

        <GuidePanelAnimated />
      </ShortcutContext.Provider>
    )
  },
)
