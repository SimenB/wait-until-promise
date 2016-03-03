/* eslint-env mocha */

import assert from 'assert'

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
      .catch((err) => {
        assert.equal(err, 'Wait until promise timed out')

        done()
      })
  })

  it('should allow setting custom Promise implementation', () => {
    let invocations = 0
    const spy = function () {
      invocations++
    }

    setPromiseImplementation(spy)
    waitUntilPromise()

    assert.equal(invocations, 1, 'should invoke constructor once')
  })

  it('should allow setting custom maxWait', (done) => {
    const start = new Date()

    waitUntilPromise(() => false, 10)
      .catch(() => {
        const timeTaken = new Date() - start

        assert.ok(timeTaken < 15, 'should time out in less than 15 ms')

        done()
      })
  })

  it('should reject with the exception if the functions throws', (done) => {
    waitUntilPromise(() => ({}).someFunction())
      .catch((err) => {
        assert.ok(/\.someFunction is not a function/.test(err.message))

        done()
      })
  })

  it('should reject if checkInterval is larger than timeout', (done) => {
    let count = 0

    // Skip escape hatch
    waitUntilPromise(() => count++ > 0, 10, 15)
      .catch(() => done())
  })
})
