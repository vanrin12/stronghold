import { chainReducers } from '@shoutem/redux-composers'

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGOUT_SUCCEEDED,
  RESET_USER_STATE,

  CONFIRM_EMAIL_ADDRESS_SUCCEEDED,

  RESUME_SESSION_SUCCEEDED
} from '../../actionTypes'

import { SUCCESS } from "../../types"

import { Map } from 'immutable'

import initialState from '../../initialState'

import details from "./details"
import assets from "./assets"
import balances from "./balances"
import transactions from "./transactions"
import walletTransactions from "./walletTransactions"
import exchangeRates from "./exchangeRates"
import markets from "./markets"
import openOrders from "./openOrders"

import app from "./app"

function user (state: Object, action: Object) {
  switch (action.type) {
    // wallet is accessible if status == SUCCESS
    case LOGIN_SUCCEEDED:
    case RESUME_SESSION_SUCCEEDED:
    case CONFIRM_EMAIL_ADDRESS_SUCCEEDED:
      return state.merge(Map({
        status: SUCCESS
        /*  // When wallet was default, start loading spinner
        transactions: Map({
          status: LOADING  // So UI can start showing load-spinners
        })
        */
      }))

    // initialState when starting login, logout or resuming session requested
    case LOGIN_REQUESTED:
    case RESET_USER_STATE:
    case LOGOUT_SUCCEEDED:
      return initialState.get('user')

    default:
      return state
  }
}

export default chainReducers([
  user,
  details,
  assets,
  balances,
  transactions,
  walletTransactions,
  exchangeRates,
  openOrders,
  markets,
  app
])
