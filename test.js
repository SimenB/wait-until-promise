import test from 'ava'
import sinon from 'sinon'
import 'babel-register'

import waitUntilPromise, { setPromiseImplementation } from './waitUntilPromise'

test.beforeEach(() => {
  setPromiseImplementation(Promise)
})

test('resolve if function returns true', () => {
  return waitUntilPromise(() => true)
})

test('resolve with the return value', (t) => {
  return waitUntilPromise(() => 'this is a truthy value')
    .then((returnValue) => t.ok(returnValue, 'this is a truthy value'))
})

test('reject if function returns false', (t) => {
  t.plan(1)

  return waitUntilPromise(() => false)
    .catch((err) => {
      t.is(err, 'Wait until promise timed out')
    })
})

test('should allow setting custom Promise implementation', (t) => {
  const spy = sinon.spy()

  setPromiseImplementation(spy)
  waitUntilPromise()

  t.ok(spy.calledWithNew)
})

test.serial('should allow setting custom maxWait', (t) => {
  let count = 0
  sinon.spy(global, 'setTimeout')
  sinon.spy(global, 'setInterval')

  return waitUntilPromise(() => count++ > 0, 32)
    .then(() => {
      t.ok(global.setTimeout.calledOnce)
      t.ok(global.setInterval.calledOnce)

      t.is(global.setTimeout.getCall(0).args[1], 32)
    })
    .then(() => {
      global.setTimeout.restore()
      global.setInterval.restore()
    })
})

test.serial('should allow setting custom checkDelay', (t) => {
  let count = 0
  sinon.spy(global, 'setTimeout')
  sinon.spy(global, 'setInterval')

  return waitUntilPromise(() => count++ > 0, undefined, 32)
    .then(() => {
      t.ok(global.setTimeout.calledOnce)
      t.ok(global.setInterval.calledOnce)

      t.is(global.setInterval.getCall(0).args[1], 32)
    })
    .then(() => {
      global.setTimeout.restore()
      global.setInterval.restore()
    })
})

test('should reject with the exception if the functions throws', (t) => {
  t.plan(1)

  return waitUntilPromise(() => ({}).someFunction())
    .catch((err) => {
      t.ok(/is not a function/.test(err.message))
    })
})

test.serial('should not call setTimeout or setInterval if function immediately returns truthy', () => {
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

test.serial('should call setTimeout or setInterval once if function returns truthy', () => {
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

test('should reject in timer if function throws', (t) => {
  t.plan(1)
  let count = 0

  return waitUntilPromise(() => {
    if (count++ === 0) return false;

    ({}).someFunction()
  })
    .catch((err) => {
      t.ok(/is not a function/.test(err.message))
    })
})
