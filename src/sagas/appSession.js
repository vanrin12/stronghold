// @flow
import { take, call, put, takeEvery, takeLatest, race, select } from 'redux-saga/effects'

import {
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  CONFIRM_EMAIL_ADDRESS_SUCCEEDED,
  RESUME_SESSION_FAILED,
  LOGOUT_REQUESTED,

  RESUME_SESSION_REQUESTED,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,

  APP_SESSION_FETCHES_REQUESTED
} from '../actionTypes'

import {
  logoutFailed,
  logoutRequested,
  logoutSucceeded,
  stopUserFetchInterval,

  fetchUserRequested,
  resumeSessionSucceeded,
  resumeSessionFailed,
  flashErrorsReset,

  resetUserState,
  appSessionFetchesRequested,
  appSessionFetchesSucceeded,
  appSessionFetchesFailed
} from '../actions'

import { removeStoredSessionKey, getStoredSessionKey } from '../storage'
import { clearSessionKey, updateSessionKey } from "../apis"

import { SUCCESS } from "../types"

function* logout() {
  try {
    yield put(stopUserFetchInterval())
    yield call(clearSessionKey)
    yield call(removeStoredSessionKey)
    yield put(logoutSucceeded())
  } catch(error) {
    yield put(logoutFailed())
    // TODO they still might be in-app, should we popup flashError? No session key so nothing will work. (most likely Logout will work.)
  }
}

function getUserStatus(state) {
  return state.getIn(["user", "details", "status"])
}

// Initial fetches after login or resume session
function* appSessionFetch() {
  // Fetch user, if haven't already
  let userStatus = yield select(getUserStatus)
  if(userStatus !== SUCCESS) {
    yield put(fetchUserRequested())
    const result = yield race({
      success: take(FETCH_USER_SUCCEEDED),
      fail: take(FETCH_USER_FAILED),
    })

    if(result && result.fail) {
      yield put(appSessionFetchesFailed())
    }
  }

  yield put(appSessionFetchesSucceeded())

  /*
  // (No longer fetching assets at the very start.)
  //
  // Only fetch assets if userFetch was successful
  if(userStatus === SUCCESS) {
    console.log("SUCCESS")
    yield put(fetchAssetsRequested())
    const result = yield race({
      success: take(FETCH_ASSETS_SUCCEEDED),
      fail: take(FETCH_ASSETS_FAILED),
    })

    if(result && result.success) {
      console.log("SUCCESS")
    }
  }
  */
}

export default function* (): Iterable<any>{
  yield takeEvery(LOGOUT_REQUESTED, logout)
  yield takeLatest(APP_SESSION_FETCHES_REQUESTED, appSessionFetch)

  while(true) {
    const result = yield race({
      loginSucceeded: take(LOGIN_SUCCEEDED),
      loginFailed: take(LOGIN_FAILED),
      confirmEmailAddressSucceeded: take(CONFIRM_EMAIL_ADDRESS_SUCCEEDED),
      resumeRequested: take(RESUME_SESSION_REQUESTED),
      resumeFailed: take(RESUME_SESSION_FAILED)
    })

    if (result && (result.loginSucceeded || result.confirmEmailAddressSucceeded)) {
      yield put(appSessionFetchesRequested())
    } else if (result && result.resumeRequested) {
      try {
        yield put(resetUserState())
        yield call(updateSessionKey, getStoredSessionKey())
        yield put(fetchUserRequested())

        const result = yield race({
          success: take(FETCH_USER_SUCCEEDED),
          fail: take(FETCH_USER_FAILED)
        })

        if (result && result.success) {
          yield put(resumeSessionSucceeded())
          yield put(appSessionFetchesRequested())
        } else {
          yield put(resumeSessionFailed())
          yield put(flashErrorsReset())  // logout/401 will display error msg
        }

      } catch (error) {
        yield put(resumeSessionFailed())
        yield put(logoutRequested())
      }

    } else if (result && result.loginFailed && result.loginFailed.error && result.loginFailed.error.errorCode && result.loginFailed.error.errorCode === "INCORRECT_CODE") {
      continue // pass-thru for 2FA (don't logout)
    } else {
      yield put(logoutRequested())
    }
  }
}

