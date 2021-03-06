# Omni Common UI

Branch | Build | Coverage
------ | --- | ---
develop | [![Build Status – develop](https://travis-ci.org/e1-bsd/omni-common-ui.svg?branch=develop)](https://travis-ci.org/e1-bsd/omni-common-ui) | [![Coverage Status](https://coveralls.io/repos/github/e1-bsd/omni-common-ui/badge.svg?branch=develop)](https://coveralls.io/github/e1-bsd/omni-common-ui?branch=develop)
master | [![Build Status – master](https://travis-ci.org/e1-bsd/omni-common-ui.svg?branch=master)](https://travis-ci.org/e1-bsd/omni-common-ui) | [![Coverage Status](https://coveralls.io/repos/github/e1-bsd/omni-common-ui/badge.svg)](https://coveralls.io/github/e1-bsd/omni-common-ui)

## Setting up the environment

Follow this steps to setup your development environment.

1. Install [NodeJS](https://nodejs.org/) (**^6.6.0**).
It is **highly** recommended to use [Node Version Manager](https://github.com/creationix/nvm) (for Mac and Linux).
A [Windows](https://github.com/coreybutler/nvm-windows) version is also available.
2. Install [Yarn](https://yarnpkg.com/) running `npm install -g yarn`.
3. Open a terminal at the root folder of the project.
4. Run `yarn`.

## Starting the development environment

When all your dependencies are installed, you can follow this steps to build the project on your machine for development.

1. Open a terminal at the root folder of the project.
2. Run `yarn start`.
3. You can see the site running on `http://localhost:3000`.
The project will get recompiled automatically when you change the code.

### Running our linting tools

1. Run `yarn run lint:css` to run Stylelint.
2. Run `yarn run lint:js` to run ESLint.

### Testing during development

1. Open a terminal at the root folder of the project.
2. Run `yarn run test:start`.
3. The project will be built and a special Chrome window will be opened.
4. The tests will be run.
5. The tests will run again automatically when you change the code.

## Frequent problems

### `yarn start` is broken :(

If you meet some error when trying to run `yarn start` or `yarn run test:start`, the most common cause is that someone has added or updated some new dependency into the project.

Run `yarn` to get your environment up to date.
