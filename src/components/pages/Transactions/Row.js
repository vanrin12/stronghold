// @flow
import * as React from "react"

import moment from "moment"

import CoinIcon from "../../atoms/CoinIcon"

import type { TransactionType } from "../../../types"

type Props = {
  code: string,
  type: TransactionType,
  amount: string,
  timestamp: number,
  price?: string,
  counter?: string,
  otherPartyAddress?: string,
  txid?: string,
  explorerUrl?: string
}

class TransactionsRow extends React.Component<Props> {
  render() {
    let description = ""
    let explorerUrl = ""

    if ( this.props.price && this.props.counter && (this.props.type === "buy" || this.props.type === "sell" )) {
      description = "for " + this.props.price + " " + this.props.counter.toUpperCase()
    } else if (this.props.otherPartyAddress && this.props.txid && this.props.explorerUrl) {
      const verb = (this.props.type === "sent" ? "to" : "from")
      description = <span>{verb + " " + this.props.otherPartyAddress }</span>
      explorerUrl = <a title="View transaction in explorer" href={this.props.explorerUrl} target="_blank">{ this.props.txid.substr(0, 8) }</a>
    }

    let rowTypeClass = "Transactions__Row--" + this.props.type
    return (
      <tr className={"Transactions__Row " + rowTypeClass}>
        <td><CoinIcon icon={this.props.code} /></td>
        <td>{ this.props.type }</td>
        <td>{ this.props.amount }</td>
        <td>{ description }</td>
        <td>{ explorerUrl }</td>
        <td>{ moment(this.props.timestamp * 1000).format('YYYY-MM-DD h:mm A') }</td>
      </tr>
    )
  }
}

export default TransactionsRow
