// @flow
import * as React from "react"

import _ from "lodash"

import { RingLoader as Loader } from 'halogenium'

import ErrorBox from '../../atoms/ErrorBox'

import { validateAddress } from "../../../apis/addressValidation"

import type { MemoType } from "../../../types"

import "./Confirm.css"

type Props = {
  goBack: Function,
  address: string,
  wallet: string,
  amount: string,
  code: string,

  showMemo: boolean,
  memo: string,
  memoType: MemoType,

  sendFunds: Function,
  error: ?Object,
  isSending: boolean,

  federationResult: Object,
  totalFees: string|null,

  clearErrors: Function
}

class SendConfirm extends React.Component<Props> {
  handleGoBack = ()=> {
    this.props.clearErrors()
    this.props.goBack()
  }
  handleConfirm = (event: SyntheticEvent<HTMLElement>)=> {
    event.preventDefault()

    let address = this.props.address
    if (this.isStellar()) {
      address = this.props.federationResult.accountId
    }

    if (this.props.showMemo && this.props.memo) {
      this.props.sendFunds({
        address,
        amount: this.props.amount,
        code: this.props.code,
        memo: this.props.memo,
        memoType: this.props.memoType,
        fees: this.props.totalFees
      })
    } else {
      this.props.sendFunds({
        address,
        amount: this.props.amount,
        code: this.props.code,
        fees: this.props.totalFees
      })
    }
  }

  isStellar = () => {
    const {accountId, address, isValid, isStellarAddress} = this.props.federationResult
    return accountId && this.props.address === address && isValid && isStellarAddress
  }

  render() {
    let errorBox = null
    if (_.isObject(this.props.error)) {
      const { error } = this.props

      let errorMsg = ""
      if (error && error.requestId) {
        if (error.errorCode === "BAD_MEMO") {
          errorMsg = "Your memo is invalid."
        } else if (error.errorCode === "NO_SEND_SELF") {
          errorMsg = "You cannot send to one of your own accounts."
        } else {
          errorMsg = (
            <div>
              We are unable to send your funds at this time. <br />
              If you have further inquiry <a href="https://stronghold.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">get help</a>. <br />
              <small>{ "requestId: " + error.requestId }</small>
            </div>
          )
        }
      } else if(error && error.code === "ADDRESS_BLANK") {
        errorMsg = "Please enter a recipient."
      } else if(error && error.code === "AMOUNT_BLANK") {
        errorMsg = "Please enter an amount you'd like to send."
      } else if(error && error.code === "INVALID_AMOUNT") {
        errorMsg = "The amount you entered is invalid."
      } else if(error && error.code === "AMOUNT_NOT_POSITIVE") {
        errorMsg = "The amount must be greater than 0."
      } else if(error && (error.code === "AMOUNT_NOT_ENOUGH" || error.code === "AMOUNT_WITH_FEES_NOT_ENOUGH")) {
        errorMsg = "You have insufficent funds for this transfer."
      }

      if (!errorMsg) {
        errorMsg = "We are unable to send your funds at this time."
      }

      errorBox = (
        <ErrorBox showCloseButton={false}>
          <div className="SendForm__error">
            { errorMsg }
          </div>
        </ErrorBox>
      )
    }

    let memo = null
    if (this.props.showMemo && this.props.memo) {
      memo = (
        <div className="SendConfirm__details__row">
          <dt>Memo</dt>
          <dd className="SendConfirm__details__cell">
            <span>
              Type: <span className="SendConfirm__memoType">{ this.props.memoType }</span>
            </span>
            <span className="SendConfirm__memo">
              { this.props.memo }
            </span>
          </dd>
        </div>
      )
    }

    let className = "SendConfirm"

    let confirmButton
    if(this.props.isSending) {
      confirmButton = (
        <a className="btn btn--primary" disabled>
          <span className="btn__text">Sending <Loader size="18px" className="SendConfirm__Loader" /></span>
        </a>
      )
      className += " SendConfirm--is-sending"
    } else {
      confirmButton = (
        <a onClick={ this.handleConfirm } className="btn btn--primary" disabled={this.props.isSending}>
          <span className="btn__text">Confirm</span>
        </a>
      )

    }

    let addressTo
    addressTo = "Stellar address"
    const validated = validateAddress(this.props.address)

    if(this.isStellar() || (validated.isValid && validated.isStellarAddress)) {
      addressTo = "Stellar address"
    } else {
      addressTo = this.props.wallet + " address"
    }

    let address = this.props.address
    if (this.props.federationResult.accountId && this.props.address === this.props.federationResult.address) {
      address = <span className="federation-address color--success">{ this.props.federationResult.accountId }</span>
    }

    // Fees
    let feesText
    if (this.props.totalFees !== null) {
      feesText = `+ ${this.props.totalFees} ${this.props.code} withdrawal and network fees`
    } else {
      feesText = "Fees could not be calculated."
    }

    return (
      <div className={ className }>
        { errorBox }
        <dl className="SendConfirm__details">
          <div className="SendConfirm__details__row">
            <dt>To</dt>
            <dd className="SendConfirm__details__cell">
              <span>
                { addressTo }
              </span>
              <span className="SendConfirm__address">
                { address }
              </span>
            </dd>
          </div>
          <div className="SendConfirm__details__row">
            <dt>From</dt>
            <dd>
              { this.props.wallet + " account" }
            </dd>
          </div>
          <div className="SendConfirm__details__row">
            <dt>Total</dt>
            <dd>
              { this.props.amount + " " + this.props.code}
              <small className="SendConfirm__details__fees">{ feesText }</small>
            </dd>
          </div>
          { memo }
        </dl>

        <div className="SendConfirm__bottom">
          <small className="SendConfirm__warningText">Please verify your withdrawal destination address. We cannot refund an incorrect withdrawal.
            Do not withdraw directly to a crowdfund or ICO. We may not be able to credit your account with tokens from that sale.</small>
          <a onClick={ this.handleGoBack } className="btn" disabled={this.props.isSending}>
            <span className="btn__text">Go Back</span>
          </a>
          { confirmButton }
        </div>
      </div>
    )
  }
}

export default SendConfirm
