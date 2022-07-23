import React, { useContext } from 'react'
import { render } from 'react-dom'
import { Modifier, ShortcutContext, useShortcut, useShortcutOptions } from '~'

import {
  Button,
  CssBaseline,
  GeistProvider,
  Page,
  Spacer,
  Text,
  Tooltip,
} from '@geist-ui/core'

import { ShortcutProvider } from '~/components/Provider'

render(
  <GeistProvider>
    <CssBaseline />
    <Page>
      <App />
    </Page>
  </GeistProvider>,
  document.getElementById('app'),
)

function App() {
  return (
    <ShortcutProvider
      options={{
        darkMode: 'media',
        onGuidePanelOpen() {
          console.log('open')
        },
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

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()

  alphabet.split('').forEach((letter, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useShortcut(
      // @ts-ignore
      letter,
      [Modifier.Command, Modifier.Control],
      (e) => {
        e.preventDefault()
        alert(letter)
      },
      `${letter}`,
      {
        preventInput: false,
      },
    )
  })

  const { setOptions, options } = useShortcutOptions()
  return (
    <div>
      <Text h1>React Shortcut Guideline</Text>
      <Text>Long press ⌘, or press ? to open the guide.</Text>
      <Tooltip text="Controlled Panel">
        <Button
          style={{
            marginRight: '12px',
          }}
          type="default"
          shadow
          onClick={() => {
            setOptions({
              open: !options.open,
            })
          }}
        >
          {options.open ? 'Close' : 'Open'} Guide
        </Button>
      </Tooltip>

      <Button type="secondary" shadow onClick={cleanup}>
        Cleanup D Shortcut
      </Button>
    </div>
  )
}
