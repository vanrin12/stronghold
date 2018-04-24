// @flow

import {
  FETCH_WALLET_TRANSACTIONS_REQUESTED,
  FETCH_WALLET_TRANSACTIONS_SUCCEEDED,
  FETCH_WALLET_TRANSACTIONS_FAILED
} from '../../actionTypes'

import { LOADING, SUCCESS, FAILURE } from "../../types"

import { Map, List } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case FETCH_WALLET_TRANSACTIONS_REQUESTED:
      return state.setIn(["walletTransactions", "status"], LOADING)

    case FETCH_WALLET_TRANSACTIONS_SUCCEEDED:
      return state.mergeIn(["walletTransactions"], Map({
        status: SUCCESS,
        data: List(action.transactions)
      }))

    case FETCH_WALLET_TRANSACTIONS_FAILED:
      return state.setIn(["walletTransactions", "status"], FAILURE)

    default:
      return state
  }
}
