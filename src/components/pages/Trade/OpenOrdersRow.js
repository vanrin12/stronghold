// @flow
import * as React from "react"

import DataTableRow from "./DataTableRow"

import { LOADING } from "../../../types"
import type { RemoteStatusType } from "../../../types"

import "./DataTableRow.css"

class OpenOrdersRow extends DataTableRow {
  orderId: string

  handleCancelClick = () => {
    if(this.props.onAction) {
      this.props.onAction(this.orderId)
    }
  }

  _renderCancelCell = (orderId: string, cancelStatus?: RemoteStatusType) => {
    this.orderId = orderId

    let cancelButton
    if (cancelStatus === LOADING) {
      cancelButton = (
        <a className="btn" disabled onClick={this.handleCancelClick}>
          <span className="btn__text">Cancelling...</span>
        </a>
      )
    } else {
      cancelButton = (
        <a className="btn btn--sm" onClick={this.handleCancelClick}>
          <span className="btn__text">Cancel</span>
        </a>
      )
    }
    return (
      <td key="action">
        { cancelButton }
      </td>
    )
  }

  _renderCells = (): React.ChildrenArray<any> => {
    const cells = this.props.data.map( (value, i) => {
      if (i === 4) {
        return this._renderCancelCell.apply(this, value.split(","))
      } else {
        return this._renderCell(i, value)
      }
    })
    return cells
  }
}

export default OpenOrdersRow
