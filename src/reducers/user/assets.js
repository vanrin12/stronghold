// @flow

import {
  FETCH_ASSETS_REQUESTED,
  FETCH_ASSETS_SUCCEEDED,
  FETCH_ASSETS_FAILED
} from '../../actionTypes'

import { LOADING, SUCCESS, FAILURE } from "../../types"

import { Map, fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case FETCH_ASSETS_REQUESTED:
      return state.setIn(["assets", "status"], LOADING)

    case FETCH_ASSETS_SUCCEEDED:
      return state.mergeIn(["assets"], Map({
        status: SUCCESS,
        data: fromJS(action.assets.reduce( function(assets, asset){  // convert array to object
          assets[asset.code] = asset
          return assets
        }, {} ))
      }))

    case FETCH_ASSETS_FAILED:
      return state.setIn(["assets", "status"], FAILURE)

    default:
      return state
  }
}
