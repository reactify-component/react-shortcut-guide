import { Modifier } from '..'
import { Key } from './key'

export type ShortcutType = {
  title: string
  keys: string[]
  jointKey: string
  action: (e: KeyboardEvent) => any
} & Required<RegisterShortcutOptions>

export type RegisterShortcutOptions = {
  /**
   * 在输入框上禁用快捷键
   * @default true
   */
  preventInput?: boolean
  /**
   * 不在 Guide 上显示这个快捷键指令
   * @default false
   */
  hiddenInPanel?: boolean
}

export type RegisterShortcutType = (
  key: Key,
  modifierFlags: Modifier[],
  action: (e: KeyboardEvent) => any,
  discoverabilityTitle: string,
  options?: RegisterShortcutOptions,
) => CleanupFn

export type CleanupFn = () => void
