// @flow
import * as React from 'react'

import type { MemoType } from "../../../types"

import "./Memo.css"

type Props = {
  isSending: boolean,
  onChange: Function,
  memo: string,
  memoType: MemoType,
  isValid: boolean,
  isLocked: boolean
}

// For flow... perhaps there's a better way to make flow be quiet.
function getMemoType(type: string): MemoType {
  switch (type ) {
    case "id":
      return "id"
    case "text":
      return "text"
    case "hash":
      return "hash"
    default:
      return "id"
  }
}

class Memo extends React.Component<Props> {
  memo: ?HTMLInputElement

  static defaultProps = {
    isSending: false
  }

  handleMemoTypeChange = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    if(event && event.target && event.target.value) {
      this.onChange({
        memoType: getMemoType(event.target.value),
        memo: this.props.memo
      })
      if (this.memo) {
        this.memo.focus()  // focus on the memo input field
      }
    }
  }
  handleMemoChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if(event && event.target && event.target.value !== null) {
      this.onChange({
        memo: event.target.value || "",
        memoType: this.props.memoType
      })
    }
  }
  handleMemoBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if(this.memo && this.memo.value) {
      this.onChange({
        memo: this.props.memo.trim() || "",
        memoType: this.props.memoType
      })
    }
  }

  // Send values to parent.
  onChange = ({memo, memoType}: {memo: string, memoType: MemoType}) => {
    this.props.onChange({
      memo,
      memoType
    })
  }

  render() {
    let memoError = null
    if (this.props.memo && !this.props.isValid) {
      memoError = <span className="SendModal__Memo__error">Invalid Memo</span>
    }
    let memoLocked = null
    let memoLockedClass = ""
    if (this.props.memo && this.props.isLocked) {
      memoLocked = <span className="SendModal__Memo__locked">The memo has been retrieved from the username, please confirm it is correct.</span>
      memoLockedClass = "SendModal__Memo--locked"
    }

    return (
      <div className={"SendModal__Memo " + memoLockedClass}>
        <label>Memo</label>
        <div className="SendModal__Memo__input">
          <select
            className="minimal"
            disabled={this.props.isSending || this.props.isLocked}
            value={this.props.memoType}
            onChange={this.handleMemoTypeChange}
          >
            <option value="id">Type: ID</option>
            <option value="text">Type: Text</option>
            <option value="hash">Type: Hash</option>
          </select>
          <input
            type="text"
            name="memo"
            disabled={this.props.isSending || this.props.isLocked}
            value={this.props.memo}
            onChange={this.handleMemoChange}
            onBlur={this.handleMemoBlur}
            ref={el=>this.memo=el}
          />
          <div className="SendModal__Memo__lock-overlay"></div>
        </div>
        { memoError }
        { memoLocked }
      </div>
    )
  }
}
export default Memo

