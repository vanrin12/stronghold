// @flow
import * as React from 'react'
import querystring from 'querystring'
import { isEmail } from 'validator'

import Helmet from 'react-helmet'
import { RingLoader as Loader } from 'halogenium'

import TopNav from '../containers/TopNav'
import FlashMessages from '../containers/FlashMessages'

import StrongholdSafe from '../../assets/img/stronghold-safe.jpg'

import './SignUp.css'

type Props = {
  signUp: Function,
  isInProgress: boolean
}
type State = {
  loaded: boolean
};

class SignUp extends React.Component<Props, State> {
  email: ?HTMLInputElement
  password: ?HTMLInputElement

  state = {
    loaded: false
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(this.email && this.password) {
      this.props.signUp(this.email.value, this.password.value)
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({loaded: true});  // for transistions
    }, 0)

    // Remove the email query string param
    if(querystring.parse(window.location.search.substring(1)).email) {
      window.history.replaceState({}, document.title, "/#/signup" )
    }
  }
  render() {
    let emailDefaultValue = ''
    const emailFromQuery = querystring.parse(window.location.search.substring(1)).email
    if(emailFromQuery && isEmail(emailFromQuery)) {
      emailDefaultValue = emailFromQuery
    }

    let submitButton = <button type="submit" className="btn btn--primary type--uppercase">Create Account</button>

    if (this.props.isInProgress) {
      submitButton = <button type="submit" className="btn btn--primary type--uppercase" disabled>Creating Account <Loader size="18px" className="SignUp__Loader" /></button>
    }

    return (
      <div className="SignUp">
        <Helmet>
          <title>Sign Up | Stronghold</title>
          <meta name="description" content="Sign Up at Stronghold" />
        </Helmet>
        <TopNav />
        <div className="main-container">
          <section className="imageblock switchable feature-large height-100">
            <div className="imageblock__content col-md-6 col-sm-4 pos-right">
              <div className={"background-image-holder "+ (this.state.loaded ? 'loaded' : '')}>
                <img alt="stronghold safe" src={StrongholdSafe} />
              </div>
            </div>
            <div className="container pos-vertical-center">
              <div className="row">
                <div className="col-md-5 col-sm-7">
                  <h2>Create a Stronghold account</h2>
                  <p className="lead">Create your own free digital currency wallet in minutes.</p>
                  <FlashMessages />
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-xs-12">
                        <input
                          type="email"
                          name="Email Address"
                          placeholder="Email Address"
                          ref={(el)=>this.email = el}
                          disabled={this.props.isInProgress}
                          defaultValue={emailDefaultValue}
                        />
                      </div>
                      <div className="col-xs-12">
                        <input
                          type="password"
                          name="Password"
                          placeholder="Password"
                          ref={(el)=>this.password = el}
                          disabled={this.props.isInProgress}
                        />
                      </div>
                      <div className="col-xs-12">
                        { submitButton }
                      </div>
                      <div className="col-xs-12">
                        <span className="type--fine-print">By signing up, you agree to the <a href="https://stronghold.co/terms-of-service/">Terms of Service</a>
                        </span>
                      </div>
                    </div>
                    {/*!--end row--*/}
                  </form>
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

export default SignUp;
