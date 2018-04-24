import * as React from 'react';


import Amount from '../../atoms/Amount';
import CoinIcon from  '../../atoms/CoinIcon';

import type { AssetType } from '../../../types';

import './BalanceEntry.css';

type Props = {
  asset: AssetType,
  openModal: Function,
  openReceiveModal: Function
}

class BalanceEntry extends React.Component<Props> {
  showSendModal = () => {
    this.props.openModal('send', this.props.asset);
  };

  showReceiveModal = () => {
    this.props.openModal('receive', this.props.asset);
  };

  render() {
    let asset = this.props.asset;
    return (
      <li className="BalanceEntry mb--2 row">
        <CoinIcon icon={ asset.code }/>
        <div className="">
          <div className="row">

            <div className="BalanceEntry__name col-xs-12">
              <p className="BalanceEntry__coinName">{ asset.name }</p>
              <p className="BalanceEntry__balance">
                <Amount
                  value={this.props.amount}
                  scale={asset.scaleFull}
                  suffix={asset.code}
                />
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">

              <div className="modal-instance BalanceEntry__actions__button">
                <a className="btn btn--sm modal-trigger" onClick={this.showSendModal}>
                  <span className="btn__text">
                    Send
                  </span>
                </a>
              </div>

              <div className="modal-instance BalanceEntry__actions__button">
                <a className="btn btn--sm modal-trigger" onClick={this.showReceiveModal}>
                  <span className="btn__text">
                    Receive
                  </span>
                </a>
              </div>

            </div>
          </div> {/*--row--*/}

        </div> {/*--col--*/}

      </li>
    );
  }
}

export default BalanceEntry;
