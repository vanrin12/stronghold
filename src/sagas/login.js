// @flow
import { call, put, takeLatest } from 'redux-saga/effects'

import {
  LOGIN_REQUESTED,
  LOGIN_FAILED,
} from '../actionTypes'

import {
  flashError,

  loginSucceeded,
  loginFailed,

} from '../actions'

// TODO after loginSucceeded, it should "resumeSession" so all logic an be in one place

import * as Api from '../apis'

import { storeSessionKey } from '../storage'

export function* login(action: Object): Iterable<any> {
  try {
    const data = yield call(Api.login, action.username, action.password, action.code)
    if(data && data.sessionKey) {
      yield call(Api.updateSessionKey, data.sessionKey)
      yield call(storeSessionKey, data.sessionKey)
      yield put(loginSucceeded())
    } else {
      throw new Error("No session key.")
    }

  } catch (error) {
    yield put(loginFailed(error))
  }
}

function* loginErrors({ error }) {
  // For more complicated HTML error messages, handle it withen the components.
  if(error.code === 'usernameIsEmpty' || error.code === 'passwordIsEmpty') {
    yield put(flashError('Please enter your username and password.'))
  } else if(error.errorCode  === 'BAD_LOGIN') {
    yield put(flashError("Your password or username is not correct.\n Please try again."))
  } else if(error.errorCode  === 'EMAIL_UNCONFIRMED') {
    yield put(flashError("Please confirm your email address to login to your account.", {
      code: error.errorCode
    }))
  } else {
    // Generic API sign-up error message.
    yield put(flashError("There's a problem with your login.\n Please try again."))
  }
}

export default function* (): Iterable<any>{
  yield takeLatest(LOGIN_REQUESTED, login)
  yield takeLatest(LOGIN_FAILED, loginErrors)
}
