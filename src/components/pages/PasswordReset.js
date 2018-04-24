// @flow
import * as React from 'react'

import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import TopNav from '../containers/TopNav'
import FlashMessages from '../containers/FlashMessages'

import "./PasswordReset.css"

type Props = {
  resetPassword: Function,
  match: Object,
  history: Object
}

class PasswordReset extends React.Component<Props> {
  password: ?HTMLInputElement;
  password2: ?HTMLInputElement;

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.password && this.password2) {
      this.props.resetPassword(this.password.value, this.password2.value, this.props.match.params.token, this.props.history)
    }
  };

  render() {
    return (
      <div className="PasswordReset">
        <Helmet>
          <title>Reset Password | Stronghold</title>
        </Helmet>
        <TopNav />
        <div className="main-container">
          <section className="text-center">
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-sm-7 col-md-5">
                  <h2>Reset Password</h2>
                  <p className="lead">
                    Enter your new password below.
                  </p>
                  <FlashMessages />
                  <form onSubmit={ this.handleSubmit }>
                    <input
                      type="password"
                      placeholder="New Password"
                      ref={ el => this.password = el }
                    />
                    <input
                      type="password"
                      placeholder="Verify New Password"
                      ref={ el => this.password2 = el }
                    />
                    <button className="btn btn--primary type--uppercase" type="submit">Change Password</button>
                  </form>
                  <span className="type--fine-print block">Don't have an account yet? <Link to="/signup">Create account</Link></span>
                </div>
              </div>
              {/*!--end of row--*/}
            </div>
            {/*!--end of container--*/}
          </section>
        </div>
      </div>
    )
  }
}

export default PasswordReset;
