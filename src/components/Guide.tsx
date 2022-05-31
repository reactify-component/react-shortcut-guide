import React, { FC, memo, useContext, useEffect } from 'react'

import { useMediaColor } from '~/hooks/use-media-color'
import { useShortcutList } from '~/hooks/use-shortcut-list'
import { ShortcutType } from '~/types'
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

  if (!shortcuts.length) {
    return null
  }
  return (
    <div
      className={clsx(
        styles['root'],
        styles['container'],
        isDark && darkMode === 'media' && styles['dark'],
        className,
      )}
    >
      <div className={styles['panel']}>
        {shortcuts.map((shortcut, i) => {
          return (
            <ShortcutItem
              {...shortcut}
              key={shortcut.jointKey}
              index={i}
              total={shortcuts.length}
            />
          )
        })}
      </div>
    </div>
  )
})

const ShortcutItem: FC<ShortcutType & { index: number; total: number }> = memo(
  (props) => {
    const { keys, title, index, total } = props
    const isHalfEndOfColumns =
      total % 2 == 0 ? [total >> 1, total] : [(total + 1) >> 1, null]
    return (
      <div
        className={styles['shortcut-item']}
        style={
          isHalfEndOfColumns.includes(index + 1)
            ? { marginBottom: 0 }
            : undefined
        }
      >
        <span className={styles['title']}>{title}</span>
        <span className={styles['keys']}>
          {keys.map((key) => (
            <span key={key} className={styles['key']}>
              {key}
            </span>
          ))}
        </span>
      </div>
    )
  },
)
