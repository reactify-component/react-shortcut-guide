import React, { FC, memo, useContext, useEffect, useRef, useState } from 'react'

import { useMediaColor } from '~/hooks/use-media-color'
import { useShortcutList } from '~/hooks/use-shortcut-list'
import { ShortcutType } from '~/types'
import { chunk, chunkTwo } from '~/utils/chunk'
import { clsx } from '~/utils/clsx'
import { injectCSS } from '~/utils/css'
import { debounce } from '~/utils/debounce'

import { ShortcutContext } from '..'
import styles from './Guide.module.css'

export const GuidePanel: FC<{ className?: string }> = memo((props) => {
  const { className } = props
  const shortcuts = useShortcutList()

  const { options } = useContext(ShortcutContext)
  const {
    darkClassName = 'body.dark',
    darkMode = 'media',
    maxItemEveryPage = 12,
  } = options

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

  const $scrollRef = useRef<HTMLDivElement>(null)
  const len = shortcuts.length

  const totalPage =
    len <= maxItemEveryPage ? 1 : Math.ceil(len / maxItemEveryPage)
  const [currentPage, setCurrentPage] = useState(0)
  useEffect(() => {
    if (totalPage < 2) {
      return
    }

    if (!$scrollRef.current) {
      return
    }
    const $scroll = $scrollRef.current
    const pageWidth = $scroll.scrollWidth / totalPage
    const handler = () => {
      const currentX = $scroll.scrollLeft

      setCurrentPage(Math.ceil(currentX / pageWidth))
    }

    $scroll.onscroll = debounce(handler, 16)

    handler()

    return () => {
      $scroll.onscroll = null
    }
  }, [totalPage])

  if (!len) {
    return null
  }

  const splitShortcutsIntoTwoParts = chunk(shortcuts, maxItemEveryPage).map(
    (chunk) => chunkTwo(chunk),
  )

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
      <div
        className={clsx(styles['panel'], 'rsg-panel-inner')}
        ref={$scrollRef}
        style={{
          width: `calc(${100 * totalPage}% + ${
            totalPage - 1
          } * var(--rsg-pad) - var(--rsg-pad) * 2 * ${totalPage - 1})`,
        }}
      >
        {splitShortcutsIntoTwoParts.map(([left, right], i) => {
          return (
            <div key={i} className={styles['slide']} id={`rsg-panel-${i}`}>
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
          )
        })}
        <Indicator total={totalPage} current={currentPage} />
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

const Indicator: FC<{ total: number; current: number }> = memo((props) => {
  const { total, current } = props
  if (total < 2) {
    return null
  }
  return (
    <div className={clsx(styles['indicator'], 'rsg-indicator')}>
      {Array.from({ length: props.total }).map((_, i) => (
        <a
          key={i}
          href={`#rsg-panel-${i}`}
          className={clsx(
            styles['indicator-ball'],
            'rsg-indicator-ball',
            current == i && styles['active'],
          )}
        />
      ))}
    </div>
  )
})
