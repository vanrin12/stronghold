// @flow
import { call, put, takeLatest, all, race, take, select } from 'redux-saga/effects'

import {
  FETCH_USER_REQUESTED,
  FETCH_USER_SECURITY_REQUESTED,
  FETCH_ASSETS_REQUESTED,
  FETCH_ASSETS_SUCCEEDED,
  FETCH_ASSETS_FAILED,
  FETCH_MARKETS_REQUESTED,
  FETCH_BALANCES_REQUESTED,
  FETCH_WALLET_TRANSACTIONS_REQUESTED,
  FETCH_TRANSACTIONS_REQUESTED,
  FETCH_EXCHANGE_RATES_REQUESTED,
  FETCH_OPEN_ORDERS_REQUESTED,
  SHOW_RECEIVE_FUNDS_MODAL
} from '../actionTypes'

import {
  flashError,

  fetchUserSucceeded,
  fetchUserFailed,

  fetchUserSecuritySucceeded,
  fetchUserSecurityFailed,

  fetchAssetsRequested,
  fetchAssetsSucceeded,
  fetchAssetsFailed,

  fetchMarketsSucceeded,
  fetchMarketsFailed,

  fetchBalancesRequested,
  fetchBalancesSucceeded,
  fetchBalancesFailed,

  fetchAddressSucceeded,
  fetchAddressFailed,

  fetchExchangeRatesSucceeded,
  fetchExchangeRatesFailed,

  fetchOpenOrdersSucceeded,
  fetchOpenOrdersFailed,

  fetchWalletTransactionsRequested,
  fetchWalletTransactionsSucceeded,
  fetchWalletTransactionsFailed,

  fetchTransactionsRequested,
  fetchTransactionsSucceeded,
  fetchTransactionsFailed
} from '../actions'

import { NOT_ASKED, LOADING, SUCCESS } from "../types"

import * as Api from '../apis'

export function* walletPageIntervalRequests(): Iterable<null> {
  yield all([
    put(fetchBalancesRequested()),
    put(fetchWalletTransactionsRequested())
  ])
}

export function* transactionsPageIntervalRequests(): Iterable<null> {
  yield all([
    put(fetchTransactionsRequested())
  ])
}

export function* fetchUser(action: Object): Iterable<any> {
  try {
    const user = yield call(Api.fetchUser)
    yield put(fetchUserSucceeded(user))
  } catch (error) {
    yield put(fetchUserFailed())
    // Don't show a flashError for this.
  }
}

export function* fetchUserSecurity(action: Object): Iterable<any> {
  try {
    const data: any = yield call(Api.fetchUserSecurity)
    if(data && typeof data.has2FA === "boolean") {
      yield put(fetchUserSecuritySucceeded(data))
    } else {
      throw new Error("Has no has2FA.")
    }
  } catch (error) {
    yield put(fetchUserSecurityFailed())
  }
}

function* fetchAssets(action) {
  try {
    const assets = yield call(Api.fetchAssets)
    yield put(fetchAssetsSucceeded(assets))
  } catch (error) {
    yield put(fetchAssetsFailed())
    yield put(flashError("A connection error occurred. Please check your internet connection and try again."))
  }
}

function* fetchMarkets(action) {
    try {
        const markets = yield call(Api.fetchMarkets)
        yield put(fetchMarketsSucceeded(markets))
    } catch (error) {
        yield put(fetchMarketsFailed())
        yield put(flashError("Market data is currently unavailable, please try again later."))
    }
}

function getAssetsStatus(state) {
  return state.getIn(["user", "assets", "status"])
}

function* fetchBalances(action) {
  // balances reducer requires assets (for assets priorty ranking)
  let assetsStatus = yield select(getAssetsStatus)
  if(assetsStatus === NOT_ASKED) {
    yield put(fetchAssetsRequested())
  }
  if(assetsStatus === NOT_ASKED || assetsStatus === LOADING) {
    const result = yield race({
      success: take(FETCH_ASSETS_SUCCEEDED),
      fail: take(FETCH_ASSETS_FAILED)
    })

    if(result && result.success) {
      assetsStatus = SUCCESS
    }
  }
  try {
    if(assetsStatus === SUCCESS) {
      const balances = yield call(Api.fetchBalances)
      yield put(fetchBalancesSucceeded(balances))
    }else {
      throw new Error("Assets failed to fetch.")
    }
  } catch (error) {
    yield put(fetchBalancesFailed())
    yield put(flashError("A connection error occurred. Please check your internet connection and try again."))
  }
}

function* fetchWalletTransactions(action) {
  try {
    const transactions = yield call(Api.fetchWalletTransactions)
    yield put(fetchWalletTransactionsSucceeded(transactions))
  } catch (error) {
    yield put(fetchWalletTransactionsFailed())
    yield put(flashError("A connection error occurred. Please check your internet connection and try again."))
  }
}

function* fetchTransactions(action) {
  try {
    const transactions = yield call(Api.fetchTransactions)
    yield put(fetchTransactionsSucceeded(transactions))
  } catch (error) {
    yield put(fetchTransactionsFailed())
    yield put(flashError("A connection error occurred. Please check your internet connection and try again."))
  }
}

function* fetchExchangeRates(action) {
  try {
    const rates = yield call(Api.fetchExchangeRates)
    yield put(fetchExchangeRatesSucceeded(rates))
  } catch (error) {
    yield put(fetchExchangeRatesFailed())
    // Site should still work with exchangeRates, don't show an error.
  }
}

function* fetchOpenOrders(action) {
  try {
    const orders = yield call(Api.fetchOpenOrders)
    yield put(fetchOpenOrdersSucceeded(orders))
  } catch (error) {
    yield put(fetchOpenOrdersFailed())
    yield put(flashError('Something went wrong while fetching open orders.'))
  }
}

function* fetchAddress(action) {
  try {
    const address = yield call(Api.fetchAddress, action.asset.code)
    yield put(fetchAddressSucceeded(address))
  } catch(err) {
    yield put(fetchAddressFailed(action.asset.code))
  }
}

/*
// NO LONGER BEING USED
function* fetchAddresses(action) {
  if (action && action.balances && action.balances.length) {

    for(let i=0; i<action.balances.length; i++) {
      try {
        const balance = action.balances[i]
        const address = yield call(Api.fetchAddress, balance.code)
        yield put(fetchAddressSucceeded(address))
      } catch(err) {
        yield put(fetchAddressFailed())
      }
    }

  }
}
*/

export default function* (): Iterable<any>{
  yield takeLatest(FETCH_USER_REQUESTED, fetchUser)
  yield takeLatest(FETCH_USER_SECURITY_REQUESTED, fetchUserSecurity)
  yield takeLatest(FETCH_ASSETS_REQUESTED, fetchAssets)
  yield takeLatest(FETCH_MARKETS_REQUESTED, fetchMarkets)
  yield takeLatest(FETCH_BALANCES_REQUESTED, fetchBalances)
  yield takeLatest(FETCH_WALLET_TRANSACTIONS_REQUESTED, fetchWalletTransactions)
  yield takeLatest(FETCH_TRANSACTIONS_REQUESTED, fetchTransactions)
  yield takeLatest(FETCH_EXCHANGE_RATES_REQUESTED, fetchExchangeRates)
  yield takeLatest(FETCH_OPEN_ORDERS_REQUESTED, fetchOpenOrders)
  yield takeLatest(SHOW_RECEIVE_FUNDS_MODAL, fetchAddress)
}
