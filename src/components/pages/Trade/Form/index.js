// @flow
import * as React from 'react';
import BigNumber from 'bignumber.js';
import _every from 'lodash/every';

import type { MarketType, BalanceType, TradeActionType } from '../../../../types';
//import { btcValue, ethValue } from '../../../../config/TablesDummyData'

import TradingModal from './TradingModal';
import TradingCard from './TradingCard';
import TradingButton from './TradingButton';

import './Form.css';

type Props = {
  market: MarketType,
  marketBalances: Array<BalanceType>,
  tradeModal: boolean,  // isTradeModalOpen
  openTradeModal: Function,
  closeTradeModal: Function,
  buy: Function,
  sell: Function,
  convert: Function,
  price: string,
  amount: string,
  total: string,
  priceChange: Function,
  amountChange: Function,
  totalChange: Function,
  isProcessing: boolean,
  baseScale: number,
  counterScale: number,
  tradeActionType: TradeActionType
}

type State = {
  fiatPriceValue: string,
  fiatAmountValue: string,
  fiatTotalValue: string,
}

class TradeForm extends React.Component<Props, State> {
  state = {
    fiatPriceValue: '',
    fiatAmountValue: '',
    fiatTotalValue: ''
  };

  // Set fiatPriceValue & fiatAmountValue
  convertPriceToFiat = async (price: string) => {
    const fiatPriceValue = await this.props.convert(price, {from: this.props.market.counter, to: 'USD'});
    this.setState({ fiatPriceValue })
  };

  convertAmountToFiat = async (amount: string) => {
    const fiatAmountValue = await this.props.convert(amount, {from: this.props.market.base, to: 'USD'});
    this.setState({ fiatAmountValue })
  };

  convertTotalToFiat = async (price: string, amount: string) => {
    price = price ? price : '0';
    amount = amount ? amount : '0';

    let total;

    try {
      total = new BigNumber(amount).times(price).toString()
    } catch(err) {
      total = 0
    }

    const fiatTotalValue = await this.props.convert( total, {from: this.props.market.counter, to: 'USD'} );

    this.setState({ fiatTotalValue });
  };

  // If the user can submit form.
  canProceed = () => {
    if (this.props.isProcessing) return false;

    // Disable form buttons if price & amount isn't a valid number above zero
    // or if total isn't above minimumTradeTotal
    try {
      return new BigNumber(this.props.price).greaterThan(0) && new BigNumber(this.props.amount).greaterThan(0) && this.isTotalAboveMinimum()
    } catch(err) {
      return false;
    }
  };

  // Is total above the market minimumTradeTotal
  isTotalAboveMinimum = () => {
    try {
      return new BigNumber(this.props.total).greaterThanOrEqualTo(this.getMinimumTradeTotal())
    } catch(err) {
      return false
    }
  };

  getMinimumTradeTotal = () => {
    return this.props.market.minimumTradeTotal || '0.001';
  };

  getTradeFeePercent = () => {
    return this.props.market.minimum || '0.1';
  };

  getCommission = () => {
    // return parseFloat((+this.getTradeFeePercent() * +this.props.total).toFixed(this.props.counterScale));
    try {
      return new BigNumber(+this.getTradeFeePercent()).times(+this.props.total).toFixed(this.props.counterScale);
    } catch(er) {
      return ""
    }
  };

  getQuantity = (): string => {
    //return parseFloat((this.props.amount - this.getCommission()).toFixed(this.props.counterScale));
    try {
      return new BigNumber(+this.props.amount).minus(this.getCommission()).toFixed(this.props.counterScale);
    } catch(er) {
      return ""
    }
  };

  handlePriceChange = (value: string) => {
    this.props.priceChange(this.props.market.id, value);
  };

  handleAmountChange = (value: string) => {
    this.props.amountChange(this.props.market.id, value);
  };

  handleTotalChange = (value: string) => {
    this.props.totalChange(this.props.market.id, value, this.props.baseScale);
  };

