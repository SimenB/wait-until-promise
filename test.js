/* eslint-env mocha */

import assert from 'assert'
import sinon from 'sinon'

import waitUntilPromise, { setPromiseImplementation } from './waitUntilPromise'

describe('wait-until-promise', () => {
  beforeEach(() => {
    setPromiseImplementation(Promise)
  })

  it('resolve if function returns true', () => {
    return waitUntilPromise(() => true)
  })

  it('resolve with the return value', () => {
    return waitUntilPromise(() => 'this is a truthy value')
      .then((returnValue) => assert.equal(returnValue, 'this is a truthy value'))
  })

  it('reject if function returns false', (done) => {
    waitUntilPromise(() => false)
      .then(() => done(new Error('it should reject')))
      .catch((err) => {
        assert.equal(err, 'Wait until promise timed out')

        done()
      })
  })

  it('should allow setting custom Promise implementation', () => {
    const spy = sinon.spy()

    setPromiseImplementation(spy)
    waitUntilPromise()

    assert.ok(spy.calledWithNew)
  })

  it('should allow setting custom maxWait', () => {
    let count = 0
    sinon.spy(global, 'setTimeout')
    sinon.spy(global, 'setInterval')

    return waitUntilPromise(() => count++ > 0, 32)
      .then(() => {
        assert.ok(global.setTimeout.calledOnce)
        assert.ok(global.setInterval.calledOnce)

        assert.equal(global.setTimeout.getCall(0).args[1], 32)
      })
      .then(() => {
        global.setTimeout.restore()
        global.setInterval.restore()
      })
  })

  it('should allow setting custom checkDelay', () => {
    let count = 0
    sinon.spy(global, 'setTimeout')
    sinon.spy(global, 'setInterval')

    return waitUntilPromise(() => count++ > 0, undefined, 32)
      .then(() => {
        assert.ok(global.setTimeout.calledOnce)
        assert.ok(global.setInterval.calledOnce)

        assert.equal(global.setInterval.getCall(0).args[1], 32)
      })
      .then(() => {
        global.setTimeout.restore()
        global.setInterval.restore()
      })
  })

  it('should reject with the exception if the functions throws', (done) => {
    waitUntilPromise(() => ({}).someFunction())
      .then(() => done(new Error('it should reject')))
      .catch((err) => {
        assert.ok(/is not a function/.test(err.message))

        done()
      })
  })

  it('should not call setTimeout or setInterval if function immediately returns truthy', () => {
    sinon.spy(global, 'setTimeout')
    sinon.spy(global, 'setInterval')

    return waitUntilPromise(() => true)
      .then(() => {
        sinon.assert.notCalled(global.setTimeout)
        sinon.assert.notCalled(global.setInterval)
      })
      .then(() => {
        global.setTimeout.restore()
        global.setInterval.restore()
      })
  })

  it('should call setTimeout or setInterval once if function returns truthy', () => {
    let count = 0
    sinon.spy(global, 'setTimeout')
    sinon.spy(global, 'setInterval')

    return waitUntilPromise(() => count++ > 0)
      .then(() => {
        sinon.assert.callCount(global.setTimeout, 1)
        sinon.assert.callCount(global.setInterval, 1)
      })
      .then(() => {
        global.setTimeout.restore()
        global.setInterval.restore()
      })
  })

  it('should reject in timer if function throws', (done) => {
    let count = 0

    return waitUntilPromise(() => {
      if (count++ === 0) return false;

      ({}).someFunction()
    })
      .then(() => done(new Error('it should reject')))
      .catch((err) => {
        assert.ok(/is not a function/.test(err.message))

        done()
      })
  })
})
