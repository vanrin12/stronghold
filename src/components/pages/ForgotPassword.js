// @flow
import * as React from 'react'

import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import TopNav from '../containers/TopNav'
import FlashMessages from '../containers/FlashMessages'

import "./ForgotPassword.css"

type Props = {
  forgotPasswordRequest: Function
}

class ForgotPassword extends React.Component<Props> {
  email: ?HTMLInputElement

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if( this.email && this.email.value) {
      this.props.forgotPasswordRequest(this.email.value)
    }
  }

  render() {
    return (
      <div className="ForgotPassword main-container">
        <Helmet>
          <title>Forgot Password | Stronghold</title>
        </Helmet>
        <TopNav />
        <div className="main-container">
          <section className="text-center">
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-sm-7 col-md-5">
                  <h2>Forgot Password?</h2>
                  <p className="lead">
                    Enter your email address to reset your password.
                  </p>
                  <FlashMessages />
                  <form onSubmit={ this.handleSubmit }>
                    <input
                      type="email"
                      placeholder="Email Address"
                      ref={ el => this.email = el }
                    />
                    <button className="btn btn--primary type--uppercase" type="submit">Reset Password</button>
                  </form>
                  <span className="type--fine-print block">Don't have an account yet? <Link to="/signup">Create account</Link>
                  </span>
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

export default ForgotPassword
