/* eslint-env jest */

import sinon from 'sinon';
import BluebirdPromise from 'bluebird';
import waitUntilPromise, { setPromiseImplementation } from './waitUntilPromise';

beforeEach(() => {
  setPromiseImplementation(Promise);
});

test('resolve if function returns true', () => waitUntilPromise(() => true));

test('resolve with the return value', async () => {
  const result = await waitUntilPromise(() => 'this is a truthy value');

  expect(result).toEqual('this is a truthy value');
});

test('reject if function returns false', async () => {
  expect.assertions(1);

  try {
    await waitUntilPromise(() => false);
  } catch (e) {
    expect(e.message).toEqual('Wait until promise timed out');
  }
});

test('should allow setting custom Promise implementation', () => {
  const resolve = jest.fn();

  setPromiseImplementation({ resolve });

  waitUntilPromise(() => true);

  expect(resolve).toHaveBeenCalled();
});

test('should allow setting custom maxWait', async () => {
  let count = 0;
  sinon.spy(global, 'setTimeout');
  sinon.spy(global, 'setInterval');

  await waitUntilPromise(() => count++ > 0, 32);

  expect(global.setTimeout.calledOnce).toEqual(true);
  expect(global.setInterval.calledOnce).toEqual(true);

  expect(global.setTimeout.getCall(0).args[1]).toEqual(32);

  global.setTimeout.restore();
  global.setInterval.restore();
});

test('should allow setting custom checkDelay', async () => {
  let count = 0;
  sinon.spy(global, 'setTimeout');
  sinon.spy(global, 'setInterval');

  await waitUntilPromise(() => count++ > 0, undefined, 32);

  expect(global.setTimeout.calledOnce);
  expect(global.setInterval.calledOnce);

  expect(global.setInterval.getCall(0).args[1] === 32);

  global.setTimeout.restore();
  global.setInterval.restore();
});

test('should reject with the exception if the functions throws', async () => {
  expect.assertions(1);

  try {
    await waitUntilPromise(() => ({}).someFunction());
  } catch (e) {
    expect(e.message).toMatch(/is not a function/);
  }
});

test('should not call setTimeout or setInterval if function immediately returns truthy', async () => {
  sinon.spy(global, 'setTimeout');
  sinon.spy(global, 'setInterval');

  await waitUntilPromise(() => true);

  sinon.assert.notCalled(global.setTimeout);
  sinon.assert.notCalled(global.setInterval);

  global.setTimeout.restore();
  global.setInterval.restore();
});

test('should call setTimeout or setInterval once if function returns truthy', async () => {
  let count = 0;

  sinon.spy(global, 'setTimeout');
  sinon.spy(global, 'setInterval');

  await waitUntilPromise(() => count++ > 0);
  sinon.assert.callCount(global.setTimeout, 1);
  sinon.assert.callCount(global.setInterval, 1);

  global.setTimeout.restore();
  global.setInterval.restore();
});

test('should reject in timer if function throws', async () => {
  expect.assertions(1);

  let count = 0;

  try {
    await waitUntilPromise(() => {
      if (count++ === 0) {
        return;
      }

      ({}).someFunction();
    });
  } catch (e) {
    expect(e.message).toMatch(/is not a function/);
  }
});

test('should throw if no Promise is available', () => {
  setPromiseImplementation(null);

  expect(() => waitUntilPromise(() => true)).toThrow(/Wait Until Promise: No global Promise available/);
});

test('should reject with TimeoutError if available', async () => {
  expect.assertions(1);

  setPromiseImplementation(BluebirdPromise);

  try {
    await waitUntilPromise(() => false);
  } catch (e) {
    expect(e).toBeInstanceOf(BluebirdPromise.TimeoutError);
  }
});
