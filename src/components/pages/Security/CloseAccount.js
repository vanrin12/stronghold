// @flow
import * as React from 'react'

type Props = {
  onClick: Function
}

class CloseAccount extends React.Component<Props> {
  render() {
    return (
      <div className="flex justify-between">
        <div className="col-md-9">
          <h3 className="unmarg">Close Account</h3>
          <p>Withdraw funds and close your Coinbase account - this cannot be undone</p>
          <button className="btn col-xs-6 col-md-3" onClick={this.props.onClick}>Close Account</button>
        </div>
      </div>
    )
  }
}

export default CloseAccount
