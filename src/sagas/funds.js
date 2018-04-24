// @flow
import { take, call, put, race, select, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { toast } from 'react-toastify'

import {
  SEND_FUNDS_REQUESTED,

  SEND_FUNDS_CREATION_REQUESTED,
  FETCH_WALLET_TRANSACTIONS_SUCCEEDED,
  FETCH_WALLET_TRANSACTIONS_FAILED,

  IMPORT_WALLET_REQUESTED
} from '../actionTypes'

import {
  sendFundsSucceeded,
  sendFundsFailed,

  sendFundsCreationSucceeded,
  sendFundsCreationFailed,
  sendFundsInitialConfirmationTimedOut,
  fetchWalletTransactionsRequested,
  fetchBalancesRequested,

  importWalletSucceeded,
  importWalletFailed
} from '../actions'

import * as Api from '../apis'

function getWalletBalance(state, code) {
  const balances = state.getIn(["user", "balances", "data"])
  const wallet = balances.filter( w => w.get("code") === code ).first()
  return wallet.get("amount")
}

// CURRENTLY SEND_FUNDS API is Synchronous
export function* sendFundsSynchronous (): Iterable<any>{
  // Don't take anymore SendFundsCreationRequest untill it either succeeds or fails
  while(true) {
    const action: any = yield take(SEND_FUNDS_REQUESTED)
    const walletBalance = yield select(getWalletBalance, action.code)
    try {
      yield call(Api.sendFunds, {
        address: action.address,
        amount: action.amount,
        code: action.code,
        memoType: action.memoType,
        memo: action.memo,
        fees: action.fees,
        walletBalance
      })

      yield put(sendFundsSucceeded())

      toast.success('Funds have successfully been sent.', {
        position: toast.POSITION.BOTTOM_CENTER
      })

      yield put(fetchWalletTransactionsRequested())

      const refreshTx = yield race({
        success: take(FETCH_WALLET_TRANSACTIONS_SUCCEEDED),
        fail: take(FETCH_WALLET_TRANSACTIONS_FAILED)
      })

      if(refreshTx && refreshTx.success) {
        yield put(fetchBalancesRequested())
      } else if(refreshTx && refreshTx.fail) {
        toast.info('Funds are on their way.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }

    } catch(err) {
      yield put(sendFundsFailed({
        errorCode: err.errorCode,  // API error codes
        requestId: err.requestId,
        timestamp: err.timestamp,
        code: err.code  // front-end error codes
      }))
    }


  }
}

// CURRENTLY SEND_FUNDS API is not Asynchronous
export function* sendFundsAsynchronous (): Iterable<any>{
  // Don't take anymore SendFundsCreationRequest untill it either succeeds or fails
  while(true) {
    const action: any = yield take(SEND_FUNDS_CREATION_REQUESTED)
    try {
      yield call(Api.sendFunds, {
        address: action.address,
        amount: action.amount,
        code: action.code,
        message: action.message
      })
      yield put(sendFundsCreationSucceeded())
      yield delay(5000)
      yield put(sendFundsInitialConfirmationTimedOut())

      yield put(fetchWalletTransactionsRequested())

      const refreshTx = yield race({
        success: take(FETCH_WALLET_TRANSACTIONS_SUCCEEDED),
        fail: take(FETCH_WALLET_TRANSACTIONS_FAILED)
      })

      if(refreshTx && refreshTx.success) {
        toast.success('Funds have successfully been sent.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
        yield put(fetchBalancesRequested())
      } else if(refreshTx && refreshTx.fail) {
        toast.info('Funds are on their way.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }

    } catch(err) {
      yield put(sendFundsCreationFailed())
    }


  }
}


function* importWallet(action: Object) {
  try {
    yield call(Api.importWallet, action.seed)
    yield put(importWalletSucceeded())
    window.location.href = "/?import=success#/wallet"  // reload page
  } catch(err) {
    yield put(importWalletFailed())
  }
}

export function* watchImportWallet(): Iterable<any> {
  yield takeLatest( IMPORT_WALLET_REQUESTED, importWallet )
}
