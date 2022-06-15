import debounce from 'lodash.debounce'
import React, { memo, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { clsx } from '~/utils/clsx'
import { checkIsPressInInputEl } from '~/utils/input'

import { ShortcutContext, useStateToRef } from '..'
import { GuidePanel } from './Guide'
import styles from './GuidePanelAnimated.module.css'

export const GuidePanelAnimated = memo(() => {
  const [open, setOpen] = useState(false)
  const { options } = useContext(ShortcutContext)
  const {
    holdCommandTimeout = 1000,
    stayCommandTimeout = 1000,
    onGuidePanelClose,
    onGuidePanelOpen,
  } = options || {}
  const [animated, setAnimated] = useState<'in' | 'out' | 'none'>('none')

  const openStatus = useStateToRef(open)

  useEffect(() => {
    if (open) {
      onGuidePanelOpen && onGuidePanelOpen()
    } else {
      onGuidePanelClose && onGuidePanelClose()
    }
  }, [onGuidePanelClose, onGuidePanelOpen, open])

  useEffect(() => {
    let disappearTimer = null as any

    let isHoldCommandKey = false

    const handleKeyDown = (e: KeyboardEvent) => {
      if (checkIsPressInInputEl()) {
        return
      }

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
        if (!document.hasFocus()) {
          return
        }

        const key = e.key

        if (key == 'Meta' || key == 'Control') {
          disappearTimer = clearTimeout(disappearTimer)
          setOpen(true)
          setAnimated('in')
          isHoldCommandKey = true
        }
      },
      holdCommandTimeout,
      {
        leading: false,
      },
    )

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isHoldCommandKey) {
        return
      }

      if (e.key == 'Meta' || e.key == 'Controll') {
        disappearTimer = setTimeout(() => {
          setAnimated('out')
          isHoldCommandKey = false
        }, stayCommandTimeout)
      }
    }

    const handleFocus = () => {
      if (openStatus.current) {
        disappearTimer = setTimeout(() => {
          setAnimated('out')
          isHoldCommandKey = false
        }, stayCommandTimeout)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleCommandKey)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleCommandKey)
      window.removeEventListener('keyup', handleKeyUp)

      clearTimeout(disappearTimer)
    }
  }, [holdCommandTimeout, stayCommandTimeout])

  const [panelWrapperRef, setPanelWrapperRef] = useState<HTMLDivElement | null>(
    null,
  )

  useEffect(() => {
    if (!panelWrapperRef) {
      return
    }

    if (animated == 'none') {
      return
    } else if (animated == 'out') {
      panelWrapperRef.classList.add(styles.disappear)
    }

    panelWrapperRef.ontransitionend = () => {
      if (animated === 'out') {
        setOpen(false)
        setAnimated('none')
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
          <div
            ref={setPanelWrapperRef}
            className={clsx(styles['panel'], 'rsg-panel-wrapper')}
          >
            <GuidePanel />
          </div>,
          document.body,
        )}
    </>
  )
})
