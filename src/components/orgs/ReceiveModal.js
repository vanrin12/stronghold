// @flow
import * as React from 'react'

import { ClipLoader as Loader } from 'halogenium'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import Modal from '../atoms/Modal'
import Content from "./ReceiveModal/Content"
import ImportContent from "./ReceiveModal/ImportContent"

import ErrorBox from '../atoms/ErrorBox'

import { SUCCESS, FAILURE } from "../../types"
import type { RemoteStatusType } from "../../types"

import CoinIcon from  '../atoms/CoinIcon'

import "./ReceiveModal.css"


type Props = {
  isOpen: boolean,
  onClose: Function,

  code: string,
  coinName: string,
  icon: string,
  receive: Object,

  depositMinimum: string,
  depositDelayMinutes: number,
  isOnlyStellar: boolean,

  importWallet: Function,
  importingWallet: { status: RemoteStatusType }
}


class ReceiveModal extends React.Component<Props> {
  render() {
    const modalTitle = (
      <div>
        <span className="BalanceEntry__logo">
          <CoinIcon icon={ this.props.code }/>
        </span>
        Receive {this.props.code}
      </div>
    )

    const receiveStatus = this.props.receive.status
    const receive = this.props.receive.data[this.props.code]
    let content
    if (receiveStatus === SUCCESS && receive && (receive.address || receive.stellarAddress)) {

      // Show Mobius Receive Modal with Import Tab
      //TODO: Need to remove this hardcode after getting some data for MOBIUS modal from API
      if(receive.stellarAddress && this.props.coinName === 'Mobius') {
        content = (
          <Tabs>
            <TabList>
              <Tab>Stellar</Tab>
              <Tab>Import</Tab>
            </TabList>

            <TabPanel>
              <Content
                address={ receive.stellarAddress }
                qrData={ receive.qrStellarData }
                coinName={ this.props.coinName }
                depositMinimum={ this.props.depositMinimum }
                depositDelayMinutes={ this.props.depositDelayMinutes }
              />
            </TabPanel>
            <TabPanel>
              <ImportContent
                importWallet={ this.props.importWallet }
                importingWallet={ this.props.importingWallet }
                coinName={ this.props.coinName }
              />
            </TabPanel>
          </Tabs>
        )

      // Show only Stellar
      } else if(this.props.isOnlyStellar && receive.stellarAddress) {
        content = (
          <Content
            address={ receive.stellarAddress }
            qrData={ receive.qrStellarData }
            coinName={ this.props.coinName }
            depositMinimum={ this.props.depositMinimum }
            depositDelayMinutes={ this.props.depositDelayMinutes }
          />
        )

      // Show Both
      } else if(receive.address && receive.stellarAddress) {
        content = (
          <Tabs>
            <TabList>
              <Tab>{ this.props.coinName }</Tab>
              <Tab>Stellar</Tab>
            </TabList>

            <TabPanel>
              <Content
                address={ receive.address }
                qrData={ receive.qrData }
                coinName={ this.props.coinName }
                depositMinimum={ this.props.depositMinimum }
                depositDelayMinutes={ this.props.depositDelayMinutes }
              />
            </TabPanel>
            <TabPanel>
              <Content
                address={ receive.stellarAddress }
                qrData={ receive.qrStellarData }
                coinName={ this.props.coinName }
                depositMinimum={ this.props.depositMinimum }
                depositDelayMinutes={ this.props.depositDelayMinutes }
              />
            </TabPanel>
          </Tabs>
        )

      // Else, displays the native receive or stellar receive
      } else {
        let address, qrData
        if (receive.address) {
          address = receive.address
          qrData = receive.qrData
        } else {
          address = receive.stellarAddress
          qrData = receive.qrStellarData
        }
        content = (
          <Content
            address={ address }
            qrData={ qrData }
            coinName={ this.props.coinName }
            depositMinimum={ this.props.depositMinimum }
            depositDelayMinutes={ this.props.depositDelayMinutes }
          />
        )
      }

    // Loading error
    } else if(receiveStatus === FAILURE) {
      // TODO wait for Sean's response.
      content = (
        <ErrorBox>
          There was an error fetching your receive address.
        </ErrorBox>
      )
    } else {
      content = (
        <div className="ReceiveModal__Loader">
          <Loader size="40px" color="#76abe9" />
        </div>
      )
    }

    return (
      <Modal contentLabel="Receive Modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        modalClassName="ReceiveModal"
        modalTitle={modalTitle}
      >
       { content }
      </Modal>
    );
  }
}

export default ReceiveModal;
