// @flow

import {
  FETCH_BALANCES_REQUESTED,
  FETCH_BALANCES_SUCCEEDED,
  FETCH_BALANCES_FAILED
} from '../../actionTypes'

import { LOADING, SUCCESS, FAILURE } from "../../types"

import { Map, fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case FETCH_BALANCES_REQUESTED:
      return state.setIn(["balances", "status"], LOADING)

    case FETCH_BALANCES_SUCCEEDED:
      // source of getIn error, balances succeeding before assets
      const assets = state.getIn(["assets", "data"])
      const balances = action.balances.sort( function(a, b) {
        if (assets.getIn([ a.code, "priority" ]) < assets.getIn([ b.code, "priority" ])) return -1
        return 1
      } )
      return state.mergeIn(["balances"], Map({
        status: SUCCESS,
        data: fromJS(balances)
      }))

    case FETCH_BALANCES_FAILED:
      return state.setIn(["balances", "status"], FAILURE)

    default:
      return state
  }
}
