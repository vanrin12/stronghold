// @flow
import { combineReducers } from 'redux-immutable'

import { Map, fromJS } from 'immutable'


import {
  FLASH_ERROR,
  FLASH_INFO,
  FLASH_ERRORS_RESET,

  SIGN_UP_REQUESTED,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED
} from '../actionTypes'

import app from "./app"
import user from "./user"
import trade from "./trade"
import marketsTicker from "./marketsTicker"

function flashMessage(state: Object, action: Object) {
  switch (action.type) {

    case FLASH_ERROR:
      return fromJS({
        message: action.message,
        list: action.list,
        code: action.code,
        type: 'error'
      })

    case FLASH_INFO:
      return fromJS({
        message: action.message,
        list: action.list,
        type: 'info'
      })

    case FLASH_ERRORS_RESET:
      return Map()

    default:
      return state
  }
}

function isSigningUp(state: Object, action: Object) {
  switch (action.type) {
    case SIGN_UP_REQUESTED:
      return true

    case SIGN_UP_SUCCEEDED:
    case SIGN_UP_FAILED:
      return false

    default:
      return state
  }
}


export default combineReducers({
  app,
  user,
  flashMessage,
  trade,
  marketsTicker,
  isSigningUp
})

