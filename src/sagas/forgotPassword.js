// @flow
import { takeLatest, call, put } from 'redux-saga/effects'

import {
  FORGOT_PASSWORD_EMAIL_REQUESTED,
} from '../actionTypes'

import {
  flashError,
  flashInfo,
  forgotPasswordEmailSucceeded,
  forgotPasswordEmailFailed
} from '../actions'

import * as Api from '../apis'

function* forgotPasswordRequest(action) {
  try {
    yield call(Api.forgotPasswordRequest, action.email)
    yield put(forgotPasswordEmailSucceeded())
    yield put(flashInfo("Please check your email for the link to reset your password."))
  } catch(err) {
    yield put(forgotPasswordEmailFailed())
    yield put(flashError("There was a problem with the forgot password request. Please try again later."))
  }
}

export default function* (): Iterable<any>{
  yield takeLatest(FORGOT_PASSWORD_EMAIL_REQUESTED, forgotPasswordRequest)
}
