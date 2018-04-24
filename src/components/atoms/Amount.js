import * as React from 'react';

import NumberFormat from 'react-number-format';

type Props = {
  value: string,
  scale: number,  // decimalPrecision
  suffix: string,
  prefix: string,
  showSign: boolean,
  inColor: boolean,
  thousandSeparator?: string
}

export default function Amount(props: Props) {
  if (props.value === "N/A") return <span>N/A</span>;

  const isPositive = props.value > 0;

  let className = props.inColor ? (isPositive ? 'color--success' : 'color--error') : '';
  let prefix = props.prefix || '';

  props.showSign && (prefix = (isPositive ? '+' : '-') + prefix);

  return (
    <span className={className}>
      <NumberFormat
        value={props.value}
        decimalPrecision={props.scale}
        displayType="text"
        prefix={prefix}
        suffix={props.suffix ? ' ' + props.suffix : null}
        thousandSeparator={props.thousandSeparator}
      />
    </span>
  )
}

Amount.defaultProps = {
  suffix: '',
  prefix: '',
  scale: 8,
  showSign: false,
  inColor: false,
  thousandSeparator: null
};
