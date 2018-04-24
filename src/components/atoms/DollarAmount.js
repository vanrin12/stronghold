// @flow
import * as React from 'react';
import Amount from './Amount';

type Props = {
  children?: React.Node
}

export default function(props: Props) {
  return (
    <Amount
      value={props.children}
      scale={2}
      prefix="$"
      thousandSeparator=","
    />
  )
}
