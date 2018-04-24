// @flow

import { chainReducers } from '@shoutem/redux-composers'

import wallet from "./wallet"
import trade from "./trade"
import fetchInterval from "./fetchInterval"
import security from "./security"

export default chainReducers({
  wallet,
  trade,
  fetchInterval,
  security
})
