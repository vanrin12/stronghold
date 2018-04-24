// @flow

import {
  SHOW_SETTINGS_TWO_FACTOR_MODAL,
  HIDE_SETTINGS_TWO_FACTOR_MODAL,
  SETUP_TWO_FACTOR_FETCH_REQUESTED,
  SETUP_TWO_FACTOR_FETCH_SUCCEEDED,
  SETUP_TWO_FACTOR_FETCH_FAILED,
  SETUP_TWO_FACTOR_VERIFICATION_REQUESTED,
  SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED,
  SETUP_TWO_FACTOR_VERIFICATION_FAILED,
  CLEAR_SETUP_TWO_FACTOR_VERIFICATION_STATUS,

  DISABLE_TWO_FACTOR_REQUESTED,
  DISABLE_TWO_FACTOR_SUCCEEDED,
  DISABLE_TWO_FACTOR_FAILED,

  FETCH_USER_SECURITY_REQUESTED,
  FETCH_USER_SECURITY_SUCCEEDED,
  FETCH_USER_SECURITY_FAILED
} from '../../../actionTypes'

import { fromJS } from "immutable"

import { LOADING, FAILURE, SUCCESS, NOT_ASKED }from "../../../types"

import initialState from '../../../initialState'

export default function (state: Object, action: Object) {
  switch (action.type) {
    // Never show both the Send & Receive Modal at the same time.
    case SHOW_SETTINGS_TWO_FACTOR_MODAL:
      return state.mergeIn(["app", "security", "twoFactor"], fromJS({
        isOpen: true
      })).setIn(["app", "security", "twoFactor", "has2FA", "data"], action.has2Factor)  // make sure there is a value so modal knows which (enable or disable) to open

    case HIDE_SETTINGS_TWO_FACTOR_MODAL:
      return state.mergeIn(["app", "security", "twoFactor"], fromJS({
        isOpen: false
      })).setIn(["app", "security", "twoFactorModal"], initialState.getIn(["user", "app", "security", "twoFactorModal"]))

    case SETUP_TWO_FACTOR_FETCH_REQUESTED:
      return state.setIn(["app", "security", "twoFactorModal", "getSetup"], fromJS({
        status: LOADING
      }))


    case FETCH_USER_SECURITY_REQUESTED:
      return state.setIn(["app", "security", "twoFactor", "has2FA", "status"], LOADING)
    case FETCH_USER_SECURITY_SUCCEEDED:
      return state.setIn(["app", "security", "twoFactor", "has2FA"], fromJS({
        status: SUCCESS,
        data: action.has2FA
      }))
    case FETCH_USER_SECURITY_FAILED:
      return state.setIn(["app", "security", "twoFactor", "has2FA", "status"], FAILURE)


    case SETUP_TWO_FACTOR_FETCH_SUCCEEDED:
      return state.setIn(["app", "security", "twoFactorModal", "getSetup"], fromJS({
        status: SUCCESS,
        data: action.data
      }))

    case SETUP_TWO_FACTOR_FETCH_FAILED:
      return state.setIn(["app", "security", "twoFactorModal", "getSetup"], fromJS({
        status: FAILURE
      }))

    case SETUP_TWO_FACTOR_VERIFICATION_REQUESTED:
      return state.setIn(["app", "security", "twoFactorModal", "enabled", "status"], LOADING)
    case SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED:
        return state.setIn(["app", "security", "twoFactorModal", "enabled", "status"], SUCCESS).setIn(["app", "security", "twoFactor", "has2FA"], fromJS({  // TODO alternatively we can make another has2FA request
          status: SUCCESS,
          data: true
        }))
    case SETUP_TWO_FACTOR_VERIFICATION_FAILED:
      return state.setIn(["app", "security", "twoFactorModal", "enabled", "status"], FAILURE)
    case CLEAR_SETUP_TWO_FACTOR_VERIFICATION_STATUS:
      return state.setIn(["app", "security", "twoFactorModal", "enabled", "status"], NOT_ASKED)


    case DISABLE_TWO_FACTOR_REQUESTED:
      return state.setIn(["app", "security", "twoFactorModal", "disabled", "status"], LOADING)
    case DISABLE_TWO_FACTOR_SUCCEEDED:
        return state.setIn(["app", "security", "twoFactorModal", "disabled", "status"], SUCCESS).setIn(["app", "security", "twoFactor", "has2FA"], fromJS({  // TODO alternatively we can make another has2FA request
          status: SUCCESS,
          data: false
        }))
    case DISABLE_TWO_FACTOR_FAILED:
      return state.setIn(["app", "security", "twoFactorModal", "disabled", "status"], FAILURE)

    default:
      return state
  }
}