  openBuyModal = () => {
    this.props.openTradeModal('Buy');
  };

  openSellModal = () => {
    this.props.openTradeModal('Sell');
  };

  onCloseModal = () => {
    this.props.closeTradeModal();
  };

  /*componentWillMount() {
    this.convertPriceToFiat(this.props.price)
    this.convertAmountToFiat(this.props.amount)
    this.convertTotalToFiat(this.props.price, this.props.amount)
  }*/

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.price !== nextProps.price)
      this.convertPriceToFiat(nextProps.price);

    if (this.props.amount !== nextProps.amount)
      this.convertAmountToFiat(nextProps.amount);

    if (this.props.price !== nextProps.price || this.props.total !== nextProps.total)
      this.convertTotalToFiat(nextProps.price, nextProps.amount);
  }

  render() {
    let minimumTradeTotalMsgClass = '', formInputs = null;

    if (this.props.marketBalances && this.props.marketBalances.length && _every(this.props.marketBalances, (balance) => {
      try {
        return new BigNumber(balance.amount).lessThanOrEqualTo(0);
      } catch(err) {
        return true;
      }
    })) {
      formInputs = <div className="Trade__Form__no-funds-msg">Please make a deposit before placing a trade order.</div>
    } else {
      formInputs = (
        <div>
          <TradingCard
            title="Price"
            code={`${this.props.market.counter} per ${this.props.market.base}`}
            value={this.props.price}
            currencyValue={this.state.fiatPriceValue}
            onChange={this.handlePriceChange}
            disabled={this.props.isProcessing}
            scale={ this.props.counterScale }
          />
          <TradingCard
            title="Amount"
            code={this.props.market.base}
            value={this.props.amount}
            currencyValue={this.state.fiatAmountValue}
            onChange={this.handleAmountChange}
            disabled={this.props.isProcessing}
            scale={ this.props.baseScale }
          />
          <TradingCard
            title="Total"
            code={this.props.market.counter}
            value={this.props.total}
            currencyValue={this.state.fiatTotalValue}
            onChange={this.handleTotalChange}
            disabled={this.props.isProcessing}
            scale={ this.props.counterScale }
          />
        </div>
      );

      if( parseFloat(this.props.total) > 0 && !this.isTotalAboveMinimum() ) {
        minimumTradeTotalMsgClass = "Trade__Form__minimum-trade-total-msg--show"
      }
    }

    return (
      <div className="Trade__Form flex">
        <div className="col-sm-6 col-md-12">
          { formInputs }
          <span className={`Trade__Form__minimum-trade-total-msg ${minimumTradeTotalMsgClass}`}>note: minimum trade total is { this.getMinimumTradeTotal() }</span>
        </div>
        <div className="col-sm-6 col-md-12">
          <TradingButton
            type="Buy"
            title={`Buy ${this.props.amount} ${this.props.market.base}`}
            value={`You pay ${this.props.total} ${this.props.market.counter}`}
            currencyValue={this.state.fiatTotalValue}
            onClick={this.openBuyModal}
            disabled={!this.canProceed()}
          />
          <TradingButton
            type="Sell"
            title={`Sell ${this.props.amount} ${this.props.market.base}`}
            value={`You get ${this.props.total} ${this.props.market.counter}`}
            currencyValue={this.state.fiatAmountValue}
            onClick={this.openSellModal}
            disabled={!this.canProceed()}
          />
          <TradingModal
            isOpen={this.props.tradeModal}
            tradeActionType={this.props.tradeActionType}
            onClose={this.onCloseModal}
            buy={this.props.buy}
            sell={this.props.sell}
            market={this.props.market}
            price={this.props.price.toString()}
            amount={this.props.amount.toString()}
            total={this.props.total}
            commission={this.getCommission()}
            quantity={this.getQuantity()}
            fiatTotalValue={this.state.fiatTotalValue}
            counterScale={ this.props.counterScale }
          />
        </div>
      </div>
    )
  }
}

export default TradeForm
