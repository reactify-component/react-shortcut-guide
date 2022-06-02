import React, { useEffect } from 'react'

export const useStateToRef = <T>(state: T) => {
  const ref = React.useRef<T>(state)
  useEffect(() => {
    ref.current = state
  }, [state])

  return ref
}
