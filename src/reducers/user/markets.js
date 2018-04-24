// @flow

import {
  LOADING,
  SUCCESS,
  FAILURE
} from "../../types"

import {
  MARKET_INFO_REQUESTED,
  MARKET_INFO_SUCCEEDED,
  MARKET_INFO_FAILED,

  MARKET_CHART_REQUESTED,
  MARKET_CHART_SUCCEEDED,
  MARKET_CHART_FAILED,

  MARKET_HISTORY_REQUESTED,
  MARKET_HISTORY_SUCCEEDED,
  MARKET_HISTORY_FAILED,

  ORDER_HISTORY_REQUESTED,
  ORDER_HISTORY_SUCCEEDED,
  ORDER_HISTORY_FAILED
} from "../../actionTypes"

import { Map, fromJS } from "immutable"

export default function(state: Object, action: Object) {
  switch (action.type) {

    case MARKET_INFO_REQUESTED:
    case MARKET_CHART_REQUESTED:
    case MARKET_HISTORY_REQUESTED:
    case ORDER_HISTORY_REQUESTED:
      return state.mergeIn(["markets", action.marketId], Map({
        status: LOADING
      }))

    case MARKET_INFO_FAILED:
    case MARKET_CHART_FAILED:
    case MARKET_HISTORY_FAILED:
    case ORDER_HISTORY_FAILED:
      return state.setIn(["markets", action.marketId, "status"], FAILURE)

    case MARKET_INFO_SUCCEEDED:
      return state.mergeIn(["markets", action.marketId], fromJS({
        status: SUCCESS
      })).mergeIn(["markets", action.marketId, "data"], fromJS({
        bids: action.marketData.bids,
        asks: action.marketData.asks
      }))

    case MARKET_CHART_SUCCEEDED:
      return state.mergeIn(["markets", action.marketId], fromJS({
        status: SUCCESS
      })).mergeIn(["markets", action.marketId, "data"], fromJS({
        chartData: action.chartData
      }))

    case MARKET_HISTORY_SUCCEEDED:
      return state.mergeIn(["markets", action.marketId], fromJS({
        status: SUCCESS
      })).mergeIn(["markets", action.marketId, "data"], fromJS({
        historyData: action.historyData
      }))

    case ORDER_HISTORY_SUCCEEDED:
      return state.mergeIn(["markets", action.marketId], fromJS({
        status: SUCCESS
      })).mergeIn(["markets", action.marketId, "data"], fromJS({
        orderHistoryData: action.orderHistoryData
      }))

    default:
      return state
  }
}
