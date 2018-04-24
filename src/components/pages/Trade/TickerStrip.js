// @flow
import * as React from 'react'

import type { MarketType, BalanceType, MarketTickerData } from '../../../types'

//import { balanceTable } from '../../../config/tradingTable.config'
//import { tradingGlobal } from '../../../config/TablesDummyData'

//import TradingTable from '../../orgs/Trading/TradingTable'

import Ticker from "../../molecules/Ticker"
import DollarAmount from "../../atoms/DollarAmount"

import "./TickerStrip.css"

type Props = {
  market: MarketType,
  marketBalances: Array<BalanceType>,
  convert: Function,
  marketData: Object,
  priceChange: Function,
  amountChange: Function,
  ticker: MarketTickerData
}

type State = {
  balancesConversion: Object,
  askPrice: string,
  askValue: string,
  bidPrice: string,
  bidValue: string,
  volumePrice: string,
  volumeValue: string,
  lastPrice: string,
  lastPriceValue: string,
  lowPrice: string,
  lowPriceValue: string,
  highPrice: string,
  highPriceValue: string
}

class TickerStrip extends React.Component<Props, State> {
  state = {
    balancesConversion: {},
    askPrice: "",
    askValue: "",
    bidPrice: "",
    bidValue: "",
    volumePrice: "",
    volumeValue: "",
    lastPrice: "",
    lastPriceValue: "",
    lowPrice: "",
    lowPriceValue: "",
    highPrice: "",
    highPriceValue: ""
  }

  handleClickPrice = (price: string) => {
    if (price !== "") {
      this.props.priceChange(this.props.market.id, price)
    }
  }

  handleClickAmount = (amount: string) => {
    if (amount !== "") {
      this.props.amountChange(this.props.market.id, amount)
    }
  }

  async _componentWillReceiveProps(nextProps: Props) {
    const balancesConversion = {}

    for(let i=0; i<nextProps.marketBalances.length; i++) {
      const balance = nextProps.marketBalances[i]
      balancesConversion[balance.code] = await nextProps.convert(balance.amount, {from:balance.code, to:"USD"})
    }

    // Ask
    let askPrice = ""
    let askValue = ""

    if (nextProps.marketData.asks && nextProps.marketData.asks.length) {
      askPrice = nextProps.marketData.asks[0].price
      askValue = await nextProps.convert(askPrice, {from:nextProps.market.counter, to:"USD"})
    }

    // Bid
    let bidPrice = ""
    let bidValue = ""

    if (nextProps.marketData.bids && nextProps.marketData.bids.length) {
      bidPrice = nextProps.marketData.bids[0].price
      bidValue = await nextProps.convert(bidPrice, {from:nextProps.market.counter, to:"USD"})
    }


    // Volume
    let volumePrice = ""
    let volumeValue = ""

    if (nextProps.ticker && nextProps.ticker.id) {  // if there's data in ticker
      volumePrice = nextProps.ticker.volume
      volumeValue = await nextProps.convert(volumePrice, {from:nextProps.market.counter, to:"USD"})
    }

    // LastPrice
    let lastPrice = ""
    let lastPriceValue = ""

    if (nextProps.ticker && nextProps.ticker.id) {  // if there's data in ticker
      lastPrice = nextProps.ticker.last
      lastPriceValue = await nextProps.convert(lastPrice, {from:nextProps.market.counter, to:"USD"})
    }

    // LowPrice
    let lowPrice = ""
    let lowPriceValue = ""

    if (nextProps.ticker && nextProps.ticker.id) {  // if there's data in ticker
      lowPrice = nextProps.ticker.low
      lowPriceValue = await nextProps.convert(lowPrice, {from:nextProps.market.counter, to:"USD"})
    }

    // HighPrice
    let highPrice = ""
    let highPriceValue = ""

    if (nextProps.ticker && nextProps.ticker.id) {  // if there's data in ticker
      highPrice = nextProps.ticker.high
      highPriceValue = await nextProps.convert(highPrice, {from:nextProps.market.counter, to:"USD"})
    }

    this.setState({
      balancesConversion,
      askPrice,
      askValue,
      bidPrice,
      bidValue,
      volumePrice,
      volumeValue,
      lastPrice,
      lastPriceValue,
      lowPrice,
      lowPriceValue,
      highPrice,
      highPriceValue
    })
  }

  componentWillReceiveProps(nextProps: Props) {
    this._componentWillReceiveProps(nextProps)  // for flow
  }

  render() {
    // Only show balances of base/counter
    const balances = this.props.marketBalances.map((balance)=>{

      const sub = (
        <DollarAmount>
          { this.state.balancesConversion[balance.code] }
        </DollarAmount>
      )

      return (
        <Ticker
          title={balance.code + " Balance"}
          key={balance.code}
          main={balance.amount}
          sub={ sub }
          onClick={ balance.code === this.props.market.base ? this.handleClickAmount : void 0 }
        />
      )
    })


    const askSub = <DollarAmount>{ this.state.askValue }</DollarAmount>
    const bidSub = <DollarAmount>{ this.state.bidValue }</DollarAmount>
    const volumeSub = <DollarAmount>{ this.state.volumeValue }</DollarAmount>
    const lastPriceSub = <DollarAmount>{ this.state.lastPriceValue }</DollarAmount>
    const lowPriceSub = <DollarAmount>{ this.state.lowPriceValue }</DollarAmount>
    const highPriceSub = <DollarAmount>{ this.state.highPriceValue }</DollarAmount>

    return (
      <div className="TickerStrip">
        { balances }
        <Ticker
          title="Volume"
          main={ this.state.volumePrice }
          sub={ volumeSub }
        />
        <Ticker
          title="Bid"
          main={this.state.bidPrice}
          sub={ bidSub }
          onClick={this.handleClickPrice}
        />
        <Ticker
          title="Ask"
          main={this.state.askPrice}
          sub={ askSub }
          onClick={this.handleClickPrice}
        />
        <Ticker
          title="Last Price"
          main={ this.state.lastPrice }
          sub={ lastPriceSub }
          onClick={this.handleClickPrice}
        />
        <Ticker
          title="Lowest"
          main={ this.state.lowPrice }
          sub={ lowPriceSub }
          onClick={this.handleClickPrice}
        />
        <Ticker
          title="Highest"
          main={ this.state.highPrice }
          sub={ highPriceSub }
          onClick={this.handleClickPrice}
        />
        {/*
         <TradingTable
         columnConfig={balanceTable}
         tableData={tradingGlobal}
         tableContainerClass="card-table balance-table"
         />
         */}
      </div>
    )
  }
}

export default TickerStrip
