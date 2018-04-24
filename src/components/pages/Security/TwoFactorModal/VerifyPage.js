// @flow
import * as React from 'react'

import PinInput from "../../../molecules/PinInput"

import type { RemoteStatusType } from "../../../../types"

type Props = {
  code: Array<string>,
  verify: Function,
  onCodeChange: Function,
  status: RemoteStatusType
}

class VerifyPage extends React.Component<Props> {
  render() {

    return (
      <div className="TwoFactorModal__VerifyPage boxed--sm modal-content modal-content-verification">
        <p className="text-center">
          Enter the 6-digit security code from the Authentication app
        </p>
        <PinInput
          pin={ this.props.code }
          onSubmit={ this.props.verify }
          onChange={ this.props.onCodeChange }
          status={ this.props.status }
        />
      </div>
    )

  }
}

export default VerifyPage;
