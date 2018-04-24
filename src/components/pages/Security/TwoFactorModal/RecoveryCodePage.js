// @flow

import * as React from "react"

import type { TwoFactorSetup } from "../../../../types"

type Props = {
  data: ?TwoFactorSetup
}

export default function RecoveryCodePage(props: Props) {
  let code = ""
  if (props.data && props.data.recoveryCode) {
    code = props.data.recoveryCode
  }
  return (
    <div className="TwoFactorModal__RecoveryCodePage">
      Please write down this recovery code. You will need to provide this to support if you ever lose your 2FA device.
      <br />
      <code style={{margin: "1.5rem 0.5rem 2rem", display: "block", fontSize: "1.77rem", padding: "1rem"}}>
        { code }
      </code>
    </div>
  )
}
