// @flow

import * as React from "react"

import { ClipLoader as Loader } from 'halogenium'

import ErrorBox from "../../../atoms/ErrorBox"

import type { RemoteStatusType, TwoFactorSetup } from "../../../../types"
import { LOADING, FAILURE, SUCCESS } from "../../../../types"

import "./CodePage.css"

type Props = {
  status: RemoteStatusType,
  data?: TwoFactorSetup
}

export default function CodePage(props: Props) {
  let content
  if (props.status === LOADING) {
    content = <Loader size="35px" color="#76abe9" />
  } else if(props.status === FAILURE) {
    content = <ErrorBox>Could not fetch QR code. Please try again later.</ErrorBox>
  } else if(props.status === SUCCESS && props.data) {
    content = (
      <img
        className="TwoFactorModal__CodePage__code"
        src={ "data:image/png;base64, " + props.data.qrData }
        alt="QR Code for two-factor authentication setup"
      />
    )
  }
  return (
    <div className="TwoFactorModal__CodePage">
      <p>On your mobile device, download <b>Google Authenticator</b> or a compatible app.
      </p>
      <ul>
        <li>Add a new time-based token.</li>
        <li>Use the app to scan the QR code below.</li>
      </ul>
      <div className="TwoFactorModal__CodePage__content">
        { content }
      </div>
    </div>
  )
}
