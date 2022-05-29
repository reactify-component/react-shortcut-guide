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
        {shortcuts.map((shortcut) => {
          return <ShortcutItem {...shortcut} key={shortcut.title} />
        })}
      </div>
    </div>
  )
})
const ShortcutItem: FC<ShortcutType> = memo((props) => {
  const { keys, title } = props
  return (
    <div className={styles['shortcut-item']}>
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
})
