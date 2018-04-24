// @flow
import * as React from 'react';

import { ClipLoader as Loader } from 'halogenium'

import FlashMessages from "../../containers/FlashMessages"
import ErrorBox from "../../atoms/ErrorBox"

import type { RemoteStatusType } from "../../../types"
import { LOADING } from "../../../types"

type Props = {
  login: Function,
  flashMessage: Object,
  sendEmailVerification: Function,
  status: RemoteStatusType
}

type State = {
  isLoggingIn: boolean
}

class LoginForm extends React.Component<Props, State> {
  username: ?HTMLInputElement
  password: ?HTMLInputElement

  state = {
    isLoggingIn: false
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(this.username && this.password && !this.state.isLoggingIn) {
      const username = this.username.value
      const password = this.password.value

      this.setState({
        isLoggingIn: true
      }, ()=>{
        this.props.login(username, password)
      })
    }
  }

  handleResendConfirmationEmail = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()
    if(this.username && this.username.value) {
      this.props.sendEmailVerification(this.username.value)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if(this.state.isLoggingIn && nextProps.status !== LOADING) {
      this.setState({isLoggingIn: false})
    }
  }

  render() {
    let flashMessages = <FlashMessages />
    // If EMAIL_UNCONFIRMED, show link to resend email verification
    if(this.props.flashMessage && this.props.flashMessage.type === 'error' && this.props.flashMessage.code === 'EMAIL_UNCONFIRMED') {
      flashMessages = (
        <ErrorBox>
          {this.props.flashMessage.message}
          <br />
          <a href="#confirm" onClick={this.handleResendConfirmationEmail}>Click here</a> to resend confirmation email.
        </ErrorBox>
      )
    }

    let loginButton
    if( this.state.isLoggingIn ) {
      loginButton = (
        <button className="btn btn--primary type--uppercase" type="submit" disabled>
          Logging In...
          <Loader className="Login__loader" size="20px" />
        </button>
      )
    } else {
      loginButton = (
        <button className="btn btn--primary type--uppercase" type="submit">Login</button>
      )
    }

    return (
      <div className="Login__Form">
        <p className="lead">
          Welcome back, sign in with your existing Stronghold account credentials
        </p>
        { flashMessages }
        <form onSubmit={ this.handleSubmit }>
          <div className="row">
            <div className="col-sm-12">
              <input type="text" placeholder="Email" ref={ el => this.username = el } />
            </div>
            <div className="col-sm-12">
              <input type="password" placeholder="Password" ref={ el => this.password = el } />
            </div>
            <div className="col-sm-12">
              { loginButton }
            </div>
          </div>
          {/*!--end of row--*/}
        </form>
      </div>
    )
  }
}

export default LoginForm
