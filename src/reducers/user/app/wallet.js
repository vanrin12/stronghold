// @flow

import {
  SHOW_SEND_FUNDS_MODAL,
  HIDE_SEND_FUNDS_MODAL,
  SHOW_RECEIVE_FUNDS_MODAL,
  HIDE_RECEIVE_FUNDS_MODAL,

  // FEDERATION ADDRESS
  FEDERATION_REQUESTED,
  FEDERATION_SUCCEEDED,
  FEDERATION_FAILED,

  // SYNC
  SEND_FUNDS_REQUESTED,
  SEND_FUNDS_SUCCEEDED,
  SEND_FUNDS_FAILED,
  CLEAR_SEND_FUNDS_ERROR,

  // ASYNC SEND FUNDS
  SEND_FUNDS_CREATION_REQUESTED,
  SEND_FUNDS_INITIAL_CONFIRMATION_TIMED_OUT,

  FETCH_ADDRESS_SUCCEEDED,
  FETCH_ADDRESS_FAILED,

  // Wallet Importing
  IMPORT_WALLET_REQUESTED,
  IMPORT_WALLET_SUCCEEDED,
  IMPORT_WALLET_FAILED
} from '../../../actionTypes'

import { NOT_ASKED, LOADING, SUCCESS, FAILURE } from "../../../types"

import { Map, fromJS } from "immutable"

export default function (state: Object, action: Object) {
  switch (action.type) {
    // Never show both the Send & Receive Modal at the same time.
    case SHOW_SEND_FUNDS_MODAL:
      return state.mergeIn(["app", "wallet"], fromJS({
        sendModal: action.asset,
        receiveModal: null
      }))
    case SHOW_RECEIVE_FUNDS_MODAL:
      return state.mergeIn(["app", "wallet"], fromJS({
        receiveModal: action.asset,
        sendModal: null,
        receivingAddresses: {  // clear receivingAddresses
          status: NOT_ASKED,
          data: {}
        }
      }))

    case HIDE_SEND_FUNDS_MODAL:
    case HIDE_RECEIVE_FUNDS_MODAL:
      return state.mergeIn(["app", "wallet"], fromJS({
        sendModal: null,
        receiveModal: null,
        receivingAddresses: {  // clear receivingAddresses
          status: NOT_ASKED,
          data: {}
        },
        federation: {
          federationAddress: null
        }
      }))

    case FETCH_ADDRESS_SUCCEEDED:
      return state.setIn(["app", "wallet", "receivingAddresses"], fromJS({
        status: SUCCESS,
        data: {
          [action.address.code]: {
            address: action.address.receivingAddress,
            qrData: action.address.qrData,
            stellarAddress: action.address.receivingStellarAddress,
            qrStellarData: action.address.qrStellarData
          }
        }
      }))
    case FETCH_ADDRESS_FAILED:
      return state.setIn(["app", "wallet", "receivingAddresses"], fromJS({
        status: FAILURE,
        data: {}
      }))

    case FEDERATION_REQUESTED:
      return state.mergeIn(["app", "wallet", "federation"], Map({
        status: LOADING
      }));

    case FEDERATION_SUCCEEDED:
      return state.setIn(["app", "wallet", "federation"], Map({
        status: SUCCESS,
        address: action.address,
        accountId: action.accountId,
        isValid: action.isValid,
        isStellarAddress: action.isStellarAddress,
        memoType: action.memoType,
        memo: action.memo
      }));

    case FEDERATION_FAILED:
      return state.setIn(["app", "wallet", "federation"], Map({
        status: FAILURE
      }));

    case SEND_FUNDS_REQUESTED:
    case SEND_FUNDS_CREATION_REQUESTED:
      return state.setIn(["app", "wallet", "fundsIsSending"], true)

    case SEND_FUNDS_SUCCEEDED:
    case SEND_FUNDS_INITIAL_CONFIRMATION_TIMED_OUT:
      return state.mergeIn(["app", "wallet"], Map({
        fundsIsSending: false,
        sendModal: null
      }))

    case SEND_FUNDS_FAILED:
      return state.mergeIn(["app", "wallet"], Map({
        fundsIsSending: false
      })).setIn(["app", "wallet", "sendModal", "error"], Map(action.error))

    case CLEAR_SEND_FUNDS_ERROR:
      return state.deleteIn(["app", "wallet", "sendModal", "error"])

    case IMPORT_WALLET_REQUESTED:
      return state.setIn(["app", "wallet", "importingWallet", "status"], LOADING)
    case IMPORT_WALLET_SUCCEEDED:
      return state.setIn(["app", "wallet", "importingWallet", "status"], SUCCESS)
    case IMPORT_WALLET_FAILED:
      return state.setIn(["app", "wallet", "importingWallet", "status"], FAILURE)


    default:
      return state
  }
}
