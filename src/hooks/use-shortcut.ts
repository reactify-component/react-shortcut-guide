import { useContext, useEffect, useRef } from 'react'

import { RegisterShortcutType } from '~/types'

import { ShortcutContext } from '..'

export const useShortcut: (...rest: Parameters<RegisterShortcutType>) => any = (
  ...rest
) => {
  const { registerShortcut } = useContext(ShortcutContext)

  const cleanupRef = useRef<() => void>()
  useEffect(() => {
    const cleanup = registerShortcut(...rest)
    cleanupRef.current = cleanup
    return cleanup
  }, [])

  return cleanupRef.current
}
