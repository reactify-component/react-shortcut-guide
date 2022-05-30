import { Modifier } from '..'
import { Key } from './key'

export type ShortcutType = {
  title: string
  keys: string[]
  jointKey: string
}

export type RegisterShortcutType = (
  key: Key,
  modifierFlags: Modifier[],
  action: (e: KeyboardEvent) => any,
  discoverabilityTitle: string,
) => CleanupFn

export type CleanupFn = () => void
