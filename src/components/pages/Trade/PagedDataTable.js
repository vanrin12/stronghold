// @flow
import * as React from "react"

import DataTable from "./DataTable"
import Pagination from "../../atoms/Pagination"

import type { DataTableConfig } from "../../../types"

type Props = {
  title: string,
  data: Array<any>,
  config: DataTableConfig,
  onRowClick?: Function,
  Row?: any,
  onRowAction?: Function,  // e.g. onCancelClick
  showEmptyLoader?: boolean
}

type State = {
  currentPage: number,
}

const PAGE_SIZE = 10;

class PagedDataTable extends React.Component<Props, State> {
  state = {
    currentPage: 1
  }

  onChange = (page: number) => {
    this.setState({
      currentPage: page
    })
  }

  render() {
    const index = (this.state.currentPage - 1) * PAGE_SIZE

    const data = this.props.data.slice(index, (index + PAGE_SIZE))

    return (
      <div className="PagedDataTable">
        <DataTable
          title={ this.props.title }
          data={ data }
          config={ this.props.config }
          onRowClick={ this.props.onRowClick }
          Row={ this.props.Row }
          onRowAction={ this.props.onRowAction }
          showEmptyLoader={ this.props.showEmptyLoader }
        />
        <Pagination
          count={ this.props.data.length }
          onChange={this.onChange}
          pageSize={ PAGE_SIZE }
          currentPage={ this.state.currentPage }
        />
      </div>
    )
  }
}

export default PagedDataTable
