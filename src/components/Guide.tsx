import React, { FC, memo } from 'react'

import { useShortcutList } from '~/hooks/use-shortcut-list'
import { ShortcutType } from '~/types'
import { clsx } from '~/utils/clsx'

import styles from './Guide.module.css'

export const GuidePanel: FC = memo(() => {
  const shortcuts = useShortcutList()

  if (!shortcuts.length) {
    return null
  }
  return (
    <div className={clsx(styles['root'], styles['container'])}>
      <div className={styles['panel']}>
        {shortcuts.map((shortcut, i) => {
          return (
            <ShortcutItem
              {...shortcut}
              key={shortcut.keys.join('+')}
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
