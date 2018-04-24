// @flow
import * as React from 'react'
import _ from "lodash"
import moment from "moment"

//import {  basicTableConfig, marketHistoryColumnConfig } from '../../../config/tradingTable.config'
//import { marketHistory } from '../../../config/TablesDummyData'

//import BoxedTable from '../../orgs/BoxedTable'
import DataTable from "./DataTable"

import type { MarketType, HistoryData, DataTableConfig } from '../../../types'

type Props = {
  market: MarketType,
  data: Array<HistoryData>,
  baseScale: number,
  counterScale: number
}

class MarketHistoryTable extends React.Component<Props> {
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
      <div className="Trade__MarketHistoryTable">
        <DataTable
          title="Recent Market History"
          config={ config }
          data={ data }
        />
        {/*
        <BoxedTable
            tableTitle="Market History"
            searchTitle="Search"
            tableData={marketHistory}
            tableBasicOptions={basicTableConfig}
            tableContainerClass="order-table"
            tablePagination
            sizePerPage
            columnConfig={marketHistoryColumnConfig}
        />
        */}
      </div>
    )
  }
}

export default MarketHistoryTable
