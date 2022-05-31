import { useEffect, useState } from 'react'

export const useMediaColor = () => {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const mediaList = window.matchMedia('(prefers-color-scheme: dark)')
    const isDark = mediaList.matches
    setDark(isDark)
    const handler = (e: MediaQueryListEvent) => {
      setDark(e.matches)
    }
    mediaList.addEventListener('change', handler)
    return () => {
      mediaList.removeEventListener('change', handler)
    }
  }, [])

  return { dark }
}
