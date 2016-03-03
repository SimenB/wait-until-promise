let PromiseImplementation = Promise

function clearTimers (timeout, interval) {
  clearTimeout(timeout)
  clearInterval(interval)
}

export const setPromiseImplementation = (implementation) => {
  PromiseImplementation = implementation
}

export default function (escapeFunction, maxWait = 50, checkDelay = 1) {
  return new PromiseImplementation((resolve, reject) => {
    let maxWaitTimeout

    const interval = setInterval(() => {
      try {
        const escapeFunctionRes = escapeFunction()

        if (escapeFunctionRes) {
          clearTimers(maxWaitTimeout, interval)

          resolve(escapeFunctionRes)
        }
      } catch (e) {
        clearTimers(maxWaitTimeout, interval)

        reject(e)
      }
    }, checkDelay)

    maxWaitTimeout = setTimeout(() => {
      clearTimers(maxWaitTimeout, interval)

      reject('Wait until promise timed out')
    }, maxWait)
  })
}
