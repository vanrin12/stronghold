// @flow
import { takeLatest, put, race, take, select } from 'redux-saga/effects'
import { delay } from "redux-saga"

import { Map } from "immutable"

import {
  START_USER_FETCH_INTERVAL,
  STOP_USER_FETCH_INTERVAL,
  USER_FETCH_INTERVAL
} from '../actionTypes'

import {
  userFetchInterval
} from '../actions'

import { tradePageIntervalRequests } from "./markets"
import { walletPageIntervalRequests, transactionsPageIntervalRequests } from "./fetches"

function* startUserFetchInterval(action) {
  let running = true

  while(running){
    const result = yield race({
      loop: delay(action.ms || 5000),  // interval delay, defaults 5 seconds
      stop: take(STOP_USER_FETCH_INTERVAL)
    })
    if (result && (result.stop)) {
      running = false
    } else {
      yield put(userFetchInterval())  // do the user fetch
    }
  }
}

function getConfig(state): Object {
  return state.getIn(["user", "app", "fetchInterval"]) || Map()
}

// Runs on an interval, fetches data.
function* userFetch(action) {
  const config = yield select(getConfig)
  switch(config.get("page")) {
    case "wallet":
      yield walletPageIntervalRequests()
    break
    case "transactions":
      yield transactionsPageIntervalRequests()
    break
    case "trade":
    default:  // 'resume_session_requested' clears config, so assume it's on trade if not on wallet page
      yield tradePageIntervalRequests(config.get("marketId"))
    break
  }
}

export default function* (): Iterable<any>{
  yield takeLatest(START_USER_FETCH_INTERVAL, startUserFetchInterval)
  yield takeLatest(USER_FETCH_INTERVAL, userFetch)
}
