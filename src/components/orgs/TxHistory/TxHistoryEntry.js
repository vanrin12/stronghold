// @flow
import * as React from 'react'

import moment from 'moment'

import type { AssetType } from '../../../types'
import Amount from '../../atoms/Amount'

import CoinIcon from '../../atoms/CoinIcon'

import './TxHistoryEntry.css'

type Props = {
  txid: string,
  amount: string,
  code: string,
  otherPartyAddress: string,
  received: boolean,
  timestamp: number,
  explorerUrl: string,

  asset: AssetType | Object
}

class TxHistoryEntry extends React.Component<Props> {
  render() {
    let verb, verb2, sign, asset = this.props.asset;

    if (this.props.received) {
      sign = '+';
      verb = 'Received';
      verb2 = 'Received from';
    } else {
      sign = '−';
      verb = 'Sent';
      verb2 = 'Sent to';
    }

    return (
      <tr className="TxHistoryEntry">
        <td>
          <CoinIcon icon={asset.code}/>
          <div className="TxHistoryEntry__rows">
            <div className="TxHistoryEntry__row">
              <span>
                {asset.name} { verb }
              </span>
              <Amount
                value={ sign + this.props.amount }
                suffix={ asset.code }
                scale={ asset.scaleFull }
                showSign={ true }
                inColor={ true }
              />
            </div>
            <div className="TxHistoryEntry__row TxHistoryEntry__row--bottom">
              <span className="TxHistoryEntry__timestamp">
                  { /*moment(this.props.timestamp * 1000).format('LLL')*/ }
                  { moment(this.props.timestamp * 1000).format('YYYY-MM-DD h:mm A') }
              </span>
              <div>
                <span title={verb2 + ' Address'} className="TxHistoryEntry__otherPartyAddress">
                  { this.props.otherPartyAddress }
                </span> [<a title="View transaction in explorer" href={this.props.explorerUrl} target="_blank">{ this.props.txid.substr(0, 8) }</a>]
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default TxHistoryEntry;
