// @flow
import * as React from 'react';
import DollarAmount from '../../../atoms/DollarAmount';

import './TradingButton.css'

type Props = {
  type: string,
  title: string,
  value: string,
  currencyValue: string,
  onClick: Function,
  disabled: boolean
}

class TradingButton extends React.Component<Props> {
  static defaultProps = {
    disabled: false
  };

  render() {
    const { type, title, value, currencyValue, onClick, disabled } = this.props;

    return (
      <a
        className={`TradingButton flex align-stretch trading-boxes btn ${type === 'Buy' ? 'bg--success' : type === 'Sell' ? 'bg--error': ''}`}
        onClick={onClick}
        disabled={disabled}
      >
        <h4 className="flex justify-center align-center type--bold">{type.toUpperCase()}</h4>
        <div className="clearfix text-left">
          <p className="unmarg type--bold">{title}</p>
          <span>{value}</span>
          <DollarAmount>{ currencyValue }</DollarAmount>
        </div>
      </a>
    )
  }
}

export default TradingButton
