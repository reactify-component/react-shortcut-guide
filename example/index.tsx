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
        onGuidePanelOpen() {
          console.log('open')
        },
        debug: true,
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

  useShortcut(
    'P',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Search')
    },
    'Hidden',
    {
      preventInput: false,
    },
  )

  useShortcut(
    'X',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Search')
    },
    'Hidaden',
    {
      preventInput: false,
    },
  )
  useShortcut(
    'B',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Search')
    },
    'Hiddzen',
    {
      preventInput: false,
    },
  )
  useShortcut(
    'T',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Test')
    },
    'Test',
    {
      preventInput: false,
    },
  )

  useShortcut(
    '[',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Test')
    },
    'Test',
    {
      preventInput: false,
    },
  )

  useShortcut(
    ']',
    [Modifier.Command],
    (e) => {
      e.preventDefault()
      alert('Test')
    },
    'Test',
    {
      preventInput: false,
    },
  )

  return (
    <div>
      <p>Long press ⌘, or press ? to open the guide.</p>
      <button onClick={cleanup}>Cleanup D Shortcut</button>
      <OOOOOOOOO />
    </div>
  )
}
