// @flow

import {
  TRADE_FORM_PRICE_CHANGED,
  TRADE_FORM_AMOUNT_CHANGED,
  TRADE_FORM_TOTAL_CHANGED,

  TRADE_BUY_REQUESTED,
  TRADE_BUY_SUCCEEDED,
  TRADE_BUY_FAILED,

  TRADE_SELL_REQUESTED,
  TRADE_SELL_SUCCEEDED,
  TRADE_SELL_FAILED,

  SHOW_TRADE_MODAL,
  HIDE_TRADE_MODAL
} from '../../../actionTypes'

import BigNumber from "bignumber.js"
import { Map, fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    case TRADE_FORM_PRICE_CHANGED: {
      const amount = state.getIn(["app", "trade", action.marketId, "form", "amount"]) || 0

      let total
      try {
        total = new BigNumber(amount).times(action.price || 0).toFixed(7).toString()
      } catch(err) {
        total = ""
      }
      return state.mergeIn(["app", "trade", action.marketId, "form"], Map({
        "price": action.price,
        total
      }))
    }
    case TRADE_FORM_AMOUNT_CHANGED: {
      const price = state.getIn(["app", "trade", action.marketId, "form", "price"]) || 0

      let total
      try {
        total =  new BigNumber(price).times(action.amount || 0).toFixed(7).toString()
      } catch(err) {
        total = ""
      }
      return state.mergeIn(["app", "trade", action.marketId, "form"], Map({
        "amount": action.amount,
        total
      }))
    }
    case TRADE_FORM_TOTAL_CHANGED:{
      const price = state.getIn(["app", "trade", action.marketId, "form", "price"]) || 0
      const amount = state.getIn(["app", "trade", action.marketId, "form", "amount"])

      let newAmount
      try {
        newAmount = new BigNumber(action.total).dividedBy(price).toFixed(action.baseScale)
        if (newAmount === "Infinity" || newAmount === "NaN") throw new Error("divideByZero")
      } catch(err) {
        newAmount = amount
      }

      return state.mergeIn(["app", "trade", action.marketId, "form"], Map({
        "amount": newAmount,
        "total": action.total
      }))
    }

    case SHOW_TRADE_MODAL:
      return state.mergeIn(["app", "trade"], fromJS({
        tradeModal: true,
        tradeActionType: action.tradeActionType
      }))

    case HIDE_TRADE_MODAL:
      return state.mergeIn(["app", "trade"], fromJS({
        tradeModal: false,
        tradeActionType: null
      }))

    case TRADE_BUY_REQUESTED:
    case TRADE_SELL_REQUESTED:
      return state.setIn(["app", "trade", "isProcessing"], true)

    case TRADE_BUY_SUCCEEDED:
    case TRADE_BUY_FAILED:
    case TRADE_SELL_SUCCEEDED:
    case TRADE_SELL_FAILED:
      return state.setIn(["app", "trade", "isProcessing"], false)

    default:
      return state
  }
}
