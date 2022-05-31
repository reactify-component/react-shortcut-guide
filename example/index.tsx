import React from 'react'
import { render } from 'react-dom'
import { OOOOOOOOO } from 'test'
import { Modifier, useShortcut } from '~'

import { ShortcutProvider } from '~/components/Provider'

render(<App />, document.getElementById('app'))

function App() {
  return (
    <ShortcutProvider
      options={{
        darkMode: 'media',
      }}
    >
      <Comp />
    </ShortcutProvider>
  )
}

function Comp() {
  useShortcut(
    'A',
    [Modifier.Meta],
    () => {
      console.log('a')
    },
    'Print A',
  )

  useShortcut(
    'B',
    [Modifier.Control, Modifier.Meta, Modifier.Meta],
    () => {
      console.log('b')
    },
    'Print B',
  )

  useShortcut(
    'Escape',
    [Modifier.Control, Modifier.Meta, Modifier.Shift],
    () => {
      console.log('c')
    },
    'Print C',
  )

  const cleanup = useShortcut(
    'D',
    [Modifier.None],
    () => {
      console.log('d')
    },
    'Print D',
  )

  useShortcut(
    'O',
    [Modifier.Command, Modifier.Alt, Modifier.Shift],
    () => {
      console.log('d')
    },
    'Long Item Long Item Long Item Long Item Long Item',
  )

  useShortcut('?', [Modifier.None], () => {}, 'Open Guide')
  useShortcut(
    'K',
    [Modifier.Command],
    () => {
      alert('Search')
    },
    'Search',
  )

  return (
    <div onClick={cleanup}>
      Cleanup
      <OOOOOOOOO />
    </div>
  )
}
