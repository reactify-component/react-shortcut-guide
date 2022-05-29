import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { Modifier, useShortcut } from '~'

import { ShortcutProvider } from '~/components/Provider'

render(<App />, document.getElementById('app'))

function App() {
  return (
    <ShortcutProvider>
      <Comp />
    </ShortcutProvider>
  )
}

function Comp() {
  const { registerShortcut } = useShortcut()

  useEffect(() => {
    registerShortcut(
      'a',
      [Modifier.Meta],
      () => {
        console.log('a')
      },
      '将画布向上滚动',
    )

    registerShortcut(
      '1',
      [Modifier.Meta],
      () => {
        console.log('a')
      },
      '将画布向上滚动',
    )
    registerShortcut(
      'c',
      [Modifier.Meta],
      () => {
        console.log('a')
      },
      '将画布向上滚动',
    )

    registerShortcut(
      'x',
      [Modifier.Meta],
      () => {
        console.log('a')
      },
      '将画布向上滚动',
    )

    registerShortcut(
      'a',
      [Modifier.Meta],
      () => {
        console.log('a')
      },
      '将画布向上滚动',
    )
  }, [])

  return <div> 1</div>
}
