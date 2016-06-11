# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
Nothing

## [1.0.0] - 2016-06-11
Nothing changed, just bumping it to 1.0.0 to signify stability

## [0.1.3] - 2016-05-28
### Changed
- Generate API documentation using documentation.js

## [0.1.2] - 2016-04-22
### Changed
- Throw error if no `Promise` available on invocation, instead of warning as a
side effect of importing the module
- Reject with a `TimeoutError`, like Bluebird provides, if available

## [0.1.1] - 2016-03-20
### Changed
- Fix URLs in change log

## [0.1.0] - 2016-03-20
### Added
- A Changelog!
- Print warning if `Promise` is not available

### Changed
- Don't create a new `Promise` if function immediately resolves

#### Internal
- Return arrow function instead of a normal function to work around a
[babel bug](https://phabricator.babeljs.io/T7227) with escaped keywords

## [0.0.2] - 2016-03-03
Initial release


[Unreleased]: https://github.com/SimenB/wait-until-promise/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SimenB/wait-until-promise/compare/v0.1.3...v1.0.0
[0.1.3]: https://github.com/SimenB/wait-until-promise/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/SimenB/wait-until-promise/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/SimenB/wait-until-promise/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/SimenB/wait-until-promise/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/SimenB/wait-until-promise/compare/6784c668df6601aa00743ede13fba40526ea09b1...v0.0.2
