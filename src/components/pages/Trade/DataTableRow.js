// @flow
import * as React from "react"

import "./DataTableRow.css"

type Props = {
  data: Array<any>,
  onClick?: Function,
  onAction?: Function  // auxiliary action, like cancel button click
}

type State = {
  targeted: boolean
}

class DataTableRow extends React.Component<Props, State> {
  state = {
    targeted: false
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.data)
      this.setState({targeted: true}, ()=>{
        setTimeout(()=>{
          this.setState({targeted: false})
        }, 55)
      })
    }
  }

  // cells can have className or just a value string
  _renderCell = (i: number, value: string | {className:string, value:string}) => {
    if(typeof value === "string") {
      return <td key={i}>{ value }</td>
    } else if(value.value) {
      return <td key={i} className={ value.className }>{ value.value }</td>
    } else {  // empty cell if not valid
      return <td key={i}></td>
    }
  }

  _renderCells = (): React.ChildrenArray<any> => {
    return this.props.data.map( (value, i) => this._renderCell(i, value) )
  }

  render() {
    let rowClass = (this.props.isEmpty ? "DataTableRow--empty" : this.props.onClick ? "DataTableRow--clickable" : '');
    if (this.state.targeted) {
      rowClass += " DataTableRow--targeted";
    }

    return (
      <tr
        className={"DataTableRow " + rowClass}
        onClick={ this.props.isEmpty ? null : this.handleClick }
      >
        { this._renderCells() }
      </tr>
    )
  }
}

export default DataTableRow
