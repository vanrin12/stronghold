// @flow
import * as React from 'react'

import BalanceEntry from './BalanceEntry'

import './index.css'
import type { BalanceType, AssetType } from '../../../types'

type Props = {
  balances: Array<BalanceType>,
  assets: { [string]: AssetType},
  openModal: Function
}

class Balances extends React.Component<Props> {
  render() {

    return (
      <ul className="Balances wallet-list">
        {this.props.balances.map(balance => {
          return <BalanceEntry
            openModal={this.props.openModal}
            {...balance}
            asset={this.props.assets[balance.code]}
            key={balance.code}
          ></BalanceEntry>
        })}
      </ul>
    );
  }
}

export default Balances;
