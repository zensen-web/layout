# zensen/layout

A breakpoint-based responsive layout service.

## Install

Using `npm`:

```
$ npm install @zensen/layout
```

Using `yarn`:

```
$ yarn add @zensen/layout
```

## API

Setting Breakpoints

Breakpoints are defined by a set of key-value pairs. The key is the identifier of the breakpoint, and the size is how wide the window must be to be considered valid. The second parameter is the identifier for the smallest breakpoint (fallback).

```js
import { setBreakpoints } from 'layout'

setBreakpoints({
  desktop: 800,
  tablet: 640,
}, 'mobile')
```

Detecting Layout Changes

A custom window event is emitted from the window whenever layout changes occur. The event's detail is the current layout identifier.

```js
import { EVENT_LAYOUT_CHANGE, setBreakpoints } from 'layout'

setBreakpoints({
  desktop: 800,
  tablet: 640,
}, 'mobile')

window.addEventListener(EVENT_LAYOUT_CHANGE,
  e => console.log(e.detail))

window.innerWidth = 799 // console.log: 'tablet'
window.innerWidth = 639 // console.log: 'mobile'
```

Unsubscribing

The layout service can be unsubscribed from like so:

```js
import {
  EVENT_LAYOUT_CHANGE,
  setBreakpoints,
  unsubscribe,
} from 'layout'

setBreakpoints({
  desktop: 800,
  tablet: 640,
}, 'mobile')

window.addEventListener(EVENT_LAYOUT_CHANGE,
  e => console.log(e.detail))

window.innerWidth = 799 // triggers event
window.innerWidth = 639 // triggers event

unsubscribe()

window.innerWidth = 800 // does not trigger event

```
