import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { clsx } from '~/utils/clsx'
import { debounce } from '~/utils/debounce'
import { checkIsPressInInputEl } from '~/utils/input'

import { ShortcutContext, useStateToRef } from '..'
import { GuidePanel } from './Guide'
import styles from './GuidePanelAnimated.module.css'

export const GuidePanelAnimated = memo(() => {
  const { options } = useContext(ShortcutContext)
  const {
    holdCommandTimeout = 1000,
    stayCommandTimeout = 1000,
    onGuidePanelClose,
    onGuidePanelOpen,
    open: controlledOpen,
  } = options || {}

  const currentControllerOpen = useRef<boolean | null>(null)

  const [open, setOpen] = useState(controlledOpen ? true : false)

  useEffect(() => {
    if (controlledOpen) {
      setOpen(true)
      setAnimated('in')
      currentControllerOpen.current = true
    } else {
      if (currentControllerOpen.current) {
        setAnimated('out')
        currentControllerOpen.current = null
      }
    }
  }, [controlledOpen])

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
    if (controlledOpen) {
      return
    }
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

    const handleCommandKey = debounce((e: KeyboardEvent) => {
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
    }, holdCommandTimeout)

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
  }, [holdCommandTimeout, stayCommandTimeout, controlledOpen])

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
