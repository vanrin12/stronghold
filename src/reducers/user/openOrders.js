// @flow

import {
  LOADING,
  SUCCESS,
  FAILURE
} from "../../types"

import {
  FETCH_OPEN_ORDERS_REQUESTED,
  FETCH_OPEN_ORDERS_SUCCEEDED,
  FETCH_OPEN_ORDERS_FAILED,

  TRADE_CANCEL_ORDER_REQUESTED,
  TRADE_CANCEL_ORDER_SUCCEEDED,
  TRADE_CANCEL_ORDER_FAILED

} from "../../actionTypes"

import { Map, fromJS } from "immutable"

export default function(state: Object, action: Object) {
  switch (action.type) {

    case FETCH_OPEN_ORDERS_REQUESTED:
      return state.setIn(["openOrders", "status"], LOADING)

      case FETCH_OPEN_ORDERS_SUCCEEDED:
      const orders = action.orders
      return state.mergeIn(["openOrders"], Map({
        status: SUCCESS,
        data: fromJS(orders)
      }))

    case FETCH_OPEN_ORDERS_FAILED:
      return state.setIn(["openOrders", "status"], FAILURE)

    case TRADE_CANCEL_ORDER_REQUESTED:
      return cancelOrder(state, action.orderId, LOADING)

    case TRADE_CANCEL_ORDER_SUCCEEDED:
      return cancelOrder(state, action.orderId, SUCCESS)

    case TRADE_CANCEL_ORDER_FAILED:
      return cancelOrder(state, action.orderId, FAILURE)

    default:
      return state
  }
}

function cancelOrder(state, orderId, status) {
  const openOrders = state.getIn(["openOrders", "data"])

  if (openOrders.size) {
    const index = openOrders.findIndex( order => {
      return order.get("orderId") === orderId
    })
    if ( index >= 0 ) {
      return state.setIn(["openOrders", "data", index, "cancelStatus"], status)
    }
  }
  return state
}
