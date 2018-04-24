// @flow

import {
  LOADING,
  SUCCESS,
  FAILURE
} from "../../types"

import {
  FETCH_MARKETS_REQUESTED,
  FETCH_MARKETS_SUCCEEDED,
  FETCH_MARKETS_FAILED
} from "../../actionTypes"

import { Map, List } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case FETCH_MARKETS_REQUESTED:
      return Map({
        status: LOADING
      })
    case FETCH_MARKETS_SUCCEEDED:
      return Map({
        status: SUCCESS,
        data: List(action.markets),
      })
    case FETCH_MARKETS_FAILED:
      return Map({
        status: FAILURE
      })
    default:
      return state
  }
}
