// @flow
import * as React from 'react'

import { Link } from 'react-router-dom'

import type { MarketType } from '../../../types'

import 'react-tabs/style/react-tabs.css'
import './Nav.css'

type Props = {
  markets: Array<MarketType>,
  selectedMarket?: string
}

class TradeNav extends React.Component<Props> {
  render() {
    const tabs = this.props.markets.map((market) =>
      <li
        key={market.id}
        className={'tab ' + (market.name === this.props.selectedMarket ? 'active' : '')}
      >
        <Link className="h5" to={ '/trade/' + market.name }>{market.name}</Link>
      </li>
    );
    return (
      <ul className="Trade__Nav tabs">
        { tabs }
      </ul>
    )
  }
}

export default TradeNav
