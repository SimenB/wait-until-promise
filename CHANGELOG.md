# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
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


[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/olivierlacan/keep-a-changelog/compare/v0.0.1...v0.0.2
