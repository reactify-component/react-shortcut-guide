import { useEffect, useRef } from 'react'

import { Guide } from '~/helper'
import { CleanupFn, RegisterShortcutType } from '~/types'

export const useShortcut: (
  ...rest: Parameters<RegisterShortcutType>
) => CleanupFn = (...rest) => {
  const cleanupRef = useRef<() => void>()
  useEffect(() => {
    const cleanup = Guide.registerShortcut(...rest)
    cleanupRef.current = cleanup
    return cleanup
  }, [rest])

  return () => cleanupRef.current?.()
}
