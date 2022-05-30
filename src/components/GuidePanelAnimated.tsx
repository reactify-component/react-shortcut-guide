import debounce from 'lodash.debounce'
import React, { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { clsx } from '~/utils/clsx'

import { GuidePanel } from './Guide'
import styles from './GuidePanelAnimated.module.css'

export const GuidePanelAnimated = memo(() => {
  const [open, setOpen] = useState(false)

  const [animated, setAnimated] = useState<'in' | 'out'>('in')

  useEffect(() => {
    let disappearTimer = null as any

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?') {
        disappearTimer && (disappearTimer = clearTimeout(disappearTimer))
        setOpen((open) => {
          if (open) {
            setAnimated('out')
            return open
          } else {
            setAnimated('in')
            return !open
          }
        })
      }

      if (e.key === 'Escape') {
        setAnimated('out')
      }
    }

    const handleCommandKey = debounce(
      (e: KeyboardEvent) => {
        const key = e.key

        if (key == 'Meta' || key == 'Control') {
          setOpen(true)
          setAnimated('in')
        }
      },
      1000,
      {
        leading: false,
      },
    )

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key == 'Meta' || e.key == 'Controll') {
        disappearTimer = setTimeout(() => {
          setAnimated('out')
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleCommandKey)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleCommandKey)
      window.removeEventListener('keyup', handleKeyUp)

      clearTimeout(disappearTimer)
    }
  }, [])

  const [panelWrapperRef, setPanelWrapperRef] = useState<HTMLDivElement | null>(
    null,
  )

  useEffect(() => {
    if (!panelWrapperRef) {
      return
    }
    if (animated === 'in') {
      // panelWrapperRef.classList.add(styles.show)
    } else {
      panelWrapperRef.classList.add(styles.disappear)
    }

    panelWrapperRef.ontransitionend = () => {
      if (animated === 'out') {
        setOpen(false)
      }
    }

    return () => {
      panelWrapperRef.ontransitionend = null
    }
  }, [animated, panelWrapperRef])

  if (typeof window == 'undefined') {
    return null
  }

  return (
    <>
      {open &&
        createPortal(
          <div ref={setPanelWrapperRef} className={clsx(styles['panel'])}>
            <GuidePanel />
          </div>,
          document.body,
        )}
    </>
  )
})
