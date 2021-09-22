# 📦 build-react-npm

> CLI for creating reusable, modern React libraries using Webpack and create-react-app.

## Intro

<p align="center">
  <img width="600" src="https://github.com/knowankit/build-react-npm/blob/develop/demo.gif">
</p>
<p align="center">
  <a href="https://twitter.com/knowankit">
    <img alt="Twitter: Ankit Kumar" src="https://img.shields.io/twitter/follow/knowankit.svg?style=social" target="_blank" />
  </a>
</p>

## Features 🚀

- A modern and easy to use CLI
- Generates modern JS feature files
- Bundles `commonjs` and `es` module formats
- [create-react-app](https://github.com/facebookincubator/create-react-app) for example usage and local dev
- [Webpack](https://webpack.js.org/) for bundling
- [Babel](https://babeljs.io/) for transpiling
- Supports complicated peer-dependencies
- Optional support for TypeScript
- Sourcemap creation
- Publish github pages with one command
- Easy to build and test your component with the example template

## Install globally

```bash
npm install -g build-react-npm
```

## How to use it?

### Development

```bash
build-react-npm
```

or

```bash
npx build-react-npm
```

Once you run the CLI, you will be asked to answer few options. Complete the steps and you should have react project with the similar directory strucutre.

If you are using npm
```bash
npm run dev
```

else

```bash
yarn dev
```

You will have a example component running in the browser. You can start developing your component here by adding some javscripts and css.

### Test

Looks like you have build your awesome react component. Now, we need to test it as an individual component by importing it.To do this first we need to build our component.

To build the component run

```bash
yarn build
```
or 

```bash
npm run build
```

This will build the file and also pack you npm package in the format of tz. You can see a new file has been created with the name of your package at the root level. Something like [name-of-package-version-number].tz This file will be used in our example dir where we will be testing.

Go to the example directory and check the package.json, you will see you package name in the dependency. You need to change it as per your package name or just rename whatever is in [name-of-package-version-number].tz filename.

```bash
npm install
```

This will install your package and you can test it in in your local project before publishing.


### Publish

Once you have tested your component, you can go the root directory and run

```bash
npm publish
```

If you want to create the demo page as well using the git hub page then you can style your example directory and run

```bash
npm run deploy
```

## License

MIT © [Ankit Kumar](https://github.com/knowankit)

Support my OSS work by <a href="https://twitter.com/knowankit">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
