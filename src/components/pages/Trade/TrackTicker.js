// @flow
// "Track" feature simplified, component no longer in use.

import * as React from 'react'

// Wraps molecules/Ticker with "Track" trade-form functionality
import Ticker from "../../molecules/Ticker"


import "./TrackTicker.css"

type Props = {
  title: string,
  main: string,
  sub: string,
  onTrackClick: Function
}

class TrackTicker extends React.Component<Props> {
  handleTrackClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()
    console.log('Track Click')
  }
  render() {
    return (
      <div className="Trade__TrackTicker">
        <Ticker
          title={this.props.title}
          main={this.props.main}
          sub={this.props.sub}
        />
        <a onClick={this.handleTrackClick} href="#track">Track</a>
      </div>
    )
  }
}

export default TrackTicker
