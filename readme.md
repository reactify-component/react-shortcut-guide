# React Shortcut Guide

Status: Alpha

Long-press command or press `?` to present a shortcut guide for your Web application.

Gzip+minify < 3kB

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

import { ShortcutProvider } from 'react-shortcut-guide'

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
import { useShortcut } from 'react-shortcut-guide'

useShortcut(
  'A',
  [Modifier.Meta],
  (e) => {
    console.log('a')
  },
  'Print A',
)
```

## Size

```
react-shortcut-guide v0.1.0

┌──────────────────┬──────────┐
│ export           │ min+gzip │
│                  │          │
│ useShortcut      │  2.54 kB │
│ GuidePanel       │   2.5 kB │
│ Modifier         │   2.5 kB │
│ ShortcutContext  │   2.5 kB │
│ useShortcutList  │   2.5 kB │
│ useMediaColor    │   2.5 kB │
│ ShortcutProvider │   2.5 kB │
```

## Reference

- [ShortcutGuide](https://github.com/Lessica/ShortcutGuide)
- [How to use UIKeyCommand to add keyboard shortcuts](https://www.hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts)

## TODO

- [ ] 分页
