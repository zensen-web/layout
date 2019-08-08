import sinon from 'sinon'

import { expect } from '@open-wc/testing'

import {
  EVENT_LAYOUT_CHANGE,
  setBreakpoints,
  getState,
  unsubscribe,
} from '../src'

const LAYOUT_DESKTOP = 'desktop'
const LAYOUT_TABLET = 'tablet'
const LAYOUT_MOBILE = 'mobile'

function resize (width) {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'));
}

describe('index', () => {
  const layoutChangeStub = sinon.stub()

  beforeEach(() => {
    resize(800)
    window.addEventListener(EVENT_LAYOUT_CHANGE, layoutChangeStub)

    setBreakpoints({
      [LAYOUT_DESKTOP]: 800,
      [LAYOUT_TABLET]: 640,
    }, LAYOUT_MOBILE)
  })

  afterEach(() => {
    unsubscribe()
    layoutChangeStub.resetHistory()
  })

  it('is in desktop layout',
    () => expect(getState().layout).to.eq(LAYOUT_DESKTOP));

  it('invokes callback on initialization',
    () => expect(layoutChangeStub.calledOnce).to.be.true)

  context('when unsubscribed', () => {
    beforeEach(() => {
      unsubscribe()
    })

    it('resets the state', () => expect(getState()).to.eql({
      listening: false,
      layout: '',
      smallestIdentifier: '',
      breakpoints: [],
    }))
  })

  context('when resizing to tablet', () => {
    beforeEach(() => {
      resize(799)
    })

    it('is in tablet layout',
      () => expect(getState().layout).to.eq(LAYOUT_TABLET))

    it('invokes callback',
      () => expect(layoutChangeStub.calledTwice).to.be.true)
  })

  context('when resizing to smallest (smallest)', () => {
    beforeEach(() => {
      resize(639)
    })

    it('is in mobile layout',
      () => expect(getState().layout).to.eq(LAYOUT_MOBILE))

    it('invokes callback',
      () => expect(layoutChangeStub.calledTwice).to.be.true)
  })
})
