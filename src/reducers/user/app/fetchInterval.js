// @flow

import {
  CONFIG_USER_FETCH_INTERVAL
} from '../../../actionTypes'

import { fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    // Never show both the Send & Receive Modal at the same time.
    case CONFIG_USER_FETCH_INTERVAL:
      return state.setIn(["app", "fetchInterval"], fromJS(action))

    default:
      return state
  }
}
