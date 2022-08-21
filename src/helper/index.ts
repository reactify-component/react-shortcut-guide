import { RegisterShortcutType } from '~/types'

class GuideStatic {
  private _registerShortcut: RegisterShortcutType | null = null
  setRegister(fn: RegisterShortcutType | null) {
    this._registerShortcut = fn
  }

  public get registerShortcut() {
    return this._registerShortcut ?? (() => () => void 0)
  }
}

export const Guide = new GuideStatic()
