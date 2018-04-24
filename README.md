# Stronghold app

This repository is currently for the frontend app.

## Usage at a glance (details in package.json)
```sh
yarn         # to install node_modules dependencies
yarn start   # for development, open http://localhost:3000/
yarn build   # for production
yarn test    # With the CI environment variable, it auto exits
yarn flow    # type checking

## Yarn
Please install yarn (ideally with nvm). Instructions: https://yarnpkg.com/lang/en/docs/install/

TL;DR
```sh
brew install yarn --without-node
```

## Node.js
Use `nvm` or `n`. Node version 8.x.

## Flow Type Checking
We are using flow type checking.

Please install it: https://flow.org/en/docs/install/

You can integrate with your text editor to make development easier.
https://flow.org/en/docs/editors/

Flow is quite fickle. Please use the React guide here:
https://flow.org/en/docs/react/components/

https://www.saltycrane.com/flow-type-cheat-sheet/latest/ - flow cheat sheet

## Environment Variables

Create an `.env.development.local` file, use `.env.example` as an example.

```
REACT_APP_API_URL = "https://... API ADDRESS"
```

note: env-vars need to be prepended with `REACT_APP_` to be accessible by React using `process.env`

## Dev Tools
Redux-devtools-extension: https://github.com/zalmoxisus/redux-devtools-extension

### Staging & Production

Create-react-app build supports dotenv files, but they don't support `.env.staging`. To get around this the staging envars are in `.env` and we can put production envars in either `.env.production.local` (this is .gitignored) or `.env.production`

## CSS, theming, and (the lack of) LESS
The [Stack themeforest theme](https://themeforest.net/item/stack-multipurpose-html-with-page-builder/19337626) we are using comes with LESS to build the theme base css. However, it is unnecessary to integrate LESS into this build process since we will infrequently change those styles. Instead, we will just use the built files from Stack and write our own vanilla CSS after the themeforest items.

We are currently using the default theme color which is in the file "theme.css".

A copy of the built files are copied over into the src/stack-theme folder. We did have to manually change a line of bootstrap that included a nonexistent icon font file.

## Front-end Architecture

We are using React, Redux, Redux-Saga, Immutable.js, Flow & React-Router.

```
State -> View -> Actions <-> Sagas <-> APIs
  ^                 |
  |--- Reducers <---|

```

The State drives the View.

## Best Practice & Methodologies

[BEM CSS](http://getbem.com/) methodology. [Read more](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) semi using Atomic Design methodolgy to organize the components.

**JavaScript Style Guide** - My vote is this: [JavaScript Standard Style](https://github.com/standard/standard)

[create-react-app v1.4.0 documentation](CRA.md)
