import React, { FC, memo, useContext, useEffect } from 'react'

import { useMediaColor } from '~/hooks/use-media-color'
import { useShortcutList } from '~/hooks/use-shortcut-list'
import { ShortcutType } from '~/types'
import { chunkTwo } from '~/utils/chunk'
import { clsx } from '~/utils/clsx'
import { injectCSS } from '~/utils/css'

import { ShortcutContext } from '..'
import styles from './Guide.module.css'

export const GuidePanel: FC<{ className?: string }> = memo((props) => {
  const { className } = props
  const shortcuts = useShortcutList()

  const { options } = useContext(ShortcutContext)
  const { darkClassName = 'body.dark', darkMode = 'media' } = options

  const { dark: isDark } = useMediaColor()
  useEffect(() => {
    if (darkMode === 'class') {
      const triggerClassName = darkClassName
      return injectCSS(`
        ${triggerClassName} .${styles.root} {
          --rsg-bg: rgba(29, 29, 31, 0.72) !important;
          --rsg-text-color: #e6e6e6 !important;
        }
      `)
    }
  }, [darkClassName, darkMode])

  useEffect(() => {
    let cleanup: any
    requestAnimationFrame(() => {
      cleanup = injectCSS(
        `.${styles.root} { transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out; }`,
      )
    })

    return () => {
      cleanup && cleanup()
    }
  }, [])

  if (!shortcuts.length) {
    return null
  }
  const splitShortcutsIntoTwoParts = chunkTwo(shortcuts)

  console.log(splitShortcutsIntoTwoParts)

  const [left, right] = splitShortcutsIntoTwoParts
  return (
    <div
      className={clsx(
        styles['root'],
        styles['container'],
        isDark && darkMode === 'media' && styles['dark'],
        'rsg-panel',
        className,
      )}
    >
      <div className={clsx(styles['panel'], 'rsg-panel-inner')}>
        <div className={styles['left']}>
          {left.map((shortcut, i) => (
            <ShortcutItem
              {...shortcut}
              key={shortcut.jointKey}
              isEnd={i == left.length - 1}
            />
          ))}
        </div>
        <div className={styles['right']}>
          {right.map((shortcut, i) => (
            <ShortcutItem
              {...shortcut}
              key={shortcut.jointKey}
              isEnd={i == right.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

const ShortcutItem: FC<ShortcutType & { isEnd?: boolean }> = memo((props) => {
  const { keys, title, isEnd } = props

  return (
    <div
      className={clsx(styles['shortcut-item'], 'rsg-shortcut-item')}
      style={isEnd ? { marginBottom: 0 } : undefined}
    >
      <span className={clsx(styles['title'], 'rsg-item-title')}>{title}</span>
      <span className={clsx(styles['keys'], 'rsg-item-keys')}>
        {keys.map((key) => (
          <span key={key} className={clsx(styles['key'], 'rsg-item-key')}>
            {key}
          </span>
        ))}
      </span>
    </div>
  )
})
