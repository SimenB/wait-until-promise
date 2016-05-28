# API

## setPromiseImplementation

[waitUntilPromise.js:26-28](https://github.com/SimenB/wait-until-promise/blob/4ce94bb2434fd5633d77a4f754b510e98e01939a/waitUntilPromise.js#L26-L28 "Source code on GitHub")

Set a custom [Promise](Promise) implementation.

**Parameters**

-   `implementation` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** A promise implementation to use instead of native [Promise](Promise).

## waitUntilPromise

[waitUntilPromise.js:41-85](https://github.com/SimenB/wait-until-promise/blob/4ce94bb2434fd5633d77a4f754b510e98e01939a/waitUntilPromise.js#L41-L85 "Source code on GitHub")

Create a [Promise](Promise) that resolves if the given escapeFunction returns a truthy value, and rejects if it throws
or does not return truthy within the given maxWait.

**Parameters**

-   `escapeFunction` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The function called every checkDelay, and the result of which is the resolved
    value of the promise.
-   `maxWait` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** The time to wait before rejecting the promise. (optional, default `50`)
-   `checkDelay` **\[[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)]** The time to wait before each invocation of {escapeFunction}. (optional, default `1`)

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** A promise resolved with the value of escapeFunction, or rejected with the exception thrown by it
or it times out.
