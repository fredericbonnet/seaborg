# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.2] - 2025-07-29

## Fixed

- Fix Node 23+ compatibility issue (issue #23)

## [0.6.1] - 2025-07-10

## Fixed

- Fix race condition with large indexes (issue #23)

## [0.6.0] - 2025-06-24

### Changed

- Update to Doxygen XSD version 1.14.0

## [0.5.0] - 2020-11-21

### Added

- Add `excludeProtectionLevels` configuration option for filtering of compounds
  and members based on their protection level (private, protected etc.).

### Changed

- Update to Doxygen XSD version 1.8.20
- Update to Typescript version 3.9

## [0.4.1] - 2020-11-13

### Fixed

- Fix version in CLI

## [0.4.0] - 2020-11-13

### Changed

- Major overhaul of the Markdown templating engine: replace Handlebars with
  template literals & functional core

## [0.3.0] - 2020-01-02

### Added

- Add job pooling and worker thread support

## [0.2.1] - 2019-11-19

### Fixed

## [0.2.0] - 2019-11-19

### Changed

- Refactoring of services

### Added

- Add `ignorePrefix` option for index pages
- Add render service
- Add tests to Markdown renderer
- Add include and reverse include graph support using the [mermaid](https://mermaidjs.github.io/#/?id=mermaid) syntax

## [0.1.1] - 2019-10-30

### Fixed

## [0.1.0] - 2019-10-30

### Added

- First release.

[unreleased]: https://github.com/fredericbonnet/seaborg/compare/v0.6.2...HEAD
[0.6.2]: https://github.com/fredericbonnet/seaborg/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/fredericbonnet/seaborg/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/fredericbonnet/seaborg/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/fredericbonnet/seaborg/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/fredericbonnet/seaborg/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/fredericbonnet/seaborg/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/fredericbonnet/seaborg/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/fredericbonnet/seaborg/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/fredericbonnet/seaborg/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/fredericbonnet/seaborg/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/fredericbonnet/seaborg/releases/tag/v0.1.0
