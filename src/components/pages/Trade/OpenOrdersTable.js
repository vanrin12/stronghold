// @flow
import * as React from 'react'
import BigNumber from "bignumber.js"
import _ from "lodash"

import type { MarketType, OpenOrderType, DataTableConfig } from '../../../types'

import PagedDataTable from "./PagedDataTable"

import OpenOrdersRow from "./OpenOrdersRow"

type Props = {
    market: MarketType,
    data: Array<OpenOrderType>,
    baseScale: number,
    counterScale: number,
    cancelOrder: Function
}

class OpenOrdersTable extends React.Component<Props> {
    render() {
        const config: DataTableConfig = {
          columns: ["Type", `Price (${this.props.market.counter})`, this.props.market.base, this.props.market.counter, ""]
        }

        const marketData = _.orderBy((_.filter(this.props.data, x => x.marketId === this.props.market.id)), x => x.price, ['desc', 'asc']);
        const data = _.map(marketData, x => {
          let price = new BigNumber(x.price);
          let amount = new BigNumber(x.amount);
          let counterAmount = amount.times(price);

          // TODO: Temporary while still on the non v-1 APIs.
          if (x.type === "Buy") {
            price = new BigNumber(1).div(price);
            counterAmount = [amount, amount = counterAmount][0];
          }

          let type;
          if (typeof x.type === "string" && x.type.toLowerCase() === 'buy') {
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

          return [
            type,
            price.toFixed(this.props.counterScale),
            amount.toFixed(this.props.baseScale),
            counterAmount.toFixed(this.props.counterScale),
            x.orderId + "," + x.cancelStatus
          ]
        });

        return (
            <div className="Trade__OpenOrdersTable">
                <PagedDataTable
                  title="Open Orders"
                  config={config}
                  data={data}
                  Row={ OpenOrdersRow }
                  onRowAction={ this.props.cancelOrder }
                />

            </div>
        )
    }
}
export default OpenOrdersTable
