// @flow
import * as React from 'react'

import "./Ticker.css"

type Props = {
  title: string,
  main: string,
  sub: string | React.Node,
  onClick?: Function
}

type State = {
  loaded: boolean,
  targeted: boolean
}

class Ticker extends React.Component<Props, State> {
  state = {
    loaded: false,
    targeted: false
  }

  handleClick = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()
    if(this.props.onClick) {
      this.props.onClick(this.props.main)
      this.setState({targeted: true}, ()=>{
        setTimeout(()=>{
          this.setState({targeted: false})
        }, 50)
      })
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({loaded: true});  // for transistions
    }, 0)
  }

  render() {
    let mainNeg = ""
    if (parseFloat(this.props.main) < 0) {
      mainNeg = "Ticker__main--negative"
    }

    let tickerClass = ""
    if (this.props.onClick) {
      tickerClass = "Ticker--button"
    }

    if (this.state.targeted) {
      tickerClass += " Ticker--targeted"
    }

    if (this.state.loaded) {
      tickerClass += " Ticker--loaded"
    }

    // remove trailing zeros
    const mainValue = this.props.main.replace(/0+$/, '').replace(/\.$/, '.00')

    return (
      <div className={"Ticker " + tickerClass} onClick={this.handleClick}>
        <span className="Ticker__title">{ this.props.title }</span>
        <span className={"Ticker__main " + mainNeg}>{ mainValue }</span>
        <span className="Ticker__sub">{ this.props.sub }</span>
      </div>
    )
  }
}

export default Ticker
