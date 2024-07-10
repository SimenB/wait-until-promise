# wait-until-promise

> Test utility to simplify waiting for a condition

[![NPM Version][npm-image]][npm-url]
[![CI build Status][ci-image]][ci-url]
[![Coverage Status][coveralls-image]][coveralls-url]

## Usage

To use it, import the module, and pass it a function. A promise is returned,
and it is resolved after the passed function returns a truthy value. If the
function passed never returns a truthy value, or it times out, the promise is
rejected.

```js
import $ from 'jquery';
import waitUntil from 'wait-until-promise';

describe('some thing', () => {
  it('should do something', (done) => {
    const button = $('#button');
    const paragraph = $('p');

    button.click();

    waitUntil(() => paragraph.text() === 'button clicked')
      .then(() => done());
  })

  // The promise is resolved with the return-value. Useful to if you want to
  // wait until something exists, then make assertions on it
  it('should do something else', (done) => {
    const button = $('#button');
    const paragraph = $('p');

    button.click();

    waitUntil(() => paragraph.text())
      .then((text) => expect(text).toBe('The text in the paragraph'))
      .then(() => done());
  })
})
```

## API
See [API.md](API.md)


## Change log
See [CHANGELOG.md](CHANGELOG.md)


[ci-url]: https://github.com/SimenB/wait-until-promise/actions/workflows/ci.yml?query=branch:master
[ci-image]: https://img.shields.io/github/actions/workflow/status/SimenB/wait-until-promise/ci.yaml?branch=master
[coveralls-url]: https://coveralls.io/github/SimenB/wait-until-promise
[coveralls-image]: https://img.shields.io/coveralls/SimenB/wait-until-promise.svg
[npm-url]: https://npmjs.org/package/wait-until-promise
[npm-image]: https://img.shields.io/npm/v/wait-until-promise.svg
