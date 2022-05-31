# React Shortcut Guide

Status: Alpha

Long-press command or press `?` to present a shortcut guide for your Web application.

![](https://fastly.jsdelivr.net/gh/Innei/fancy@master/2022/0530221552.png)

## Install

```bash
npm i react-shortcut-guide
```

## Usage

1. Wrap `ShortcutProvide` on root App component.

```tsx
import React from 'react'
import { render } from 'react-dom'

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
```

2. Register a shortcut by hook.

```ts
import { useShortcut } from '~/components/Provider'

useShortcut(
  'A',
  [Modifier.Meta],
  (e) => {
    console.log('a')
  },
  'Print A',
)
```

## Reference

- [ShortcutGuide](https://github.com/Lessica/ShortcutGuide)
- [How to use UIKeyCommand to add keyboard shortcuts](https://www.hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts)

## TODO

- [ ] 分页
