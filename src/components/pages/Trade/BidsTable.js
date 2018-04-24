// @flow
import * as React from 'react'
import BigNumber from "bignumber.js"
import _ from "lodash"

import type { MarketType, OrderbookOrderType, DataTableConfig } from '../../../types'

import PagedDataTable from "./PagedDataTable"

type Props = {
    market: MarketType,
    data: Array<OrderbookOrderType>,
    priceChange: Function,
    amountChange: Function,
    baseScale: number,
    counterScale: number
}

class BidsTable extends React.Component<Props> {
  handleRowClick = (data: Array<any>) => {
      this.props.priceChange(this.props.market.id, data[3], this.props.counterScale);
      this.props.amountChange(this.props.market.id, data[2], this.props.counterScale)
  }

  render() {

    const config: DataTableConfig = {
      columns: [`Sum (${this.props.market.counter})`, this.props.market.counter, this.props.market.base, `Price (${this.props.market.counter})`]
    }
      const truncatedData = _.take(this.props.data, 20)

      let sum = new BigNumber(0);
      const data = _.map(truncatedData, x => {
          const price = new BigNumber(x.price)
          const amount = new BigNumber(x.amount)
          const counterAmount = amount.times(price)
          sum = sum.plus(counterAmount)
          return [sum.toFixed(this.props.counterScale), counterAmount.toFixed(this.props.counterScale), amount.toFixed(this.props.baseScale), price.toFixed(this.props.counterScale)]
      })

    if(data.length > 0 && data.length < 10) {
      for(let i = 0; data.length < 10; i++) {
        data.push([]);
      }
    }
    return (
      <div className="Trade__BidsTable">
        <PagedDataTable
          title="Bids"
          config={config}
          data={data}
          onRowClick={this.handleRowClick}
          showEmptyLoader={true}
        />
      </div>
    )
  }
}
export default BidsTable
