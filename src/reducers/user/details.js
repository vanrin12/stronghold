// @flow

import {
  FETCH_USER_SUCCEEDED
} from '../../actionTypes'

import { SUCCESS  } from "../../types"

import { fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {

    case FETCH_USER_SUCCEEDED:
      return state.mergeIn(["details"], fromJS({
        status: SUCCESS,
        data: {
          username: action.user.username,
          email: action.user.email
        }
      }))

    default:
      return state
  }
}
