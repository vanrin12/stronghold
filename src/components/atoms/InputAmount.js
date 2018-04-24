// @flow
import * as React from "react"
import BigNumber from "bignumber.js"

type Props = {
  onChange: Function,
  disabled: boolean,
  onlyPositive: boolean,
  toScale: false | number,
  value: string,
  className?: string,
  name?: string
}

class InputAmount extends React.Component<Props> {
  input : ?HTMLInputElement

  static defaultProps = {
    disabled: false,
    onlyPositive: false,
    toScale: false
  }

  // Set the state, and give new amount to parent.
  applyAmountChange = (amount: string) => {
    this.props.onChange(amount)
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const amount = event.target.value

    if(amount === "" || amount === ".") {  // Allow
      this.applyAmountChange(amount)
    } else {
      try {
        // Make sure it a valid number, will throw if isn't
        const bAmount = new BigNumber(amount)

        // Disallow input, if doesn't match requirements
        if(this.props.onlyPositive && bAmount.lessThan(0)) {  // just in case user is trying to enter 0.1 (it's 0 first)
          return
        } else if(this.props.toScale !== false) {
          const { toScale } = this.props
          const dec = amount.split('.')
          if(dec && dec.length >= 2 && dec[1].length > toScale) {
            return
          }
        }

        this.applyAmountChange(amount)

      } catch(err) {  // drop invalid inputs
      }
    }
  }

  handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if(this.input && this.input.value) {
      this.applyAmountChange(this.input.value.trim())
    }
  }

  render() {
    return (
      <input
        type="text"
        name={ this.props.name || "amount" }
        placeholder="0.00"
        disabled={ this.props.disabled }
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        value={this.props.value}
        ref={ el => this.input = el }
        className={ this.props.className }
      />
    )
  }
}

export default InputAmount
