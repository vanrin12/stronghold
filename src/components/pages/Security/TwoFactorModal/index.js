// @flow

import * as React from 'react'

import Enable from './Enable'
import Disable from './Disable'

import type { RemoteStatusType, TwoFactorSetup } from '../../../../types'

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
  has2Factor: ?boolean,  // always should have a value
  disabled: {
    status: RemoteStatusType
  },
  disable: Function,
}

class TwoFactorModal extends React.Component<Props> {
  render() {
    return (
      <div className="TwoFactorModal">
        { this.props.has2Factor ? <Disable {...this.props} /> : <Enable {...this.props} /> }
      </div>
    )
  }
}

export default TwoFactorModal
