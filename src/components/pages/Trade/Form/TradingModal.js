// @flow
import * as React from 'react';

import Modal from '../../../atoms/Modal';
import DollarAmount from '../../../atoms/DollarAmount';
import type { MarketType, TradeActionType } from "../../../../types";

type Props = {
  tradeActionType: TradeActionType,
  isOpen: boolean,
  onClose: Function,
  buy: Function,
  sell: Function,
  quantity: string,
  commission: string,
  fiatTotalValue: string,
  amount: string,
  price: string,
  market: MarketType,
  total: string
}

class TradingModal extends React.Component<Props> {
  handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const { tradeActionType, buy, sell, market, price, amount, onClose } = this.props;

    if (tradeActionType === 'Buy') {
      buy(market.id, price, amount)
    } else {
      sell(market.id, price, amount)
    }

    onClose();
  }

  render() {
    const { isOpen, onClose, tradeActionType, market, price, total, fiatTotalValue, commission, quantity } = this.props;

    const modalTitle = (
      <div className="row">
        <div className="col-xs-6">{tradeActionType} transaction</div>
        <div className="col-xs-6 text-right">Market: {market.name}</div>
      </div>
    );

    return (
      <div className="TradingModal">
        <Modal
          contentLabel="Trade Modal"
          isOpen={isOpen}
          onRequestClose={onClose}
          modalClassName="TradeModal"
          modalTitle={modalTitle}>
          <form className="TradeModal__form" onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="col-xs-6 text-right">Price ({market.counter} per {market.base}): </div>
              <div className="col-xs-6"><input type="text" className="form-control" value={price} disabled /></div>
            </div>

            <div className="row">
              <div className="col-xs-6 text-right">Amount ({market.base}):</div>
              <div className="col-xs-6"><input type="text" className="form-control" value={quantity} disabled /></div>
            </div>

            <div className="row">
              <div className="col-xs-6 text-right">Max trade fee ({market.base}): </div>
              <div className="col-xs-6"><input type="text" className="form-control" value={commission} disabled /></div>
            </div>

            <div className="row">
              <div className="col-xs-6 text-right">Total ({market.counter}): </div>
              <div className="col-xs-6"><input type="text" className="form-control" value={total} disabled /></div>
            </div>

            <div className="row">
              <div className="col-xs-6 text-right">Total (USD): </div>
              <div className="col-xs-6"><DollarAmount>{fiatTotalValue}</DollarAmount></div>
            </div>

            <p className="text-danger text-center">Please check this order before confirming. All orders are final once submitted and we will be unable to issue you a refund.</p>

            <div className="mt--1">
              <button type="submit" className="btn btn--primary type--uppercase">Confirm</button>
            </div>
          </form>

        </Modal>
      </div>
    )
  }
}

export default TradingModal;
