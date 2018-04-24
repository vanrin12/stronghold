// @flow

// Start Import React Polyfills
import "core-js/es6/map"
import "core-js/es6/set"
import "raf/polyfill"
// End React Polyfills

import * as React from 'react'
import ReactDOM from 'react-dom'
import BigNumber from "bignumber.js"

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import strongApp from './reducers'
import initialState from './initialState'
import rootSaga from './sagas'

import App from './components/App'
//import registerServiceWorker from './registerServiceWorker'

/* Template Stylesheets */
import './stack-theme/bootstrap-custom-info-at-top-of-file.css'
import './stack-theme/css/stack-interface.css'
import './stack-theme/css/socicon.css'
import './stack-theme/css/iconsmind.css'
import './stack-theme/css/theme.css'
import './custom.css'  // from stronghold.co/css/custom.css``
import './flexbox.css'

// Configure BigNumber
BigNumber.config({ EXPONENTIAL_AT: [-15, 20] })  //  default is [-7, 20]

// Turn on Sentry
const { NODE_ENV } = process.env
if ( NODE_ENV === 'production') {
  window.Raven.config(process.env.REACT_APP_SENTRY_URL).install()
}

const sagaMiddleware = createSagaMiddleware()
let store = createStore(
  strongApp,
  initialState,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)

const rootNode = document.getElementById("root")

if (rootNode) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, rootNode
  )
} else {
  document.write("Stronghold is currently under maintenance. Please check back again later.")
}


//registerServiceWorker()  // could be agressively caching
