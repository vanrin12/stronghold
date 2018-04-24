// @flow
import * as React from 'react'

import querystring from 'querystring'

import Helmet from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify'

import TopNav from '../containers/TopNav'
import FlashMessages from '../containers/FlashMessages'
import Balances from '../orgs/Balances'
import TxHistory from '../orgs/TxHistory'
import SendModal from '../orgs/SendModal'
import ReceiveModal from '../orgs/ReceiveModal'
//import Footer from '../Footer'

import 'react-toastify/dist/ReactToastify.min.css'
import './Wallet.css'

import type { BalanceType, WalletTransactionType, AssetType, RemoteStatusType } from '../../types'

type Props = {
  init: Function,
  beforeUnmount: Function,
  balances: Array<BalanceType>,
  transactions: Array<WalletTransactionType>,
  assets: { [string]: AssetType },
  sendModal: ?Object,
  receiveModal: ?Object,
  openModal: Function,
  closeSendModal: Function,
  closeReceiveModal: Function,
  isSending: boolean,
  sendFunds: Function,
  resolveFederation: Function,
  receivingAddresses: Object,
  transactionsIsFetching: boolean,
  transactionsHasFetched: boolean,
  federationResult: Object,
  importWallet: Function,
  importingWallet: { status: RemoteStatusType },
  clearSendFundsError: Function
}

function aOrAnWord(word) {
  if( /^[aeiou]/i.test(word) ) {
    return "an " + word
  }
  return "a " + word
}

class Wallet extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.init()
  }
  componentDidMount() {
    // Import Wallet success message
    if(querystring.parse(window.location.search.substring(1)).import === "success") {
      window.history.replaceState({}, document.title, "/#/wallet" )
      toast.success("Your account has been successfully merged.", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  componentWillUnmount() {
    this.props.beforeUnmount()
  }

  render() {
    let modalHTML = null
    if( this.props.sendModal ) {
      const { sendModal } = this.props

      // address placeholder text of To field on SendForm
      let addressEntryText
      if(sendModal.isOnlyStellar) {
        addressEntryText = "Enter a Stellar address or account ID"
      } else {
        addressEntryText = "Enter " + aOrAnWord(sendModal.name) + " or Stellar address or account ID"
      }
      modalHTML = (
        <SendModal
          isOpen={true}
          onClose={this.props.closeSendModal}
          isSending={this.props.isSending}
          sendFunds={this.props.sendFunds}
          code={sendModal.code}
          coinName={sendModal.name}
          icon={sendModal.icon}
          scaleFull={sendModal.scaleFull}
          addressEntryText={ addressEntryText }
          resolveFederation={this.props.resolveFederation}
          federationResult={this.props.federationResult}
          isOnlyStellar={ sendModal.isOnlyStellar }
          feeFixed={ sendModal.withdrawalFeeFixed }
          feePercent={ sendModal.withdrawalFeePercent }
          error={sendModal.error || null}
          clearErrors={ this.props.clearSendFundsError }
        />
      )
    } else if( this.props.receiveModal ) {
      const { receiveModal } = this.props
      modalHTML = (
        <ReceiveModal
          isOpen={true}
          onClose={this.props.closeReceiveModal}
          code={receiveModal.code}
          coinName={receiveModal.name}
          icon={receiveModal.icon}
          receive={this.props.receivingAddresses}
          depositMinimum={ receiveModal.depositMinimum }
          depositDelayMinutes={ receiveModal.depositDelayMinutes }
          isOnlyStellar={ receiveModal.isOnlyStellar }
          importWallet={ this.props.importWallet }
          importingWallet={ this.props.importingWallet }
        />
      )
    }

    return (
      <div className="Wallet">
        <Helmet>
          <title>Stronghold - Wallet</title>
          <meta name="description" content="Stonghold Wallet" />
        </Helmet>
        <TopNav />
        <section className="bar bar--lg">
          <div className="container">

            <FlashMessages />

            <div className="col-sm-5 col-md-4">
              <div className="Wallet__header">
                <h3 className="color--primary unmarg">Your Assets</h3>
              </div>
              <Balances
                balances={this.props.balances}
                assets={this.props.assets}
                openModal={this.props.openModal}
              />
            </div>

            <div className="col-sm-7 col-md-8">
              <TxHistory
                transactions={this.props.transactions}
                assets={this.props.assets}
                isFetching={this.props.transactionsIsFetching}
                hasFetched={this.props.transactionsHasFetched}
              />
            </div>
          </div>
        </section>
        <ToastContainer />
        { modalHTML }
        {/*<Footer />*/}
      </div>
    );
  }
}

export default Wallet
