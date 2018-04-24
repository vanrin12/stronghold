// @flow
import * as React from 'react';
import InputAmount from '../../../atoms/InputAmount';
import DollarAmount from '../../../atoms/DollarAmount';

import './TradingCard.css';

type Props = {
  title: string,
  value: string,
  currencyValue: string,
  code: string,
  onChange: Function,
  disabled: boolean,
  scale: number
}

class TradingCard extends React.Component<Props> {
  inputAmount: ?InputAmount;

  static defaultProps = {
    disabled: false
  };

  handleClick = () => {
    if (this.inputAmount && this.inputAmount.input) this.inputAmount.input.focus();
  };

  render() {
    const { title, value, currencyValue, code } = this.props;

    return (
      <div
        className="TradingCard trading-boxes boxed boxed--border bg--secondary mb--1"
        onClick={ this.handleClick }
      >
        <div className="col-xs-8">
          <InputAmount
            disabled={ this.props.disabled }
            onChange={ this.props.onChange }
            onlyPositive={ true }
            toScale={ this.props.scale }
            value= { value }
            className="trading-card--input"
            name={ title }
            ref={ el => this.inputAmount = el }
          />
          <DollarAmount>{ currencyValue }</DollarAmount>
        </div>
        <div className="col-xs-4 text-right">
          <p className="unmarg">{title}</p>
          <span>{code}</span>
        </div>
      </div>
    )
  }
}

export default TradingCard
