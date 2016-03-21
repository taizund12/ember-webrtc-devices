#### PSA

This addon is still under development and not *quite* ready for use.

TODO:
* [x] bring in bower deps
* [x] create dummy application
* [ ] more unit tests
* [ ] more integration tests
* [x] use try:testall to test multiple ember versions

# webrtc-devices

This addon is designed to provide you with two things:

1. A mixin (probably useful on a service) for enumerating devices, and setting
up all the basic stuff.

2. A component for selecting those devices

This addon uses [ember-intl](https://github.com/yahoo/ember-intl) for i18n. It has it's own collection of keys (in English only). When using in your app, you'll want to replicate these i18n keys in your i18n. Eventually, I'd like to have a blueprint setup that does this for you automatically.

## Setup

`npm install --save-dev ember-webrtc-devices`
`ember g ember-webrtc-devices`

## Contributing

See Contributing.md

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
