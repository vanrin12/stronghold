// @flow

import { Map, fromJS } from "immutable"

import { LOADING, SUCCESS, FAILURE } from "../types"

import {
  MARKETS_TICKER_REQUESTED,
  MARKETS_TICKER_SUCCEEDED,
  MARKETS_TICKER_FAILED
} from "../actionTypes"

export default function marketsTicker(state: Object, action: Object) {
  switch (action.type) {
    case MARKETS_TICKER_REQUESTED:
      return state.merge(Map({
        status: LOADING
      }))

    case MARKETS_TICKER_SUCCEEDED:
      return fromJS({
        status: SUCCESS,
        data: action.data
      })

    case MARKETS_TICKER_FAILED:
      return state.merge(Map({
        status: FAILURE
      }))

    default:
      return state
  }
}
