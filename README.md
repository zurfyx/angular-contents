# Angular2+ Library Starter Kit

[![npm Version](https://img.shields.io/npm/v/angular-library-starter-kit.svg)](https://www.npmjs.com/package/angular-library-starter-kit)
[![Build Status](https://travis-ci.org/zurfyx/angular-library-starter-kit.svg?branch=master)](https://travis-ci.org/zurfyx/angular-library-starter-kit)

> Angular2+ Library Starter Kit based on Angular-CLI.

## What you get out of the box

**A NPM library** such as:

[npmjs.com/package/angular-library-starter-kit](https://www.npmjs.com/package/angular-library-starter-kit)

Which can be installed and imported as easy as `npm install your-library-name` and `import { MyModule } from 'your-library-name'`

A **demo page** such as:

[zurfyx.github.io/angular-library-starter-kit](https://zurfyx.github.io/angular-library-starter-kit/)

## Features

- Based on [angular-cli](https://github.com/angular/angular-cli)
- Compatibility with Angular CLI, Webpack and SystemJS (built with [ng-packgr](https://github.com/dherges/ng-packagr))
- Demo project (watch your library result as you develop)
- Angular tests & E2E tests
- Travis CI autodeploy to NPM
- Travis CI demo autodeploy to GitHub Pages

## Getting started

```
git clone https://github.com/zurfyx/angular-library-start-kit
npm install
npm start
```

**Write your package metadata**

Make this library yours. Edit `package.json`, `.angular-cli.json` and `.travis.yml` and replace all ocurrences of `angular-library-starter-kit` with `your-module-name` (make sure it doesn't exist on [NPM](http://npmjs.com/) yet).

For the `package.json -> build-gh-pages` make sure to change `zurfyx` with your GitHub name or organization name. It will be used to later deploy your demo page onto GitHub pages.

Same thing has to be done with `.travis.yml -> after_sucess`. We'll get into secure tokens in [Setting up Continuous Integration](#setting-up-continuous-integration).

**Write your module**

Edit `src/` with your library contents. The current `taggify.module.ts`, `taggify.pipe.ts`, `taggify.pipe.spec.ts` and `index.ts` should be edited with your module stuff.

Everything you want the target users to be able to import directly should be added into `index.ts`. Remember that shared components or pipes should be written both into `declarations` and `exports` when defining your module.

**Write your module demo**

Edit `example/app` files just like if it was a normal `angular-cli` site. You might want to make use of `import { YourModule } from '../../src'` at some point to proof that your library works as expected.

**Test your module**

You can write both `e2e` test over your demo site, and unit tests on either the `src` and `example/app`.

You might want to check `e2e/app.e2e-spec.ts` and `src/taggify.pipe.spec.ts` as examples.

**Upload your module onto NPM**

This process can be done automatically with Travis CI. See [Autodeploy to NPM](#autodeploy-to-npm).

```
npm run build
```

Browser into the `dist/` folder, where the result is stored and publish it into NPM.

```
cd dist
npm publish
```

Your module should now be up and ready!

## Folder structure

For the most part, the folder structure is identical to angular-cli's one.

```
|- example/app Your demo application (GH pages)
|- src All your library source code, which will get packaged and distributed.
```

## Setting up Continuous Integration

While you can use any CI of your choice, **Travis CI** is already set up to do the demo deployment onto GitHub Pages and library into NPM for you.

Read over [Write your package metadata](#write-your-package-metadata) first, if you haven't already.

First of all, activate Travis on your GitHub repository. You can do so on your [Travis profile](https://travis-ci.org/profile/).

### Autodeploy to GitHub Pages

In order to deploy to GitHub Pages we need a GitHub token of yours.

Generate a token [here](https://github.com/settings/tokens/new). Scopes: [x] repo.

Encrypt the token. On your source code folder run the following command:

```
travis encrypt GH_TOKEN=your_token_here
```

The result should be copy-pasted into `env -> global -> secure`.

### Autodeploy to NPM

A similar thing to GitHub Pages can be done with NPM.

Generate a token with `npm token create`.

Encrypt the token. On your source code folder run the following command:

```
travis encrypt your_token_here
```

The result should be copy-pasted into `deploy -> api_key -> secure`.

## Built with Angular Library Starter Kit

- [angular-custom-modal](https://github.com/zurfyx/angular-custom-modal)
- [angular-custom-dropdown](https://github.com/zurfyx/angular-custom-dropdown)

## License

MIT © [Gerard Rovira Sánchez](//zurfyx.com)