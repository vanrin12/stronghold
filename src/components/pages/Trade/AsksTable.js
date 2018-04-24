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

class AsksTable extends React.Component<Props> {
  handleRowClick = (data: Array<any>) => {
    this.props.priceChange(this.props.market.id, data[0], this.props.counterScale);
    this.props.amountChange(this.props.market.id, data[1], this.props.counterScale);
  }

  render() {

    const config: DataTableConfig = {
      columns: [`Price (${this.props.market.counter})`, this.props.market.base, this.props.market.counter, `Sum (${this.props.market.counter})`]
    }

      const truncatedData = _.take(this.props.data, 20)

    let sum = new BigNumber(0);
    const data = _.map(truncatedData, x => {
      const price = new BigNumber(x.price)
      const amount = new BigNumber(x.amount)
      const counterAmount = amount.times(price)
      sum = sum.plus(counterAmount)
      return [price.toFixed(this.props.counterScale), amount.toFixed(this.props.baseScale), counterAmount.toFixed(this.props.counterScale), sum.toFixed(this.props.counterScale)]
    })

    if(data.length > 0 && data.length < 10) {
      for(let i = 0; data.length < 10; i++) {
        data.push([]);
      }
    }

    return (
      <div className="Trade__AsksTable">
        <PagedDataTable
          title="Asks"
          config={config}
          data={data}
          onRowClick={this.handleRowClick}
          showEmptyLoader={true}
        />
      </div>
    )
  }
}

export default AsksTable
