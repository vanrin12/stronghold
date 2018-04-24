// @flow
import * as React from 'react'
import _ from "lodash"

import MaskedInput from 'react-text-mask'
import type { RemoteStatusType } from "../../types"
import { LOADING, FAILURE } from "../../types"

import "./PinInput.css"

const PIN_LENGTH = 6

type Props = {
  pin: Array<string>,
  onSubmit: Function,
  onChange: Function,  // currently component must be controlled
  status?: RemoteStatusType
}

class PinInput extends React.Component<Props> {
  static defaultProps = {
    pin: ["","","","","",""]
  }

  // Focus to next input
  nextFocus = (index: number) => {
    if (index < PIN_LENGTH) {
      const verifyInput = document.getElementById('verifyInput-' + (index + 1));
      if(verifyInput) {
        verifyInput.focus();
      }
    }
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>, index: number) => {
    const verifyPin = _.clone(this.props.pin);

    if(event.target.value.length > 0 && index < PIN_LENGTH) {
      this.nextFocus(index)
    }

    verifyPin[index] = event.target.value

    this.props.onChange(verifyPin, this.submit)

  }

  handleKeyDown = (e: SyntheticKeyboardEvent<HTMLInputElement>, index: number) => {
    // If user is on a number, and enter's a new key, replace the current field and move onto the next field.
    if(e.keyCode >= 48 && e.keyCode <= 57) {  // [0-9]
      const value = (e.keyCode - 48).toString()  // the value of key entered
      const currentValue = this.props.pin[index]
      if( currentValue !== "" ) {
        const verifyPin = _.clone(this.props.pin);
        verifyPin[index] = value

        // Auto-submit if changed the last field
        if(index === (PIN_LENGTH - 1)) {
          this.props.onChange(verifyPin, this.submit)
        } else {
          this.props.onChange(verifyPin)
        }
        this.nextFocus(index)
      }
    }
  }

  handleKeyUp = (e: SyntheticKeyboardEvent<HTMLInputElement>, index: number) => {
    // Focus on previous digit on backspace
    if(e.keyCode === 8 && index > 0) {
      const verifyInput = document.getElementById('verifyInput-' + (index - 1));
      if(verifyInput) {
        verifyInput.focus();
      }

    }
  }

  handlePaste = (e: SyntheticClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedData = e.clipboardData.getData("text/plain");
    if (pastedData !== "") {
      const verifyPin = _.clone(this.props.pin);
      let pastedNumberIndex = 0;

      for (index; index < PIN_LENGTH; index++) {
        verifyPin[index] = pastedData[pastedNumberIndex++]
      }

      // Auto-submit if changed the last field
      if(index === (PIN_LENGTH - 1)) {
        this.props.onChange(verifyPin, this.submit)
      } else {
        this.props.onChange(verifyPin)
      }
      this.nextFocus(index)
    }
  };

  submit = () => {
    const pinVal = this.props.pin.join("")
    if(pinVal.length === PIN_LENGTH) {

      /*
      // disables the input form, but no way to re-enable on invalid code
      let verifyInputsList: HTMLCollection<any> = document.getElementsByClassName('verify-input');
      for (var i = 0; i < verifyInputsList.length; i++) {
        verifyInputsList[i].disabled = true;
      }
      */

      this.props.onSubmit(pinVal)
    }
  }

  componentDidMount() {
    // Focus on first field
    const verifyInput = document.getElementById('verifyInput-0')
    if(verifyInput) {
      verifyInput.focus()
    }
  }
  render() {
    let status
    if (this.props.status) {
      let statusMsg;
      if (this.props.status === LOADING) {
        statusMsg = "Verifying..."
      } else if(this.props.status === FAILURE) {
        statusMsg = <span className="color--error">Invalid security code. Please try again.</span>
      }

      status = <p className="text-center">{statusMsg}</p>
    }

    return (
      <div className="PinInput">
        <div className="flex justify-center align-center mb--2">
          {
            _.range(PIN_LENGTH).map((index) => {
              return (
                <MaskedInput
                  mask={[/[0-9]/]}
                  id={`verifyInput-` + index}
                  className='verify-input'
                  type="tel"
                  maxLength="1"
                  minLength="1"
                  key={ index }
                  onChange={(e) => {this.handleChange(e, index)}}
                  onKeyDown={(e) => {this.handleKeyDown(e, index)}}
                  onKeyUp={(e) => {this.handleKeyUp(e, index)}}
                  onPaste={(e) => {this.handlePaste(e, index)}}
                  value={ this.props.pin[index] }
                />
              )
            })
          }
        </div>
        { status }
      </div>
    )
  }
}

export default PinInput
