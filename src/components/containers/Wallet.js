// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import Wallet from '../pages/Wallet'
import {
  walletPageFetchesRequested,
  startUserFetchInterval,
  stopUserFetchInterval,
  configUserFetchInterval,
  showSendFundsModal,
  hideSendFundsModal,
  showReceiveFundsModal,
  hideReceiveFundsModal,
  federationRequested,
  importWalletRequested,
  //sendFundsCreationRequested,  // for Async
  sendFundsRequested,  // for Synchronous
  clearSendFundsError
} from '../../actions'

import { LOADING, SUCCESS } from "../../types"

const mapStateToProps = (state, ownProps) => {
  const user = state.get('user');
  return {
    assets: user.getIn(["assets", "data"]) || {},
    balances: user.getIn(["balances", "data"]) || [],
    transactions: user.getIn(["walletTransactions", "data"]),
    sendModal: user.getIn(["app", "wallet", "sendModal"]),
    receiveModal: user.getIn(["app", "wallet", "receiveModal"]),
    isSending: user.getIn(["app", "wallet", "fundsIsSending"]),
    receivingAddresses: user.getIn(["app", "wallet", "receivingAddresses"]),
    federationResult: user.getIn(["app", "wallet", "federation"]),
    transactionsIsFetching: user.getIn(["walletTransactions", "status"]) === LOADING,
    transactionsHasFetched: user.getIn(["walletTransactions", "status"]) === SUCCESS,
    importingWallet: user.getIn(["app", "wallet", "importingWallet"])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch( walletPageFetchesRequested() )
      dispatch( configUserFetchInterval({
        page: "wallet"
      }))
      dispatch( startUserFetchInterval() )
    },
    beforeUnmount:() => {
      dispatch( configUserFetchInterval({}))  // clear the config
      dispatch( stopUserFetchInterval() )
    },
    openModal: (type, asset) => {
      if( type === 'send' ) {
        dispatch( showSendFundsModal(asset) )
      } else if( type === 'receive' ){
        dispatch( showReceiveFundsModal(asset) )
      }
    },

    closeSendModal: (type, asset) => {
      dispatch(hideSendFundsModal())
    },

    closeReceiveModal: (type, asset) => {
      dispatch(hideReceiveFundsModal())
    },

    sendFunds: ({address, amount, memo, memoType, code, fees}) => {
      dispatch(sendFundsRequested({address, amount, memo, memoType, code, fees}))
    },

    clearSendFundsError: () => {
      dispatch(clearSendFundsError())
    },

    resolveFederation: (federationAddress) => {
      dispatch(federationRequested(federationAddress))
    },

    importWallet: (seed) => {
      dispatch(importWalletRequested(seed))
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Wallet))
