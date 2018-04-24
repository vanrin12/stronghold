// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import Transactions from '../pages/Transactions'

import {
  transactionsPageFetchesRequested,
  configUserFetchInterval,
  startUserFetchInterval,
  stopUserFetchInterval
} from '../../actions'

const mapStateToProps = (state, ownProps) => {
  const user = state.get('user')
  return {
    transactions: user.getIn(["transactions", "data"]),
    status: user.getIn(["transactions", "status"])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch( transactionsPageFetchesRequested() )
      dispatch( configUserFetchInterval({
        page: "transactions"
      }))
      dispatch( startUserFetchInterval(10000) )
    },
    beforeUnmount:() => {
      dispatch( configUserFetchInterval({}))  // clear the config
      dispatch( stopUserFetchInterval() )
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Transactions))
