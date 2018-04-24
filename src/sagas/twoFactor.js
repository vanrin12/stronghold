// @flow
import { takeLatest, put, call } from 'redux-saga/effects'

import {
  SHOW_SETTINGS_TWO_FACTOR_MODAL,
  SETUP_TWO_FACTOR_FETCH_REQUESTED,
  SETUP_TWO_FACTOR_VERIFICATION_REQUESTED,
  SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED,

  DISABLE_TWO_FACTOR_REQUESTED,
  DISABLE_TWO_FACTOR_SUCCEEDED,
} from '../actionTypes'

import {
  setupTwoFactorFetchRequested,
  setupTwoFactorFetchSucceeded,
  setupTwoFactorFetchFailed,
  setupTwoFactorVerificationSucceeded,
  setupTwoFactorVerificationFailed,
  hideSettingsTwoFactorModal,
  disableTwoFactorSucceeded,
  disableTwoFactorFailed,
} from '../actions'

import * as Api from '../apis'

function* startSetup(action) {
  yield put(setupTwoFactorFetchRequested())
}

export function* setupFetch(action: Object): Iterable<any> {
  try {
    const data = yield call(Api.setupFetchTwoFactor)
    yield put(setupTwoFactorFetchSucceeded(data))
  } catch (error) {
    yield put(setupTwoFactorFetchFailed())
  }
}

export function* setupVerifyCode(action: Object): Iterable<any> {
  try {
    yield call(Api.setupTwoFactorVerifyCode, action.id, action.code)
    yield put(setupTwoFactorVerificationSucceeded())
  } catch (error) {
    yield put(setupTwoFactorVerificationFailed())
  }
}

export function* disable(action: Object): Iterable<any> {
  try {
    yield call(Api.disableTwoFactor, action.code)
    yield put(disableTwoFactorSucceeded())
  } catch (error) {
    yield put(disableTwoFactorFailed())
  }
}

export function* onSetupVerificationSuccess(action: Object): Iterable<any> {
  // TODO, update the store so that the settings page sees the user opt-in to 2-factor auth
  // maybe show a toast?
  yield put(hideSettingsTwoFactorModal())
}
export function* onDisableSuccess(action: Object): Iterable<any> {
  yield put(hideSettingsTwoFactorModal())
}


export default function* (): Iterable<any>{
  // Setup
  yield takeLatest(SHOW_SETTINGS_TWO_FACTOR_MODAL, startSetup)
  yield takeLatest(SETUP_TWO_FACTOR_FETCH_REQUESTED, setupFetch)
  yield takeLatest(SETUP_TWO_FACTOR_VERIFICATION_REQUESTED, setupVerifyCode)
  yield takeLatest(SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED, onSetupVerificationSuccess)

  // Disable
  yield takeLatest(DISABLE_TWO_FACTOR_REQUESTED, disable)
  yield takeLatest(DISABLE_TWO_FACTOR_SUCCEEDED, onDisableSuccess)
}
