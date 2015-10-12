/* eslint-env mocha */

import assert from 'assert'

import waitUntilPromise, { setPromiseImplementation } from './waitUntilPromise'

describe('wait-until-promise', () => {
  beforeEach(() => {
    setPromiseImplementation(Promise)
  })

  it('resolve if function returns true', (done) => {
    waitUntilPromise(() => true)
      .then(() => done())
  })

  it('reject if function returns false', (done) => {
    waitUntilPromise(() => false)
      .catch(() => done())
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

        assert(timeTaken < 15, 'should time out in less than 15 ms')

        done()
      })
  })

  it('should reject if checkInterval is larger than timeout', (done) => {
    waitUntilPromise(() => true, 10, 15)
      .catch(() => done())
  })
})
