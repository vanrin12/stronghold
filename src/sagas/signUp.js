// @flow
import { takeLatest, call, put } from 'redux-saga/effects'

import * as Api from '../apis'

import {
  SIGN_UP_REQUESTED,
  SIGN_UP_FAILED
} from '../actionTypes'

import {
  flashError,
  flashInfo,
  signUpSucceeded,
  signUpFailed
} from '../actions'

function* signUp(action) {
  try {
    yield call(Api.signUp, action.email, action.password)
    yield put(flashInfo("To finish signing up, please check your email and click on the email verification link."))
    yield put(signUpSucceeded())
  } catch (error) {
    yield put(signUpFailed(error))
  }
}

function* signUpErrors({ error }) {
  // Front-end errors
  if(error.code) {
    switch(error.code) {
      case 'empty':
        yield put(flashError('Please enter an email address and password.'))
      break
      case 'emailIsInvalid':
        yield put(flashError('Please enter a valid email address.'))
      break
      case 'passwordTooShort':
        yield put(flashError('Password must be at least 8 characters in length.'))
      break
      case 'passwordMustHaveUpper':
        yield put(flashError('Password must contain an uppercase letter.'))
      break
      case 'passwordMustHaveLower':
        yield put(flashError('Password must contain a lowercase letter.'))
      break
      case 'passwordMustHaveNumber':
        yield put(flashError('Password must contain a number.'))
      break
      default:
    }

  // API errors
  } else if(error.errorCode) {
    switch(error.errorCode) {
      case 'USER_EXISTS':
        yield put(flashError("There's already an account with that email address.\n Please try to login."))
      break
      default:
    }

  // Unknown error
  } else {
    yield put(flashError('Something went wrong while signing up.\n Please try again.'))
  }

}

export default function* (): Iterable<any>{
  yield takeLatest(SIGN_UP_REQUESTED, signUp)
  yield takeLatest(SIGN_UP_FAILED, signUpErrors)
}
