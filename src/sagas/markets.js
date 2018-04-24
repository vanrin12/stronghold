// @flow
import { takeLatest, call, put, all } from 'redux-saga/effects'

import {
  MARKET_INFO_REQUESTED,
  MARKET_CHART_REQUESTED,
  MARKET_HISTORY_REQUESTED,
  ORDER_HISTORY_REQUESTED,
  MARKETS_TICKER_REQUESTED
} from '../actionTypes'

import {
  marketInfoRequested,
  marketInfoSucceeded,
  marketInfoFailed,

  marketChartRequested,
  marketChartSucceeded,
  marketChartFailed,

  marketHistoryRequested,
  marketHistorySucceeded,
  marketHistoryFailed,

  orderHistoryRequested,
  orderHistorySucceeded,
  orderHistoryFailed,

  marketsTickerRequested,
  marketsTickerSucceeded,
  marketsTickerFailed,

  fetchBalancesRequested,
  fetchOpenOrdersRequested
} from '../actions'

import * as Api from '../apis'

export function* tradePageIntervalRequests(marketId: number): Iterable<null> {
  if (marketId) {
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
}

function* marketInfoRequest(action: Object) {
  try {
    const marketData = yield call(Api.marketInfoRequest, action.marketId)
    yield put(marketInfoSucceeded(action.marketId, marketData))
  } catch(err) {
    yield put(marketInfoFailed(action.marketId))
  }
}

function* marketChartRequest(action: Object) {
  try {
    const chartData = yield call(Api.marketChartRequest, action.marketId)
    yield put(marketChartSucceeded(action.marketId, chartData))
  } catch(err) {
    yield put(marketChartFailed(action.marketId))
  }
}

function* marketHistoryRequest(action: Object) {
  try {
    const historyData = yield call(Api.marketHistoryRequest, action.marketId)
    yield put(marketHistorySucceeded(action.marketId, historyData))
  } catch(err) {
    yield put(marketHistoryFailed(action.marketId))
  }
}

function* orderHistoryRequest(action: Object) {
  try {
    const orderHistoryData = yield call(Api.orderHistoryRequest, action.marketId)
    yield put(orderHistorySucceeded(action.marketId, orderHistoryData))
  } catch(err) {
    yield put(orderHistoryFailed(action.marketId))
  }
}

function* marketsTickerRequest(action: Object) {
  try {
    const data = yield call(Api.marketsTickerRequest)
    yield put(marketsTickerSucceeded(data))
  } catch(err) {
    yield put(marketsTickerFailed())
  }
}

export default function* (): Iterable<any>{
  yield takeLatest(MARKET_INFO_REQUESTED, marketInfoRequest)
  yield takeLatest(MARKET_CHART_REQUESTED, marketChartRequest)
  yield takeLatest(MARKET_HISTORY_REQUESTED, marketHistoryRequest)
  yield takeLatest(ORDER_HISTORY_REQUESTED, orderHistoryRequest)

  yield takeLatest(MARKETS_TICKER_REQUESTED, marketsTickerRequest)
}
