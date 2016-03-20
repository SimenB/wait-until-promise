# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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


[Unreleased]: https://github.com/SimenB/wait-until-promise/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/SimenB/wait-until-promise/compare/v0.0.2...v0.1.0
[0.0.2]: https://github.com/SimenB/wait-until-promise/compare/https://github.com/SimenB/wait-until-promise/compare/6784c668df6601aa00743ede13fba40526ea09b1...v0.0.2
