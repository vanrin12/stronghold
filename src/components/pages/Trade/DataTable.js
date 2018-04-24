// @flow
import * as React from "react"

import type { DataTableConfig } from "../../../types"
import { ClipLoader as Loader } from 'halogenium'

import DataTableRow from "./DataTableRow"

import "./DataTable.css"

type Props = {
  title: string,
  data: Array<any>,
  config: DataTableConfig,
  onRowClick?: Function,
  Row?: any,
  onRowAction?: Function,  // e.g. onCancelClick
  showEmptyLoader: boolean
}

class DataTable extends React.Component<Props> {
  static defaultProps = {
    showEmptyLoader: false
  }

  render() {
    const tableHeaders = this.props.config.columns.map(function(title, index) {
      return <th key={index}>{ title }</th>
    })

    let Row
    if(this.props.Row) {
      Row = this.props.Row
    } else {
      Row = DataTableRow
    }

    const tableData = this.props.data.map((row, index)=>{
      let isEmpty = false;
      let data = row;
      if(!row.length) {
        for(let i = 0; i < this.props.config.columns.length; i++) {
          data.push('');
        }
        isEmpty = true;
      }
      return <Row key={index} data={data} onClick={this.props.onRowClick} onAction={this.props.onRowAction} isEmpty={isEmpty}/>
    });

    let content;

    // If there's data or we aren't showing the empty load spinner
    if(this.props.data.length || !this.props.showEmptyLoader) {
      content = (
        <table>
          <thead>
            <tr>
              { tableHeaders }
            </tr>
          </thead>
          <tbody>
            { tableData }
          </tbody>
        </table>
      );
    } else {
      content = (
        <Loader size="40px" color="#76abe9" />
      )
    }

    return (
      <div className="DataTable">
        <h3 className="DataTable__title color--primary">{this.props.title}</h3>
        { content }
      </div>
    )
  }
}

export default DataTable
