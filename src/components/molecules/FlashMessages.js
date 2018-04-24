// @flow
import * as React from 'react';

import './FlashMessages.css'

type Props = {
  message: string,
  list: Array<string>,
  reset: Function,
  type: string
}

class FlashErrors extends React.Component<Props> {
  componentWillUnmount() {
    if (this.props.message) {
      this.props.reset()
    }
  }
  render() {
    if (this.props.message) {

      let list
      if (this.props.list && this.props.list.length) {
        const errors = this.props.list.map( (error, index) => {
          return (
            <li key={'fl-err-'+index}>{ error }</li>
          )
        })
        list = (
          <ul>
            { errors }
          </ul>
         )
      }

      let colorClass = "bg--error"
      if (this.props.type === 'info') {
        colorClass = "bg--primary"
      }

      return (
        <div className={"FlashErrors alert " + colorClass}>
          <div className="alert__body">
            { this.props.message }
            { list }
          </div>
          <div className="alert__close" onClick={this.props.reset}>
            x
          </div>
        </div>
      )
    }
    return null
  }
}

export default FlashErrors;
