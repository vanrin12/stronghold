// @flow
import { takeLatest, put, race, take, all } from 'redux-saga/effects'

import {
  TRADE_PAGE_FETCHES_REQUESTED,
  TRADE_MARKET_FETCHES_REQUESTED,

  FETCH_MARKETS_SUCCEEDED,
  FETCH_MARKETS_FAILED,

  FETCH_ASSETS_SUCCEEDED,
  FETCH_ASSETS_FAILED,

  WALLET_PAGE_FETCHES_REQUESTED,
  TRANSACTIONS_PAGE_FETCHES_REQUESTED,
} from '../actionTypes'

import {
  fetchMarketsRequested,
  tradePageFetchesSucceeded,
  tradePageFetchesFailed,

  marketInfoRequested,
  marketChartRequested,
  marketHistoryRequested,
  orderHistoryRequested,
  marketsTickerRequested,
  fetchBalancesRequested,
  fetchOpenOrdersRequested,

  fetchAssetsRequested,
  fetchWalletTransactionsRequested,
  fetchTransactionsRequested,
  fetchExchangeRatesRequested
} from '../actions'


function* tradePageFetch(action) {
  yield put(fetchMarketsRequested())
  const result = yield race({
    success: take(FETCH_MARKETS_SUCCEEDED),
    fail: take(FETCH_MARKETS_FAILED)
  })

  if(result && result.success) {
    yield put(tradePageFetchesSucceeded())
  } else {
    yield put(tradePageFetchesFailed())
  }
}

function* tradeMarketFetch(action) {
  const { marketId } = action
  yield all([
    put(marketInfoRequested(marketId)),
    put(marketChartRequested(marketId)),
    put(marketHistoryRequested(marketId)),
    put(orderHistoryRequested(marketId)),
    put(marketsTickerRequested()),
    put(fetchBalancesRequested()),
    put(fetchOpenOrdersRequested())
  ])
}

function* walletPageFetch(action) {
  // Fetch assets, balances & transactions
  // Ensure successful assets fetch before fetching the rest

  yield put(fetchAssetsRequested())
  const result = yield race({
    success: take(FETCH_ASSETS_SUCCEEDED),
    fail: take(FETCH_ASSETS_FAILED),
  })

  if(result && result.success) {
    yield all([
      put(fetchBalancesRequested()),
      put(fetchWalletTransactionsRequested()),
      put(fetchExchangeRatesRequested())
    ])
  }
}

function* transactionsPageFetch(action) {
  yield put(fetchTransactionsRequested())
}


export default function* (): Iterable<any>{
  yield takeLatest(TRADE_PAGE_FETCHES_REQUESTED, tradePageFetch)
  yield takeLatest(TRADE_MARKET_FETCHES_REQUESTED, tradeMarketFetch)
  yield takeLatest(WALLET_PAGE_FETCHES_REQUESTED, walletPageFetch)
  yield takeLatest(TRANSACTIONS_PAGE_FETCHES_REQUESTED, transactionsPageFetch)
}
