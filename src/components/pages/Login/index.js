// @flow
import * as React from 'react';

import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import type { LoginReqState } from "../../../types"

import TopNav from "../../containers/TopNav"

import LoginBG from "../../../assets/img/stronghold-vault-dark.jpg"

import LoginForm from "./Form"
import TwoFactorForm from "./TwoFactorForm"

import "./index.css"

type Props = {
  login: Function,
  loginReq: LoginReqState,
  flashMessage: Object,
  sendEmailVerification: Function,
  twoFactorVerify: Function,
  reset: Function
}

type State = {
  loaded: boolean
}

class Login extends React.Component<Props, State> {
  state = {
    loaded: false
  }

  hasTwoFactor = () => {
    const req = this.props.loginReq
    return req.data && req.data.errorCode === "INCORRECT_CODE"
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({loaded: true});  // for transistions
    }, 0)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    let form
    if ( this.hasTwoFactor() ) {
      form = (
        <TwoFactorForm
          login={ this.props.login }
          req={ this.props.loginReq }
        />
      )
    } else {
      form = (
        <LoginForm
          flashMessage={ this.props.flashMessage }
          sendEmailVerification={ this.props.sendEmailVerification }
          login={ this.props.login }
          status={ this.props.loginReq.status }
        />
      )
    }
    return (
      <div className="Login">
        <Helmet>
          <title>Login to Stronghold</title>
          <meta name="description" content="Stonghold Login" />
        </Helmet>
        <TopNav transparent />
        <div className="main-container">
          <section className="height-100 imagebg text-center" data-overlay="4">
            <div className={"background-image-holder "+ (this.state.loaded ? 'loaded' : '')}>
              <img alt="background" src={LoginBG} />
            </div>
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-sm-7 col-md-5">
                  <h2>Login to continue</h2>

                  { form }

                  <span className="type--fine-print block">Don't have an account yet? <Link to="/signup">Create account</Link>
                  </span>
                  <span className="type--fine-print block">Forgot your username or password? <Link to="/forgot_password">Recover account</Link>
                  </span>
                </div>
              </div>
              {/*!--end of row--*/}
            </div>
            {/*!--end of container--*/}
          </section>
        </div>
      </div>
    );
  }
}

export default Login;
