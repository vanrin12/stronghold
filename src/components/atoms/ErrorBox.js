// @flow
import * as React from 'react';

import './ErrorBox.css'

type Props = {
  message?: string,
  children?: any,
  showCloseButton: boolean
}

type State = {
  isClosed: boolean
}

class ErrorBox extends React.Component<Props, State> {
  static defaultProps = {
    showCloseButton: true
  }
  state = {
    isClosed: false
  }

  handleClose = () => {
    this.setState({isClosed: true})
  }
  render() {
    if ((this.props.children || this.props.message) && !this.state.isClosed) {
      let closeButton = null
      if (false && this.props.showCloseButton) {  // TODO handleClose will have to be handled by ErrorBox's parent
        closeButton = (
          <div className="alert__close" onClick={this.handleClose}>
            x
          </div>
        )
      }
      return (
        <div className="ErrorBox alert bg--error">
          <div className="alert__body">
            { this.props.children || this.props.message }
          </div>
          { closeButton }
        </div>
      )
    }
    return null
  }
}

export default ErrorBox;
