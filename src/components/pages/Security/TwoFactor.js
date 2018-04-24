import * as React from 'react'

import { codeToSend, codeToSignIn } from '../../../config/SecurityDummyData'

import PhoneTable from './PhoneTable'

import RadioList from './RadioList'

class TwoFactor extends React.Component<Props> {
  state = {
    codeToSend: 'over1000',
    codeToSignIn: 'onceAWeek'
  }

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( this.phoneNumber && this.phoneNumber.value) {
      // API for adding phone number to database
      console.log(this.phoneNumber.value);
    }
  }

  onCodeToSendChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.value) {
      this.setState({codeToSend: event.target.value})
    }
  }

  onCodeToSignInChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.value) {
      this.setState({codeToSignIn: event.target.value})
    }
  }

  onSave() {
    console.log(this.state.codeToSignIn, this.state.codeToSend);
  }

  render() {

    return (
      <div className="inline-block w--100">
        <div className="col-xs-12 mb--3">
          <h3 className="color--primary unmarg">Two-Factor Authentication</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="col-sm-4">
            <input
              type="text"
              ref={ el => this.phoneNumber = el }
            />
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn--primary">Add New Phone</button>
          </div>
        </form>
        <div className="table-responsive mb--4">
          <PhoneTable
            openModal={this.props.openModal}
          />
        </div>
        <div className="col-sm-3">
          <RadioList
            title="Require verification code to send:"
            data={codeToSend}
            checked={this.state.codeToSend}
            onChange={this.onCodeToSendChange}
          />
        </div>
        <div className="col-sm-3">
          <RadioList
            title="Require verification code to sign in:"
            data={codeToSignIn}
            checked={this.state.codeToSignIn}
            onChange={this.onCodeToSignInChange}
          />
        </div>
        <div className="flex justify-end col-xs-12">
          <a className="btn btn--primary" onClick={this.onSave.bind(this)}>
            <span className="btn__text">Save</span>
          </a>
        </div>
      </div>
    )
  }
}

export default TwoFactor
