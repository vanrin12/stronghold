// @flow
import * as React from 'react'
import _ from "lodash"

import Modal from '../atoms/Modal'
import Form from './SendModal/Form'
import Confirm from './SendModal/Confirm'

import CoinIcon from  '../atoms/CoinIcon'

import { validateAddress } from "../../apis/addressValidation"
import { SUCCESS } from "../../types"
import type { MemoType } from "../../types"
import { calcFees, validateMemo } from "../../utils"

import "./SendModal.css"

type Props = {
  isOpen: boolean,
  onClose: Function,

  code: string,
  coinName: string,
  icon: string,
  addressEntryText: string,
  error: ?Object,

  sendFunds: Function,
  isSending: boolean,
  scaleFull: number,

  resolveFederation: Function,
  federationResult: Object,

  isOnlyStellar: boolean,
  feeFixed: string,
  feePercent: string,

  clearErrors: Function
}

type State = {
  isConfirming: boolean,

  addressHasAsterisk: boolean,

  address: string,
  amount: string,
  memo: string,
  memoType: MemoType,
  isValidMemo: boolean,
  isMemoLocked: boolean
}

class SendModal extends React.Component<Props, State> {
  state = {
    isConfirming: false,
    address: "",
    amount: "",
    addressHasAsterisk: false,
    memo: '',
    memoType: "id",
    isValidMemo: true,
    isMemoLocked: false
  }

  static defaultProps = {
    coinName: 'Funds'
  }

  onModalClose = () => {
    // Don't close the modal, if still sending
    if(!this.props.isSending) {
      this.props.onClose()
    }
  }

  confirm = () => {
    if(this.canProceed()) {
      this.setState({ isConfirming: true })
    }
  }
  goBack = () => {
    this.setState({ isConfirming: false })
  }

  handleAddressChange = (address: string) => {
    let addressHasAsterisk = false
    if (address.indexOf('*') >= 0) {
      addressHasAsterisk = true
    }
    this.setState({
      address,
      addressHasAsterisk,
      isMemoLocked: false  // this.checkFederated() will reset federationObject to LOADING, so memo will not be displayed (until new federation result)
    })

    if(addressHasAsterisk) {
      this.checkFederated(address)
    }
  }

  checkFederated = _.debounce( (address)=> {
    this.props.resolveFederation(address);
  }, 500)

  handleAmountChange = (amount: string) => {
    this.setState({
      amount
    })
  }
  handleMemoChange = ({memo, memoType}: {memo: string, memoType: MemoType}) => {
    this.setState({
      memo,
      memoType,
      isValidMemo: validateMemo(memo, memoType)
    })
  }

  getTotalFees = () => {
    return calcFees({
      amount: this.state.amount,
      feeFixed: this.props.feeFixed,
      feePercent: this.props.feePercent,
      scaleFull: this.props.scaleFull
    })
  }

  // If based on the address, it can proceed
  _canProceedAddress = () => {
    if (this.state.addressHasAsterisk && this.props.isOnlyStellar) {
      const {status, isValid, isStellarAddress, address} = this.props.federationResult;
      if(status === SUCCESS && isValid && isStellarAddress && this.state.address === address && this.state.amount) {
        return true
      } else {
        return false
      }
    } else if(validateAddress(this.state.address).isValid && this.state.amount) {
      return true
    } else {
      return false
    }
  }

  // If based on the memo, it can proceed
  _canProceedMemo = () => {
    return (!this.state.memo || this.state.isValidMemo)
  }

  canProceed = () => {
    if(this.getTotalFees() === null) {  // if can't caculate fees, don't proceed.
      return false
    }
    return this._canProceedAddress() && this._canProceedMemo()

  }

  showMemo = () => {
    const {isStellarAddress, address} = this.props.federationResult

    if((isStellarAddress && this.state.address === address) || validateAddress(this.state.address).isStellarAddress) {
      return true
    }
    return false
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.federationResult.memoType) {
      this.setState({memoType: nextProps.federationResult.memoType});
    }

    if (nextProps.federationResult.memo) {
      this.setState({
        memo: nextProps.federationResult.memo,
        isMemoLocked: true
      });
    } else {
      this.setState({isMemoLocked: false});
    }
  };

  render() {

    // Dynamic Modal Text
    let modalTitleText = "Send " + this.props.coinName

    if(this.state.isConfirming) {
      modalTitleText = "Confirm " + modalTitleText
    }

    const modalTitle = (
      <div>
         <span className="BalanceEntry__logo">
          <CoinIcon icon={ this.props.code }/>
        </span>
        { modalTitleText }
      </div>
    )


    // View switches on isConfirming
    let view
    if (this.state.isConfirming) {
      const totalFees = this.getTotalFees()
      view = (
        <Confirm
          goBack={ this.goBack }
          wallet={ this.props.coinName  }
          address={ this.state.address }
          amount={ this.state.amount }
          code={this.props.code}
          showMemo={ this.showMemo() }
          memo={ this.state.memo }
          memoType={ this.state.memoType }
          sendFunds={this.props.sendFunds}
          error={this.props.error}
          isSending={this.props.isSending}
          federationResult={ this.props.federationResult }
          totalFees={ totalFees }
          clearErrors={ this.props.clearErrors }
        />
      )
    } else {
      view = (
        <Form
          code={this.props.code}
          coinName={this.props.coinName}
          addressEntryText={this.props.addressEntryText}
          isSending={this.props.isSending}
          scaleFull={this.props.scaleFull}
          confirm={ this.confirm }
          address={ this.state.address }
          onAddressChange={ this.handleAddressChange }
          amount={ this.state.amount }
          onAmountChange={ this.handleAmountChange }
          canProceed={ this.canProceed() }
          showMemo={ this.showMemo() }
          memo={ this.state.memo }
          memoType={ this.state.memoType }
          isMemoLocked={this.state.isMemoLocked}
          onMemoChange={ this.handleMemoChange }
          isValidMemo={ this.state.isValidMemo }
          federationResult={ this.props.federationResult }
          addressHasAsterisk={ this.state.addressHasAsterisk }
        />
      )
    }

    return (
      <Modal
        contentLabel="Send Funds Modal"
        isOpen={this.props.isOpen}
        onRequestClose={this.onModalClose}
        modalClassName="SendModal"
        modalTitle={modalTitle}
        initialInputFocus={true}
      >
        { view }
      </Modal>
    );
  }
}

export default SendModal;
