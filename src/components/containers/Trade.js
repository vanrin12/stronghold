// @flow
import { connect } from 'react-redux';

import {
  tradePageFetchesRequested,
  tradeMarketFetchesRequested,
  startUserFetchInterval,
  stopUserFetchInterval,
  tradeBuyRequested,
  tradeSellRequested,
  configUserFetchInterval,
  tradeFormPriceChanged,
  tradeFormAmountChanged,
  tradeFormTotalChanged,
  tradeCancelOrderRequested,
  showTradeModal,
  hideTradeModal
} from '../../actions';

import toJS from './toJS';
import Trade from '../pages/Trade';

import type { MarketType } from '../../types';

const mapStateToProps = (state, ownProps) => {
  const user = state.get('user');

  return {
    assets: user.getIn(['assets', 'data']) || {},
    markets: state.getIn(['trade', 'markets']),
    balances: user.getIn(['balances', 'data']) || [],
    openOrders: user.getIn(['openOrders', 'data'] || []),
    marketsData: user.get('markets'),
    tradeModal: user.getIn(["app", "trade", "tradeModal"]),
    tradeActionType: user.getIn(["app", "trade", "tradeActionType"]),
    app: user.getIn(['app', 'trade']) || {},
    isProcessing: user.getIn(['app', 'trade', 'isProcessing']),
    tickerData: state.getIn(['marketsTicker', 'data']) || {}
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initFetches: () => {
      dispatch(tradePageFetchesRequested());
    },
    initMarket:(market: MarketType) => {
      dispatch(tradeMarketFetchesRequested(market.id));
      dispatch(configUserFetchInterval({
        page: 'trade',
        marketId: market.id
      }));
      dispatch(startUserFetchInterval());
    },
    beforeUnmount:() => {
      dispatch(configUserFetchInterval({}));  // clear the config
      dispatch(stopUserFetchInterval());
    },
    configUserFetchInterval: (market: MarketType) => {
      dispatch(configUserFetchInterval({
        page: 'trade',
        marketId: market.id
      }));
    },
    openTradeModal: (tradeActionType) => {
      dispatch(showTradeModal(tradeActionType));
    },
    closeTradeModal: () => {
      dispatch(hideTradeModal());
    },
    buy: (marketId, price, amount) => {
      dispatch(tradeBuyRequested(marketId, price, amount));
    },
    sell: (marketId, price, amount) => {
      dispatch(tradeSellRequested(marketId, price, amount));
    },
    priceChange: (marketId, price) => {
      dispatch(tradeFormPriceChanged(marketId, price));
    },
    amountChange: (marketId, amount) => {
      dispatch(tradeFormAmountChanged(marketId, amount));
    },
    totalChange: (marketId, amount, baseScale) => {
      dispatch(tradeFormTotalChanged(marketId, amount, baseScale));
    },
    cancelOrder: (orderId) => {
      dispatch(tradeCancelOrderRequested(orderId));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Trade))
