// @flow

import * as React from "react"

import Modal from "../../../atoms/Modal"
import PinInput from "../../../molecules/PinInput"

import type { RemoteStatusType } from "../../../../types"
import { LOADING } from "../../../../types"

type Props = {
  close: Function,
  disabled: {
    status: RemoteStatusType
  },
  disable: Function
}

type State = {
  code: Array<string>
}

class TwoFactorModalDisable extends React.Component<Props, State> {
  state = {
    code: ["","","","","",""]
  }

  handleCodeChange = (code: Array<string>, callback: Function) => {
    this.setState({code}, callback)
  }

  disable2FA = () => {
    this.props.disable(this.state.code.join(""))
  }

  /*
  handleVerifyPrevClick = () => {
    this.props.clearVerificationStatus()
    this.setState({code: ["","","","","",""]})
  }
  handleRequestClose = () => {
    if (this.props.verification.status !== LOADING) {
      this.props.close()
    }
  }
  */
  handleRequestClose = () => {
    this.props.close()
    /*
    if (this.props.verification.status !== LOADING) {
      this.props.close()
    }
    */
  }

  render() {
    return (
      <div className="TwoFactorModal__Disable">
        <Modal
          contentLabel="Two-Factor Authentication Disable Modal"
          onRequestClose={ this.handleRequestClose }
          modalTitle="Disable Two-Factor Authentication"
          isOpen={ true }
        >
          <div className="boxed--sm modal-content modal-content-verification">
            <p className="text-center">
              Enter the 6-digit security code from your 2FA device to disable:
            </p>
            <PinInput
              pin={ this.state.code }
              onChange={ this.handleCodeChange }
              onSubmit={ this.disable2FA }
              status={ this.props.disabled.status }
            />
            <div style={{textAlign: "center", marginTop: "1rem"}}>
              <a
                onClick={ this.disable2FA }
                className="btn btn--primary"
                disabled={ this.props.disabled.status === LOADING }
              >
                <span className="btn__text">DISABLE 2FA</span>
              </a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default TwoFactorModalDisable
