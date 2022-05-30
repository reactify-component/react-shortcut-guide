import { Modifier } from '~/enums/modifier'
import { SpecialKey } from '~/types/key'

export const macosMetaKeyCharMap: Record<keyof typeof Modifier, string> = {
  Meta: '⌘',
  Command: '⌘',
  None: '',
  Option: '⌥',

  Alt: '⌥',
  Control: '⌃',
  Shift: '⇧',
}

export const otherKeyCharMap: Record<SpecialKey, string> = {
  Enter: '↩',
  Tab: '⇥',
  Backspace: '⌫',
  Escape: '⎋',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
  Delete: '⌦',
  Home: '⇱',
  End: '⇲',
  PageUp: '⇞',
  PageDown: '⇟',
  Insert: '⌤',
  Space: '␣',
}
