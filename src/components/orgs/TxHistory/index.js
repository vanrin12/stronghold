// @flow
import * as React from 'react'
import _ from 'lodash'

import { ClipLoader as Loader } from 'halogenium'

import TxHistoryEntry from './TxHistoryEntry'

import './index.css'
import type { WalletTransactionType, AssetType } from '../../../types'

type Props = {
  transactions: Array<WalletTransactionType>,
  assets: { [string]: AssetType},
  isFetching: boolean,
  hasFetched: boolean
}

class TxHistory extends React.Component<Props> {
  render() {
    const { transactions } = this.props
    let txRows = []

    if (transactions && transactions.length) {
      txRows = _.chain(transactions).orderBy('timestamp', 'desc').take(8).map((tx, index) => {
        return (
          <TxHistoryEntry
            {...tx}
            asset={this.props.assets[tx.code] || {}}
            key={'txe--'+ index + '-' + tx.timestamp}
          />
        )
      }).value()
    } else if (this.props.hasFetched) {
      txRows = [
        <tr key="txe--none">
          <td>No recent transactions</td>
        </tr>
      ]
    }

    let loaderClass = ''
    if (this.props.isFetching) {
      loaderClass = "TxHistory__Loader--visible"
    }
    const loader = (
      <Loader size="18px" color="#4A90E2" className={"TxHistory__Loader " + loaderClass} />
    )

    // TODO If no transactions, show empty message?

    return (
      <table className="TxHistory border--round table--alternate-row">
        <thead>
          <tr>
            <th>Recent Transactions { loader }</th>
          </tr>
        </thead>
        <tbody>
          { txRows }
        </tbody>
      </table>
    );
  }
}

export default TxHistory;
