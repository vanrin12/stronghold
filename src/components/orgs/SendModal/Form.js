// @flow
import * as React from 'react'

import { RingLoader as Loader } from 'halogenium'

import Memo from './Memo'
import InputAmount from "../../atoms/InputAmount"
import FederationAddress from "./FederationAddress"

import type { MemoType } from "../../../types"

import "./Form.css"

type Props = {
  code: string,
  coinName: string,
  addressEntryText: string,

  isSending: boolean,
  scaleFull: number,

  confirm: Function,
  address: string,
  onAddressChange: Function,
  amount: string,
  onAmountChange: Function,
  canProceed: boolean,

  showMemo: boolean,
  memo: string,
  memoType: MemoType,
  onMemoChange: Function,
  isValidMemo: boolean,
  isMemoLocked: boolean,
  federationResult: Object,
  addressHasAsterisk: boolean
}

class SendForm extends React.Component<Props> {
  address : ?HTMLInputElement

  static defaultProps = {
    coinName: 'Funds'
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.confirm()
  }

  handleAddressChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    event.preventDefault()
    this.props.onAddressChange(event.target.value)
  }
  handleAddressBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if(this.address && this.address.value) {
      const address = this.address.value
      if (address !== address.trim()) {
        this.props.onAddressChange(address.trim())
      }
    }
  }


  render() {


    let memoArea = null

    // Show memo area
    if (this.props.showMemo) {
      memoArea = (
        <div className="col-sm-12">
          <Memo
            isSending={this.props.isSending}
            onChange={this.props.onMemoChange}
            memo={this.props.memo}
            memoType={this.props.memoType}
            isValid={ this.props.isValidMemo }
            isLocked={ this.props.isMemoLocked }
          />
        </div>
      )
    }

    let button, className = "SendForm"
    if (this.props.isSending) {
      button = <button type="submit" className="btn btn--primary" disabled>Sending {this.props.coinName} <Loader size="18px" className="SendForm__Loader" /></button>
      className += " SendForm--is-sending"

    } else {
      button = <button type="submit" className="btn btn--primary" disabled={!this.props.canProceed}>Send {this.props.coinName}</button>
    }

    let federationAddress = null
    // Show federationAddress if Stellar Address
    /*
    if (this.props.federationResult.accountId && this.props.address === this.props.federationResult.address) {
      federationAddress = (
        <span className="federation-address color--success">
          { this.props.federationResult.accountId }
        </span>
      )
    }
    */
    if (this.props.addressHasAsterisk) {
      federationAddress = <FederationAddress result={this.props.federationResult} address={this.props.address} />
    }

    return (
      <div
        className={ className }
      >
        <form className="SendForm__form" onSubmit={this.handleSubmit}>
          <div className="col-md-12">
            <label>Recipient</label>
            <input
              className="validate-required"
              type="text"
              name="to_address"
              placeholder={this.props.addressEntryText || "Email or Wallet Address"}
              disabled={this.props.isSending}
              value={ this.props.address }
              onChange={ this.handleAddressChange }
              onBlur={ this.handleAddressBlur }
              ref={ el => this.address = el }
              spellCheck="false"
            />
            { federationAddress }
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-sm-12">
                <label>Amount</label>
              </div>
              <div className="col-xs-10">
                <InputAmount
                  disabled={ this.props.isSending }
                  onChange={ this.props.onAmountChange }
                  onlyPositive={ true }
                  toScale={ this.props.scaleFull }
                  value={ this.props.amount }
                />
                {/*
                <input type="text" name="amount" placeholder="0.00" ref={el=>this.amount = el} disabled={this.props.isSending} />
                */}
              </div>
              <div className="col-xs-2">
                <span className="SendForm__amount">{ this.props.code }</span>
              </div>
            </div>
          </div>

          { memoArea }

          <div className="col-lg-8 col-lg-offset-2 col-sm-10 col-sm-offset-1">
            { button }
          </div>
        </form>
      </div>
    );
  }
}

export default SendForm;
