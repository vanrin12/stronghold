// @flow
import React from 'react';
import _ from 'lodash';

import Helmet from 'react-helmet';
import { ClipLoader as Loader } from 'halogenium';
import { ToastContainer } from 'react-toastify';

import type {
  AssetType,
  MarketType,
  BalanceType,
  ServicesType,
  OpenOrderType,
  MarketTickerData,
  RemoteStatusType,
  TradeActionType
} from '../../../types';
import { LOADING, FAILURE, SUCCESS } from '../../../types';
import initServices from '../../../services';

import TopNav from '../../containers/TopNav';
import ErrorBox from '../../atoms/ErrorBox';
import Overlay from '../../atoms/Overlay';

import Nav from './Nav.js';
import View from './View.js';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

type Props = {
  initFetches: Function,
  initMarket: Function,
  beforeUnmount: Function,
  configUserFetchInterval: Function,
  match: Object,
  history: Object,
  assets: { [string]: AssetType },
  markets: {
    status: RemoteStatusType,
    data?: Array<MarketType>
  },
  buy: Function,
  sell: Function,
  configUserFetchInterval: Function,
  balances: Array<BalanceType>,
  openOrders: Array<OpenOrderType>,
  marketsData: Object,
  app: Object,
  openTradeModal: Function,
  closeTradeModal: Function,
  tradeActionType: TradeActionType,
  priceChange: Function,
  amountChange: Function,
  totalChange: Function,
  isProcessing: boolean,
  cancelOrder: Function,
  tickerData: { [marketId: number]: MarketTickerData },

  tradeModal: boolean
}

class Trade extends React.Component<Props> {
  services: ServicesType;

  constructor(props: Props) {
    super(props);

    this.props.initFetches();
    this.services = initServices();
  }

  getMarketName = () => {
    const { base, counter } = this.props.match.params;
    return base + '/' + counter;
  };

  getMarket = () => {
    return _.find(this.props.markets.data, {name: this.getMarketName()});
  };

  navToDefaultMarket = () => {
    if (this.props.markets.data && this.props.markets.data.length) {
      const name = this.props.markets.data[0].name;
      this.props.history.replace('/trade/' + name);
    }
  };

  componentWillUnmount() {
    this.props.beforeUnmount();
  }

  hasMarketsFetchFailed = () => {
    // If request has failed
    if (this.props.markets.status === FAILURE) return true;

    if (this.props.markets.status === SUCCESS) {
      // If request has succeeded, but no data
      if (!this.props.markets.data || !this.props.markets.data.length) return true;
    }

    return false;
  };

  render() {
    let head, main;

    if (this.props.markets.status === LOADING) {
      head = <Loader size="28px" color="#4A90E2" className="Trade__Market__Loader" />;
    } else if (this.hasMarketsFetchFailed()) {
      main = <ErrorBox>Market data is currently not available.</ErrorBox>
    } else if (this.props.markets.status === SUCCESS) {
      const market: MarketType = this.getMarket();

      if (market) {
        const baseAsset: AssetType = this.props.assets[market.base] || {};
        const counterAsset: AssetType = this.props.assets[market.counter] || {};
        const ticker = this.props.tickerData[market.id];
        const marketBalances = _.filter(this.props.balances, (balance) => {
          return balance.code === market.base || balance.code === market.counter;
        });

        main = <View
                tradeModal={this.props.tradeModal}
                initMarket={ this.props.initMarket }
                beforeUnmount={ this.props.beforeUnmount }
                configUserFetchInterval={ this.props.configUserFetchInterval }
                market={market}
                marketBalances={ marketBalances }
                openOrders={this.props.openOrders}
                buy={this.props.buy}
                sell={this.props.sell}
                services={this.services}
                marketData={this.props.marketsData[market.id] || {}}
                app={this.props.app[market.id] || {}}
                tradeActionType={this.props.tradeActionType}
                openTradeModal={ this.props.openTradeModal }
                closeTradeModal={ this.props.closeTradeModal }
                priceChange={this.props.priceChange}
                amountChange={this.props.amountChange}
                totalChange={this.props.totalChange}
                baseAsset={ baseAsset }
                counterAsset={ counterAsset }
                isProcessing={ this.props.isProcessing }
                cancelOrder= { this.props.cancelOrder }
                ticker={ ticker } />;

        head = <Nav
                markets={ this.props.markets.data || [] }
                selectedMarket={ this.getMarketName() } />;

        // Couldn't find the market, so navToDefaultMarket
      } else {
        setTimeout(() => { //  don't update during an existing state transition
          this.navToDefaultMarket();
        }, 0);
        return null;
      }
    }

    let overlay = this.props.isProcessing ?
        <Overlay
          blocking={ true }
          ariaTitle="Trade is processing..."
          showWaiting={ true } /> : null;

    return (
      <div className="Trade">
        <Helmet>
          <title>Stronghold - Trading</title>
          <meta name="description" content="Stronghold Charts" />
        </Helmet>

        { overlay }

        <TopNav />

        <div className="container">
          { head }
        </div>

        <div className="Trade__main">
          { main }
        </div>

        <ToastContainer />
      </div>
    )
  }
}

export default Trade
