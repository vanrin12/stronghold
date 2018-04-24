// @flow
import * as React from "react"

import Helmet from 'react-helmet'
import TopNav from '../../containers/TopNav'
import Dropdown from "../../atoms/Dropdown"
//import TransactionsTable from './TransactionsTable';

import Table from "./Table"
import { ClipLoader as Loader } from 'halogenium'

import type { Transaction, RemoteStatusType } from '../../../types'
import { LOADING, SUCCESS } from "../../../types"

import "./index.css"

type Props = {
  init: Function,
  beforeUnmount: Function,
  transactions: Array<Transaction>,
  status: RemoteStatusType
  /*
  transactionsIsFetching: boolean,
  transactionsHasFetched: boolean
  */
}

type State = {
  filter: "buy" | "sell" | "sent" | "received" | ""
}

class Transactions extends React.Component<Props, State> {
  state = {
    filter: ""
  }

  constructor(props: Props) {
    super(props)
    this.props.init()
  }

  filterBy = (event: SyntheticEvent<HTMLElement>, filter: string) => {
    event.preventDefault()

    if (filter === "buy" || filter === "sell" || filter === "sent" || filter === "received" || filter === "") {
      this.setState({filter})
    }
  }

  componentWillUnmount() {
    this.props.beforeUnmount()
  }

  render() {
    let loaderClass = ''
    if (this.props.status === LOADING) {
      loaderClass = "TxHistory__Loader--visible"
    }
    const loader = (
      <Loader size="18px" color="#4A90E2" className={"TxHistory__Loader " + loaderClass} />

    )

    let titleText
    switch (this.state.filter) {
      case "buy":
        titleText = "Only Buy"
      break
      case "sell":
        titleText = "Only Sell"
      break
      case "received":
        titleText = "Only Received"
      break
      case "sent":
        titleText = "Only Sent"
      break
      default:
        titleText = "Show All"
    }


    return (
      <div className="Transactions">
        <Helmet>
          <title>Stronghold - Transactions</title>
          <meta name="description" content="Stronghold Transactions" />
        </Helmet>

        <TopNav />
        <div className="Transactions__main">
          <div className="container boxed boxed--border">
            <div className="row Transactions__top-row">

              <h3>Recent Transactions { loader }</h3>

              <Dropdown title={<span>{ titleText }<i className="stack-down-open"></i></span>}>
                <ul className="menu-vertical">
                  <li>
                    <a href="#all" onClick={ (e)=> this.filterBy(e, "") }>Show All</a>
                  </li>
                  <li className="separate">
                    <a href="#buy" onClick={ (e)=> this.filterBy(e, "buy") }>Only Buy</a>
                  </li>
                  <li>
                    <a href="#sell" onClick={ (e)=> this.filterBy(e, "sell") }>Only Sell</a>
                  </li>
                  <li>
                    <a href="#received" onClick={ (e)=> this.filterBy(e, "received") }>Only Received</a>
                  </li>
                  <li>
                    <a href="#sent" onClick={ (e)=> this.filterBy(e, "sent") }>Only Sent</a>
                  </li>
                </ul>
              </Dropdown>

            </div>
            <div className="row">
              <div className="col-md-12">
                <Table
                  transactions={ this.props.transactions }
                  hasFetched={ this.props.status === SUCCESS }
                  filter={ this.state.filter }
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
export default Transactions
