let PromiseImplementation;

try {
  PromiseImplementation = Promise;
} catch (err) {
  // ignored
}

/**
 * Clears the specified timeout and interval.
 *
 * @param {number} timeout - Id if the timeout to clear.
 * @param {number} interval - Id of the interval to clear.
 * @private
 */
function clearTimers(timeout, interval) {
  clearTimeout(timeout);
  clearInterval(interval);
}

/**
 * Set a custom {@link Promise} implementation.
 *
 * @param {Function} implementation - A promise implementation to use instead of native {@link Promise}.
 * @static
 */
export const setPromiseImplementation = implementation => {
  PromiseImplementation = implementation;
};

/**
 * Create a {@link Promise} that resolves if the given escapeFunction returns a truthy value, and rejects if it throws
 * or does not return truthy within the given maxWait.
 *
 * @param {Function} escapeFunction - The function called every checkDelay, and the result of which is the resolved
 * value of the promise.
 * @param {number} maxWait - The time to wait before rejecting the promise.
 * @param {number} checkDelay - The time to wait before each invocation of {escapeFunction}.
 * @returns {Promise} A promise resolved with the value of escapeFunction, or rejected with the exception thrown by it
 * or it times out.
 */
export default (escapeFunction, maxWait = 50, checkDelay = 1) => {
  if (PromiseImplementation == null) {
    throw new Error('Wait Until Promise: No global Promise available, make sure to use `setPromiseImplementation`.');
  }

  // Run the function once without setting up any listeners in case it's already true
  try {
    const escapeFunctionRes = escapeFunction();

    if (escapeFunctionRes) return PromiseImplementation.resolve(escapeFunctionRes);
  } catch (e) {
    return PromiseImplementation.reject(e);
  }

  return new PromiseImplementation((resolve, reject) => {
    let maxWaitTimeout;

    const interval = setInterval(() => {
      try {
        const escapeFunctionRes = escapeFunction();

        if (escapeFunctionRes) {
          clearTimers(maxWaitTimeout, interval);

          resolve(escapeFunctionRes);
        }
      } catch (e) {
        clearTimers(maxWaitTimeout, interval);

        reject(e);
      }
    }, checkDelay);

    maxWaitTimeout = setTimeout(() => {
      clearTimers(maxWaitTimeout, interval);

      // Try to reject with a TimeoutError, like Bluebird has
      if (PromiseImplementation.TimeoutError) {
        reject(new PromiseImplementation.TimeoutError('Wait until promise timed out'));
      } else {
        reject(new Error('Wait until promise timed out'));
      }
    }, maxWait);
  });
};
