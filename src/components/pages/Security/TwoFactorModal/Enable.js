// @flow

import  * as React from "react"

import MultiPageModal from "../../../molecules/MultiPageModal"
import Page from "../../../atoms/ModalPage"

import CodePage from "./CodePage"
import RecoveryCodePage from "./RecoveryCodePage"
import VerifyPage from "./VerifyPage"

import type { RemoteStatusType, TwoFactorSetup } from "../../../../types"
import { LOADING, SUCCESS } from "../../../../types"

type Props = {
  close: Function,
  verify: Function,
  getSetup: {
    status: RemoteStatusType,
    data?: TwoFactorSetup
  },
  enabled: {
    status: RemoteStatusType
  },
  clearVerificationStatus: Function,
  has2Factor: ?boolean  // always should have a value
}

type State = {
  code: Array<string>
}

class TwoFactorModalEnable extends React.Component<Props, State> {
  state = {
    code: ["","","","","",""]
  }

  verifyCode = () => {
    if(this.props.getSetup.status === SUCCESS && this.props.getSetup.data && this.props.getSetup.data.id) {
      const id = this.props.getSetup.data.id
      const code = this.state.code.join("")
      this.props.verify(id, code)
    }
  }

  handleCodeChange = (code: Array<string>, callback: Function) => {
    this.setState({code}, ()=>{
      this.props.clearVerificationStatus()
      if(callback && typeof callback === "function") {
        callback()
      }
    })
  }

  handleVerifyPrevClick = () => {
    this.props.clearVerificationStatus()
    this.setState({code: ["","","","","",""]})
  }
  handleRequestClose = () => {
    if (this.props.enabled.status !== LOADING) {
      this.props.close()
    }
  }

  render() {
    return (
      <div className="TwoFactorModal__Enable">
        <MultiPageModal
          contentLabel="Two-Factor Authentication Setup Modal"
          onRequestClose={ this.handleRequestClose }
          modalTitle="Enable Two-Factor Authentication"
        >
          <Page canProceed={ ()=> this.props.getSetup.status === SUCCESS }>
            <CodePage
              data={ this.props.getSetup.data }
              status={ this.props.getSetup.status }
            />
          </Page>
          <Page>
            <RecoveryCodePage
              data={ this.props.getSetup.data }
            />
          </Page>
          <Page
            nextButtonLabel="Verify"
            onNextClick={ this.verifyCode }
            onPrevClick={ this.handleVerifyPrevClick }
            canProceed={ ()=> this.props.enabled.status !== LOADING }
          >
            <VerifyPage
              code={ this.state.code }
              verify={ this.verifyCode }
              onCodeChange={ this.handleCodeChange }
              status={ this.props.enabled.status }
            />
          </Page>
        </MultiPageModal>
      </div>
    )
  }
}

export default TwoFactorModalEnable
