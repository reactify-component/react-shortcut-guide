import { Modifier } from '..'

export type ShortcutType = {
  title: string
  keys: string[]
}

export type RegisterShortcutType = (
  key: string,
  modifierFlags: Modifier[],
  action: () => any,
  discoverabilityTitle: string,
) => any
