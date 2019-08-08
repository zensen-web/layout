let state = genState()

function genState () {
  return {
    listening: false,
    layout: '',
    smallestIdentifier: '',
    breakpoints: [],
  }
}

export const EVENT_LAYOUT_CHANGE = 'layoutchange'

export function getState () {
  return { ...state }
}

export function unsubscribe () {
  if (state.listening) {
    window.removeEventListener('resize', update)
    state = genState()
  }
}

export function setBreakpoints (breakpoints, smallestIdentifier) {
  state.smallestIdentifier = smallestIdentifier
  state.breakpoints = Object.keys(breakpoints)
    .map(value => ({
      identifier: value,
      value: breakpoints[value],
    }))
    .sort((a, b) => a.value - b.value)

  if (!state.listening) {
    window.addEventListener('resize', update)
    state.listening = true
  } else {
    console.warn('Already listening for window resizes')
  }

  update()
}

function update () {
  const width = window.innerWidth
  const prevLayout = state.layout
  const numBreakpoints = state.breakpoints.length
  const smallestLayout = state.breakpoints[numBreakpoints - 1]

  state.layout = smallestLayout.identifier
  state.breakpoints.some((item, index) => {
    const result = width < item.value
    if (result) {
      const prevIndex = index - 1
      state.layout =
        prevIndex >= 0
          ? state.breakpoints[prevIndex].identifier
          : state.smallestIdentifier
    }

    return result
  })

  if (state.layout !== prevLayout) {
    window.dispatchEvent(
      new CustomEvent(EVENT_LAYOUT_CHANGE, { detail: state.layout }),
    )
  }
}
