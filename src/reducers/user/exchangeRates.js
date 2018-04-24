// @flow

import {
  LOADING,
  SUCCESS,
  FAILURE
} from "../../types"

import {
  FETCH_EXCHANGE_RATES_REQUESTED,
  FETCH_EXCHANGE_RATES_SUCCEEDED,
  FETCH_EXCHANGE_RATES_FAILED
} from "../../actionTypes"

import { Map } from "immutable"

export default function(state: Object, action: Object) {
  switch (action.type) {
    case FETCH_EXCHANGE_RATES_REQUESTED:
      return state.setIn(["exchangeRates", "status"], LOADING)
    case FETCH_EXCHANGE_RATES_SUCCEEDED:
      return state.mergeIn(["exchangeRates"], Map({
        status: SUCCESS,
        data: action.data
      }))
    case FETCH_EXCHANGE_RATES_FAILED:
      return state.setIn(["exchangeRates", "status"], FAILURE)
    default:
      return state
  }
}
