// @flow

import { fromJS } from "immutable"

import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_SUCCEEDED,
  RESET_LOGIN_PAGE_STATE,
} from '../../actionTypes'

import { LOADING, SUCCESS, FAILURE } from "../../types"

import initialState from '../../initialState'

export default function (state: Object, action: Object) {
  switch (action.type) {

    case LOGIN_REQUESTED:
      return state.merge(fromJS({
        status: LOADING,
        form: {
          username: action.username,
          password: action.password
        }
      }))

    case LOGIN_SUCCEEDED:
      return state.set("status", SUCCESS)

    case LOGIN_FAILED:
      let count = state.get("count")
      if (count !== undefined) {
        count += 1
      } else {
        count = 0
      }
      return state.merge(fromJS({
        status: FAILURE,
        data: action.error,
        count: count
      }))

    case LOGOUT_SUCCEEDED:
    case RESET_LOGIN_PAGE_STATE:
      return initialState.getIn(["app", "login"])

    default:
      return state
  }
}
