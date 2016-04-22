let PromiseImplementation

try {
  PromiseImplementation = Promise
} catch (err) {
}

function clearTimers (timeout, interval) {
  clearTimeout(timeout)
  clearInterval(interval)
}

export const setPromiseImplementation = implementation => {
  PromiseImplementation = implementation
}

export default (escapeFunction, maxWait = 50, checkDelay = 1) => {
  if (PromiseImplementation == null) {
    throw new Error('Wait Until Promise: No global Promise available, make sure to use `setPromiseImplementation`.')
  }

  // Run the function once without setting up any listeners in case it's already true
  try {
    const escapeFunctionRes = escapeFunction()

    if (escapeFunctionRes) return PromiseImplementation.resolve(escapeFunctionRes)
  } catch (e) {
    return PromiseImplementation.reject(e)
  }

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

      reject(new Error('Wait until promise timed out'))
    }, maxWait)
  })
}
