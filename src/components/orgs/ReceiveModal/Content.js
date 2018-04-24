// @flow
import * as React from "react"

import "./Content.css"

type Props = {
  address: string,
  qrData: string,
  coinName: string,
  depositMinimum: string,
  depositDelayMinutes: number
}


export default function ReceiveModalContent(props: Props) {
  return (
    <div className="ReceiveModalContent">
      <img
        src={ "data:image/png;base64, " + props.qrData }
        alt={props.address}
        className="ReceiveModalContent__qr"
      />
      <div>
        <label className="ReceiveModalContent__label">Receive {props.coinName} at this location <div className="ReceiveModalContent__minimum-warning">minimum deposit of { props.depositMinimum }</div></label>
        <input type="text" value={ props.address } onClick={(e) => e.target.select()} readOnly />
      </div>
      <small className="ReceiveModalContent__warningText">Do not use your Stronghold address in a crowdfund or ICO. We may not be able to credit your account with tokens from that sale.</small>
      <small className="ReceiveModalContent__delayText">Deposits may take {props.depositDelayMinutes} minutes or longer to be credited to your account.</small>
    </div>
  )
}
