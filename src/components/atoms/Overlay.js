// @flow
import * as React from "react"

import AriaModal from "react-aria-modal"
import { ClipLoader as Loader } from 'halogenium';

import "./Overlay.css"

type Props = {
  blocking: boolean,
  ariaTitle: string,
  showWaiting: boolean
}

type State = {
  hasEntered: boolean
}

class Overlay extends React.Component<Props, State> {
  state = {
    hasEntered: false
  }

  static defaultProps = {
    blocking: false,
    showWaiting: false
  }

  hasEntered = () => {
    this.setState({ hasEntered: true });
  }

  componentWillReceiveProps(nextProps:Props) {
    if(nextProps.blocking) {
      this.setState({ hasEntered: false });
    }
  }

  render() {
    const underlayStyle = {}
    underlayStyle.backgroundColor = "rgba(0,0,0,0.25)"

    let content = null
    if (this.props.showWaiting) {
      //underlayStyle.cursor = "wait"
      content = <Loader color="white" size="200px" />
    }

    let underlayClass = "stronghold-Overlay"
    if(this.state.hasEntered) {
      underlayClass += " stronghold-Overlay--has-entered"
    }

    return (
      <AriaModal
        mounted={ this.props.blocking }
        titleText={ this.props.ariaTitle }
        focusDialog={ true }
        getApplicationNode={ getApplicationNode }
        underlayStyle={ underlayStyle }
        underlayClickExits={ false }
        underlayClass={ underlayClass }
        verticallyCenter={ true }
        onEnter={ this.hasEntered }
      >
        { content }
      </AriaModal>
    )
  }
}

export default Overlay

function getApplicationNode() {
  return document.getElementById('root');
}
