// @flow

import {
  FETCH_TRANSACTIONS_REQUESTED,
  FETCH_TRANSACTIONS_SUCCEEDED,
  FETCH_TRANSACTIONS_FAILED
} from '../../actionTypes'

import { LOADING, SUCCESS, FAILURE } from "../../types"

import { Map, List } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_REQUESTED:
      return state.setIn(["transactions", "status"], LOADING)

    case FETCH_TRANSACTIONS_SUCCEEDED:
      return state.mergeIn(["transactions"], Map({
        status: SUCCESS,
        data: List(action.transactions)
      }))

    case FETCH_TRANSACTIONS_FAILED:
      return state.setIn(["transactions", "status"], FAILURE)

    default:
      return state
  }
}
