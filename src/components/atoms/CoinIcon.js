// @flow
import * as React from 'react';

import './CoinIcon.css';

type Props = {
  icon: string
}

class CoinIcon extends React.Component<Props> {
  render() {
    return(
      <img src={`images/coins/${this.props.icon}.svg`} className="coin-icon" alt={this.props.icon} />
    )
  }
}

export default CoinIcon;