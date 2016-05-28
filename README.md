# wait-until-promise

> Test utility to simplify waiting for a condition

[![NPM Version][npm-image]][npm-url]
[![Linux build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Codeclimate Status][codeclimate-image]][codeclimate-url]

[![Dependency Status][david-image]][david-url]
[![Dev Dependency Status][david-dev-image]][david-dev-url]

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
      .then((text) => expect(test).toBe('The text in the paragraph'));
  })
})
```

## API
See [API.md](API.md)


## Change log
See [CHANGELOG.md](CHANGELOG.md)


[travis-url]: https://travis-ci.org/SimenB/wait-until-promise
[travis-image]: https://img.shields.io/travis/SimenB/wait-until-promise.svg
[appveyor-url]: https://ci.appveyor.com/project/SimenB/wait-until-promise
[appveyor-image]: https://ci.appveyor.com/api/projects/status/44aotxjicwqs3nnb?svg=true
[coveralls-url]: https://coveralls.io/github/SimenB/wait-until-promise
[coveralls-image]: https://img.shields.io/coveralls/SimenB/wait-until-promise.svg
[codeclimate-url]: https://codeclimate.com/github/SimenB/wait-until-promise
[codeclimate-image]: https://img.shields.io/codeclimate/github/SimenB/wait-until-promise.svg
[npm-url]: https://npmjs.org/package/wait-until-promise
[npm-image]: https://img.shields.io/npm/v/wait-until-promise.svg
[david-url]: https://david-dm.org/SimenB/wait-until-promise
[david-image]: https://img.shields.io/david/SimenB/wait-until-promise.svg
[david-dev-url]: https://david-dm.org/SimenB/wait-until-promise#info=devDependencies
[david-dev-image]: https://img.shields.io/david/dev/SimenB/wait-until-promise.svg
[david-peer-url]: https://david-dm.org/SimenB/wait-until-promise#info=peerDependencies
[david-peer-image]: https://img.shields.io/david/peer/SimenB/wait-until-promise.svg
