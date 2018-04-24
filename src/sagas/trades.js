// @flow
import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import {
  TRADE_BUY_REQUESTED,
  TRADE_SELL_REQUESTED,
  TRADE_CANCEL_ORDER_REQUESTED
} from '../actionTypes'

import {
  tradeBuySucceeded,
  tradeBuyFailed,
  tradeSellSucceeded,
  tradeSellFailed,
  tradeCancelOrderSucceeded,
  tradeCancelOrderFailed,
  fetchBalancesRequested,
  fetchOpenOrdersRequested,
  stopUserFetchInterval,
  startUserFetchInterval
} from '../actions'

import * as Api from '../apis'

function handleTradeError(error, type) {
  let errMsg = "Sorry, there was an error with your trade."

  if (error) {
    const { errorCode, requestId } = error

    // Get the request Id
    let errReqId = ""
    if (requestId) {
      errReqId = "\nid:" + requestId
    }

    if ( errorCode === "INSUFFICIENT_FUNDS" ) {
      errMsg = "You have insufficient funds and cannot place this trade." + errReqId
    } else if( errorCode === "TRADE_CROSS_SELF" ) {
      errMsg = "You cannot place a trade that crosses one of your existing offers. Please check your price." + errReqId

    // Default error toast with requestId
    } else if(error.requestId) {

      if (type === "buy") {
        errMsg = "There was an error with your buy transaction." + errReqId
      } else if (type === "sell") {
        errMsg = "There was an error with your sell transaction." + errReqId
      } else {
        errMsg = "There was an error with your transaction." + errReqId
      }

    }
  }

  // Fire the Toast, side effect
  toast.error(errMsg, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: false
  })

}

function* buy(action: Object) {
  yield put(stopUserFetchInterval())  // stop userFetchInterval for trade priorty (response lag)
  try {
    yield call(Api.tradeBuy, {
      marketId: action.marketId,
      price: action.price,
      amount: action.amount
    })
    yield put(tradeBuySucceeded())
    yield refreshUserData()
    toast.success('Your buy order has been successfully placed.', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  } catch(err) {
    yield put(tradeBuyFailed(err))
    handleTradeError(err, "buy")
  }
  yield put(startUserFetchInterval())
}

function* sell(action: Object) {
  yield put(stopUserFetchInterval())  // stop userFetchInterval for trade priorty (response lag)
  try {
    yield call(Api.tradeSell, {
      marketId: action.marketId,
      price: action.price,
      amount: action.amount
    })
    yield put(tradeSellSucceeded())
    yield refreshUserData()
    toast.success('Your sell order has been successfully placed.', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  } catch(err) {
    yield put(tradeSellFailed(err))
    handleTradeError(err, "sell")
  }
  yield put(startUserFetchInterval())
}

function* cancelOrder(action: Object) {
  const { orderId } = action
  try {
    yield call(Api.tradeCancelOrder, orderId)
    yield put(tradeCancelOrderSucceeded( orderId ))
    yield refreshUserData()
    toast.success('Order cancellation succeeded.', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  } catch(err) {
    yield put(tradeCancelOrderFailed( orderId ))
    toast.error('There was an error with your order cancellation.', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }
}

function* refreshUserData() {
  yield put(fetchBalancesRequested())
  yield put(fetchOpenOrdersRequested())
}

export default function* (): Iterable<any>{
  yield takeLatest(TRADE_BUY_REQUESTED, buy)
  yield takeLatest(TRADE_SELL_REQUESTED, sell)
  yield takeEvery(TRADE_CANCEL_ORDER_REQUESTED, cancelOrder)
}
