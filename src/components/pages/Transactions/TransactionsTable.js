// @flow
import * as React from 'react'

import { ClipLoader as Loader } from 'halogenium'

import BsTable from '../../molecules/BsTable'

import {transactionTable, basicTableConfig} from '../../../config/transactionTable.config'

import type { WalletTransactionType } from '../../../types'

type Props = {
  transactions: Array<WalletTransactionType>,
  isFetching: boolean,
  hasFetched: boolean
}

class TransactionsTable extends React.Component<Props> {
  render() {
    const { transactions } = this.props
    let transactionContent = [];

    if (transactions && transactions.length) {
      return (
        <BsTable
          tableTitle="Recent Transactions"
          tableData={transactions}
          tableContainerClass="order-table"
          columnConfig={transactionTable}
          tableBasicOptions={basicTableConfig}
          tablePagination
        />
      )
    } else if (this.props.hasFetched) {
      transactionContent = (
        <div key="txe--none">
          <span>No recent transactions</span>
        </div>
      )
    }

    if (this.props.isFetching) {
      transactionContent = (
        <div key="txe--loading">
          <Loader size="18px" color="#4A90E2" className="TxHistory__Loader" />
        </div>
      );
    }

    return (
      <div className="TransactionsTable">
        {transactionContent}
      </div>
    )
  }
}

export default TransactionsTable
