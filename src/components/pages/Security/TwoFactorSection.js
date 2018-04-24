// @flow
import * as React from 'react'

import Toggle from "react-toggle"
import { ClipLoader as Loader } from 'halogenium'

import "react-toggle/style.css"
import "./TwoFactor.css"

import { FAILURE, LOADING, SUCCESS } from "../../../types"
import type { RemoteStatusType } from "../../../types"

type Props = {
  open: Function,
  has2FA: {
    status: RemoteStatusType,
    data?: boolean
  }
}

class TwoFactor extends React.Component<Props> {
  handleToggleClick = () => {
    const { has2FA } = this.props
    if(has2FA.status === SUCCESS && typeof has2FA.data === "boolean") {
      this.props.open(has2FA.data)
    }
  }
  render() {

    let content
    if (this.props.has2FA.status === FAILURE) {
      content = (
        <div>
          <div className="col-xs-10 mb--3">
            <h3 className="color--primary unmarg">Two-Factor Authentication</h3>
            <span style={{color: "rgba(0,0,0,0.54)"}}>Could not get your 2FA status at this time.</span>
          </div>
        </div>
      )
    } else {
      let toggleButton
      if (this.props.has2FA.status === LOADING) {
        toggleButton = <Loader size="20px" color="#4A90E2" />
      } else if(this.props.has2FA.status === SUCCESS) {
        toggleButton = (
          <Toggle
            checked={ this.props.has2FA.data }
            onChange={ this.handleToggleClick }
            icons={{
              unchecked: null
            }}
          />
        )
      }
      content = (
        <div>
          <div className="col-xs-10 mb--3">
            <h3 className="color--primary unmarg">Two-Factor Authentication</h3>
            <p>Require a security key in addition to your password in order to login.</p>
          </div>
          <div className="col-xs-2">
            { toggleButton }
          </div>
        </div>
      )
    }
    return (
      <div className="Security__TwoFactor inline-block w--100">
      { content }
      </div>
    )
  }
}

export default TwoFactor
