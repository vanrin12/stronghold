// @flow
import * as React from 'react'
import FlashMessages from '../../containers/FlashMessages'

import "./ChangePassword.css"

type Props = {
  changePassword: Function,
  //history: Object
}

type State = {}

class ChangePassword extends React.Component<Props, State> {
  currentPassword: ?HTMLInputElement;
  newPassword: ?HTMLInputElement;
  newPassword2: ?HTMLInputElement;

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.newPassword && this.newPassword2 && this.currentPassword && this.currentPassword.value) {
      this.props.changePassword(this.currentPassword.value, this.newPassword.value, this.newPassword2.value)
    }
  };

  render() {
    return (
      <div className="ChangePassword inline-block col-xs-12 w--100">
        <div className="col-xs-12 mb--3">
          <h3 className="color--primary unmarg">Change Password</h3>
          <p>Enter your current and new password below.</p>
        </div>
        <div className="col-xs-6 col-xs-offset-3">
          <FlashMessages />
          <form onSubmit={ this.handleSubmit }>
            <input
                type="password"
                placeholder="Current Password"
                ref={ el => this.currentPassword = el }
            />
            <input
              type="password"
              placeholder="New Password"
              ref={ el => this.newPassword = el }
            />
            <input
              type="password"
              placeholder="Verify New Password"
              ref={ el => this.newPassword2 = el }
            />
            <button className="btn btn--primary type--uppercase" type="submit">Change Password</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ChangePassword;
