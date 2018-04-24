// @flow
import { put, takeLatest, call } from 'redux-saga/effects'

import {
  FEDERATION_REQUESTED,
  FEDERATION_FAILED,
} from '../actionTypes'

import {
  federationSucceeded,
  federationFailed
} from '../actions'

import { resolveAddress } from "../apis/federation"
import { validateAddress } from "../apis/addressValidation"


export function* federation(action: Object): Iterable<any> {
  try {
    const federationResult = yield call(resolveAddress, action.federationAddress)
    if (federationResult && federationResult.account_id) {
      const validation = yield call(validateAddress, federationResult.account_id)
      yield put(federationSucceeded(federationResult || {account_id: "", stellar_address: ""}, validation))
    } else {
      throw new Error("Federation failed")
    }
  } catch (error) {
    console.log("Error", error)
    yield put(federationFailed())
  }
}

function* federationErrors({ error }) {

}

export default function* (): Iterable<any>{
  yield takeLatest(FEDERATION_REQUESTED, federation)
  yield takeLatest(FEDERATION_FAILED, federationErrors)
}
