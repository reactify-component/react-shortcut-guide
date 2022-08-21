import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { macosMetaKeyCharMap, otherKeyCharMap } from '~/constants/key-map'
import { Modifier } from '~/enums/modifier'
import { Guide } from '~/helper'
import { RegisterShortcutType, ShortcutType } from '~/types'
import { checkIsPressInInputEl } from '~/utils/input'
import { merge } from '~/utils/merge'
import { uniqueArray } from '~/utils/tool'

import { ShortcutContext, ShortcutOptions } from '..'
import { GuidePanelAnimated } from './GuidePanelAnimated'

const modifiers = Object.keys(Modifier)
const isModifierKey = (key: string) => !!-~modifiers.indexOf(key)

export const ShortcutProvider: FC<{ options?: ShortcutOptions }> = memo(
  (props) => {
    const { options } = props
    const [currentOptions, setCurrentOptions] =
      useState<null | Partial<ShortcutOptions>>(null)
    const [shortcuts, setShortcuts] = React.useState<ShortcutType[]>([])

    const actionMap = useRef(
      new Map() as Map<string, (e: KeyboardEvent) => any>,
    )

    const action2ShortcutWeakMap = useRef(
      new WeakMap<(e: KeyboardEvent) => any, ShortcutType>(),
    )

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

        if (actionMap.current.has(concatKey)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const action = actionMap.current.get(concatKey)!

          const shortcut = action2ShortcutWeakMap.current.get(action)

          if (shortcut?.preventInput) {
            if (checkIsPressInInputEl()) {
              return
            }
          }

          action?.(event)
        }
      }

      window.addEventListener('keydown', globalHandler)
      return () => {
        window.removeEventListener('keydown', globalHandler)
      }
    }, [])

    const registerShortcut: RegisterShortcutType = useCallback(
      (key, modifierFlags, action, discoverabilityTitle, options) => {
        const { hiddenInPanel = false, preventInput = true } = options || {}

        const uniqueModifierFlags = uniqueArray(modifierFlags).filter(Boolean)

        const jointKey = `${
          uniqueModifierFlags.length
            ? `${uniqueModifierFlags.sort().join('+')}+`
            : ''
        }${key}`
        setShortcuts((shortcuts) => {
          if (actionMap.current.has(jointKey)) {
            return shortcuts
          }

          actionMap.current.set(jointKey, action)
          const newShortcut = {
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
            hiddenInPanel,
            action,
            preventInput,
          }
          action2ShortcutWeakMap.current.set(action, newShortcut)

          return [...shortcuts, newShortcut]
        })

        return () => {
          if (!actionMap.current.has(jointKey)) {
            return
          }
          setShortcuts((shortcuts) => {
            actionMap.current.delete(jointKey)
            return shortcuts.filter(
              (shortcut) => shortcut.jointKey !== jointKey,
            )
          })
        }
      },
      [],
    )

    useEffect(() => {
      Guide.setRegister(registerShortcut)

      return () => {
        Guide.setRegister(null)
      }
    }, [registerShortcut])

    return (
      <ShortcutContext.Provider
        value={useMemo(
          () => ({
            shortcuts,
            registerShortcut,
            options: merge(options, currentOptions) ?? {},
            setOptions: setCurrentOptions,
          }),
          [currentOptions, options, registerShortcut, shortcuts],
        )}
      >
        <GuidePanelAnimated />
      </ShortcutContext.Provider>
    )
  },
)
