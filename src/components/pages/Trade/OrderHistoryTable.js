// @flow
import * as React from 'react'
import _ from "lodash"
import moment from "moment"

//import { basicTableConfig, ordersColumnCheckboxList, orderHistoryColumnConfig } from '../../../config/tradingTable.config'
//import { openOrdersData } from '../../../config/TablesDummyData'

//import BoxedTable from '../../orgs/BoxedTable'
import DataTable from "./DataTable"

import type { MarketType, HistoryData, DataTableConfig } from '../../../types'

type Props = {
  market: MarketType,
  data: Array<HistoryData>,
  baseScale: number,
  counterScale: number
}

class OrderHistoryTable extends React.Component<Props> {
  render() {
    const config: DataTableConfig = {
      columns: ["Date", "Type", "Price", this.props.market.base]
    }
    const data = _.map(this.props.data, x => {
        const executedAt = moment(x.executedAt * 1000).format("L LTS")

      let type
      if(typeof x.type === "string" && x.type.toLowerCase() === 'buy') {
        type = {
          className: "cell--buy",
          value: x.type
        }
      } else {
        type = {
          className: "cell--sell",
          value: x.type
        }
      }

      return [executedAt, type, x.price, x.amount]
    })
    return (
      <div className="Trade__OrderHistoryTable">
        <DataTable
          title="My Recent Trade History"
          config={ config }
          data={ data }
        />
      </div>
    )
  }
  /*
  render() {
    return (
      <div className="Trade__OrderHistoryTable">
        <BoxedTable
            tableTitle="ETH ORDER HISTORY"
            searchTitle="Search"
            tableData={openOrdersData}
            tableBasicOptions={basicTableConfig}
            tableContainerClass="order-table"
            tablePagination
            sizePerPage
            tableExportCSV
            tableCSVFileName="open-orders.csv"
            customizeColumnTitle="Customize Column"
            customizeColumnCheckboxID="eth-history"
            customizeColumnListData={ordersColumnCheckboxList}
            columnConfig={orderHistoryColumnConfig}
        />
      </div>
    )
  }
  */
}

export default OrderHistoryTable
