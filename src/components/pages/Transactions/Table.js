// @flow
import * as React from "react"

import Row from "./Row"

import type { Transaction, TransactionType } from "../../../types"

type Props = {
  transactions: Array<Transaction>,
  hasFetched: boolean,
  filter: string
}

class TransactionsTable extends React.Component<Props> {
  render() {
    let content

    let transactions = this.props.transactions || []

    // TODO for dev, remove
    transactions = transactions.concat([
      {type: "sent", amount:"1.27", timestamp:21, otherPartyAddress:"GDBMGOQ66VDKHWEQHD4V4CF5B555APH7C3ZO3KUHHFT5736XBDZYQYRR", txid:"c35b003f", code:"XLM", explorerUrl:"http://url"},
      //{type: "buy", price:"0.12", counter: "btc", code:"MOBI", amount:"1.22", timestamp:21},
      {type: "sell", price:"0.14", counter: "XLM", code:"BTC", amount:"1.27", timestamp:21},
      {type: "received", amount:"1.27", timestamp:21, otherPartyAddress:"GDBMGOQ66VDKHWEQHD4V4CF5B555APH7C3ZO3KUHHFT5736XBDZYQYRR", txid:"c35b003f", code:"BTC", explorerUrl:"http://url"},
    ])

    // Set the `type`
    transactions = transactions.map( (tx)=>{
      let type: TransactionType = ""
      // TODO adjust to real type payload
      if( typeof tx.type === "string" ) { // Buy or Sell
        const propType = tx.type.toLowerCase()
        if (propType === "buy" || propType === "sell" || propType === "sent" || propType === "received") {
          type = propType
        }
      } else {
        if( tx.received === true ) {
          type = "received"
        } else if( tx.received === false ) {
          type = "sent"
        }
      }

      tx.type = type
      return tx
    })

    // Filter by type
    if (this.props.filter) {
      transactions = transactions.filter( tx => tx.type === this.props.filter )
    }

    // Has transactions
    if (transactions.length) {
      const tbody = transactions.map( (tx, index)=>{
        let walletTxProps = {}, tradeTxProps = {}

        if (tx.otherPartyAddress && tx.txid && tx.explorerUrl) {
          walletTxProps.otherPartyAddress = tx.otherPartyAddress
          walletTxProps.txid = tx.txid
          walletTxProps.explorerUrl = tx.explorerUrl
        }

        if (tx.price && tx.counter) {
          tradeTxProps.price = tx.price
          tradeTxProps.counter = tx.counter
        }
        return (
          <Row
            key={ index }
            code={ tx.code }
            amount={ tx.amount }
            timestamp={ tx.timestamp }
            type={ tx.type || "" }
            { ...tradeTxProps }
            { ...walletTxProps }
          />
        )
      })
      content = (
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th></th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            { tbody }
          </tbody>
        </table>
      )

    // No Transactions
    } else {

      if (this.props.hasFetched) {
        let msg = "No recent transactions"
        if (this.props.filter) {
          msg = <span>No transactions for the filter type:  <span style={{textTransform: "capitalize", fontStyle: "italic"}}>"{this.props.filter}"</span></span>
        }
        content = (
          <div className="Transactions__Table__empty">
            <span>{ msg }</span>
          </div>
        )
      }

    }



    return (
      <div className="Transactions__Table">
        { content }
      </div>
    )
  }
}

export default TransactionsTable
