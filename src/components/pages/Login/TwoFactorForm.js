// @flow
import * as React from 'react';

import PinInput from "../../molecules/PinInput"
import ErrorBox from "../../atoms/ErrorBox"

import type { LoginReqState } from "../../../types"
import { LOADING, FAILURE } from "../../../types"

type Props = {
  login: Function,
  req: LoginReqState
}

type State = {
  isVerifying: boolean,
  code: Array<string>
}

class TwoFactorForm extends React.Component<Props, State> {
  //code: ?HTMLInputElement

  state = {
    isVerifying: false,
    code: ["","","","","",""]
  }

  handleChange = (code: Array<string>, callback: Function) => {
    this.setState({code}, callback)
  }

  handleSubmit = () => {
  //handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    //event.preventDefault();
    if(!this.state.isVerifying) {
      const code = this.state.code.join("")

      let username, password
      if(this.props.req.form && this.props.req.form.username && this.props.req.form.password) {
        username = this.props.req.form.username
        password = this.props.req.form.password
      }

      this.setState({
        isVerifying: true
      }, ()=>{
        this.props.login(username, password, code)
      })
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if(this.state.isVerifying && nextProps.req.status !== LOADING) {
      this.setState({isVerifying: false})
    }
  }

  render() {
    let errorBox
    if ( this.props.req.status === FAILURE && this.props.req.count ) {  // Only show if count > 0
      errorBox = (
        <ErrorBox>
          The security code you've entered is not correct.<br />
          <a href="https://stronghold.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">Get Help</a> or try again.
        </ErrorBox>
      )
    }

    let submitButton
    if( this.state.isVerifying ) {
      submitButton = (
        <button className="btn btn--primary type--uppercase" type="submit" disabled>
          Verifying...
        </button>
      )
    } else {
      submitButton = (
        <button className="btn btn--primary type--uppercase" type="submit">Verify</button>
      )
    }

    return (
      <div className="Login__TwoFactorForm">
        <p className="lead">
          Enter your two-factor authentication code below to complete your login.
        </p>
        { errorBox }
        <PinInput
          pin={ this.state.code }
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
        />
        { submitButton }
        {/*
        <form onSubmit={ this.handleSubmit }>
          <div className="row">
            <div className="col-sm-12">
              <input type="text" placeholder="Verfication Code" ref={ el => this.code = el } minLength="6" maxLength="6" required />
            </div>
            <div className="col-sm-12">
            </div>
            <div className="col-sm-12">
              { submitButton }
            </div>
          </div>
        </form>
        */}
      </div>
    )
  }
}
export default TwoFactorForm
