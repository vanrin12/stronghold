// @flow
import * as React from "react"
import _ from "lodash"

type Props = {
  count: number,
  onChange: Function,
  pageSize: number,
  currentPage: number
}

class Pagination extends React.Component<Props> {

  onClickSetPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.props.count / this.props.pageSize)) {
      this.props.onChange(page)
    }
  }

  render() {
    const totalPages = Math.ceil(this.props.count / this.props.pageSize);
    if ( totalPages > 1 ) {

      const pages = _.range(totalPages).map( ( index ) => {
        const page = index + 1
        return (
          <li key={index} className={this.props.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.onClickSetPage(page)}>{page}</a>
          </li>
        )
      })

      return (
        <ul className="pagination">
          <li className={this.props.currentPage === 1 ? 'disabled' : ''}>
            <a onClick={() => this.onClickSetPage( this.props.currentPage - 1 )}><span className="icon-Arrow-Left2"></span></a>
          </li>
          { pages }
          <li className={this.props.currentPage === totalPages ? 'disabled' : ''}>
            <a onClick={() => this.onClickSetPage( this.props.currentPage + 1 )}><span className="icon-Arrow-Right2"></span></a>
          </li>
        </ul>
      )

    } else {
      return null
    }
  }
}

export default Pagination;
