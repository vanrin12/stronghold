// @flow
import * as React from 'react';
import _ from 'lodash';

import type {
  AssetType,
  MarketType,
  BalanceType,
  ServicesType,
  OpenOrderType,
  MarketTickerData,
  TradeActionType
} from '../../../types';

import TickerStrip from './TickerStrip';
import Form from './Form';
import Chart from './Chart';
import BidsTable from './BidsTable';
import AsksTable from './AsksTable';
import OpenOrdersTable from './OpenOrdersTable';
import MarketHistoryTable from './MarketHistoryTable';
import OrderHistoryTable from './OrderHistoryTable';

import './View.css';

type Props = {
  initMarket: Function,
  beforeUnmount: Function,
  market: MarketType,
  marketBalances: Array<BalanceType>,
  closeTradeModal: Function,
  openTradeModal: Function,
  tradeActionType: TradeActionType,
  openOrders: Array<OpenOrderType>,
  buy: Function,
  sell: Function,
  configUserFetchInterval: Function,
  services: ServicesType,
  marketData: Object,
  app: Object,
  priceChange: Function,
  amountChange: Function,
  totalChange: Function,
  baseAsset: AssetType,
  counterAsset: AssetType,
  isProcessing: boolean,
  cancelOrder: Function,
  ticker: MarketTickerData,

  tradeModal: boolean
}

const DEFAULT_CURRENCY_SCALE = 7;

class MarketView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.initMarket(this.props.market);
  }

  componentWillReceiveProps(nextProps: Object) {
    // Has market changed?
    if (nextProps.market.id !== this.props.market.id) {
      this.props.configUserFetchInterval(nextProps.market);
    }
  }

  componentWillUnmount() {
    this.props.beforeUnmount();
  }

  render() {
    const data = {
      bids: [],
      asks: [],
      chartData: [],
      marketHistory: [],
      orderHistory: []
    };

    if (this.props.marketData && this.props.marketData.data) {
      const {bids, asks, chartData, historyData, orderHistoryData} = this.props.marketData.data;

      if (_.isArray(bids)) data.bids = bids;
      if (_.isArray(asks)) data.asks = asks;
      if (_.isArray(chartData)) data.chartData = chartData;
      if (_.isArray(historyData)) data.marketHistory = historyData;
      if (_.isArray(orderHistoryData)) data.orderHistory = orderHistoryData;
    }

    const form = this.props.app.form || {};
    const formPrice = form.price != null ? form.price : "";
    const formAmount = form.amount != null ? form.amount : "";
    const formTotal = form.total != null ? form.total : "";

    // Get the base/counter scale
    let counterScale = this.props.counterAsset.scaleFull;
    counterScale = ( _.isNumber(counterScale) ? counterScale : DEFAULT_CURRENCY_SCALE );

    let baseScale = this.props.baseAsset.scaleFull;
    baseScale = ( _.isNumber(baseScale) ? baseScale : DEFAULT_CURRENCY_SCALE );

    return (
      <div className="Trade__MarketView">
        <div className="container">
          <TickerStrip
            market={this.props.market}
            marketBalances={ this.props.marketBalances }
            convert={this.props.services.convert}
            marketData={data}
            priceChange={this.props.priceChange}
            amountChange={this.props.amountChange}
            ticker={ this.props.ticker }
          />

          <div className="row">
            <div className="col-xs-12 boxed boxed--border">
              <div className="Trade__ChartWrap col-md-7 col-lg-8">
                <Chart
                  market={this.props.market}
                  chartData={data.chartData}
                />
              </div>
              <div className="Trade__FormWrap col-md-5 col-lg-4">
                <Form
                  tradeModal={this.props.tradeModal}
                  market={this.props.market}
                  marketBalances={ this.props.marketBalances }
                  buy={this.props.buy}
                  sell={this.props.sell}
                  tradeActionType={this.props.tradeActionType}
                  openTradeModal={ this.props.openTradeModal }
                  closeTradeModal={ this.props.closeTradeModal }
                  convert={this.props.services.convert}
                  price={ formPrice }
                  amount={ formAmount }
                  total={ formTotal }
                  priceChange={this.props.priceChange}
                  amountChange={this.props.amountChange}
                  totalChange={this.props.totalChange}
                  isProcessing={this.props.isProcessing}
                  baseScale={ baseScale }
                  counterScale={ counterScale }
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="boxed boxed--border">
                <div className="table-responsive">
                  <BidsTable
                    market={this.props.market}
                    data={data.bids}
                    priceChange={this.props.priceChange}
                    amountChange={this.props.amountChange}
                    baseScale={ baseScale }
                    counterScale={ counterScale }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="boxed boxed--border">
                <div className="table-responsive">
                  <AsksTable
                    market={this.props.market}
                    data={data.asks}
                    priceChange={this.props.priceChange}
                    amountChange={this.props.amountChange}
                    baseScale={ baseScale }
                    counterScale={ counterScale }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="boxed boxed--border col-md-12">
            <OpenOrdersTable
              market={this.props.market}
              data={this.props.openOrders}
              baseScale={ baseScale }
              counterScale={ counterScale }
              cancelOrder={ this.props.cancelOrder }
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="boxed boxed--border">
                <div className="table-responsive">
                  <OrderHistoryTable
                    market={this.props.market}
                    data={data.orderHistory}
                    baseScale={ baseScale }
                    counterScale={ counterScale }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="boxed boxed--border">
                <div className="table-responsive">
                  <MarketHistoryTable
                    market={this.props.market}
                    data={data.marketHistory}
                    baseScale={ baseScale }
                    counterScale={ counterScale }
                  />
                </div>
              </div>
            </div>
          </div>

        </div>{/*container*/}
      </div>
    )
  }
}

export default MarketView
