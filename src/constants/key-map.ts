import { Modifier } from '~/enums/modifier'
import { SpecialKey } from '~/types/key'

export const macosMetaKeyCharMap: Record<Modifier, string> = {
  Meta: '⌘',
  Alt: '⌥',
  Control: '⌃',
  Shift: '⇧',
  None: '',
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
