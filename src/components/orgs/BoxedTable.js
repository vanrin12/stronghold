import * as React from 'react'

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import Dropdown from '../atoms/Dropdown';
import moment from 'moment';


class TradingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizePerPage: +this.props.sizePerPageCount || 10,
      tableData: this.props.tableData,
      hiddenColumns: {}
    };

    this.cancelButton = this.cancelButton.bind(this);
  }

  _renderTotalData = () => {
    if(this.props.totalData) {
      return(
        <div className="total-data">
          <div className="col-xs-6 mb--2">
            <span className="color--primary">{this.props.totalData}</span>
          </div>
          <div className="col-xs-6 text-right mb--2">
            <span className="color--primary">{this.props.totalData}</span>
          </div>
        </div>
      )
    }
  };

  _renderSizePerPageSelect = () => {
    if(this.props.sizePerPage) {
      return(
        <select className="custom-select mr--2" value={ this.state.sizePerPage } onChange={ this.sizePerPage.bind(this) }>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      )
    }
  };

  _renderDropdown = () => {
    if(this.props.customizeColumnListData) {
      return(
        <Dropdown title={<button className="btn btn-sm btn--primary mr--2">{this.props.customizeColumnTitle}</button>}>
          <ul>
            {
              this.props.customizeColumnListData.map((checkbox, index) => {
                return (
                  <li key={index}>
                    <div className="input-checkbox">
                      <input id={this.props.customizeColumnCheckboxID + '-' + checkbox.value} type="checkbox" defaultChecked name={checkbox.text} onChange={this.checkboxOnChange.bind(this)} />
                      <label htmlFor={this.props.customizeColumnCheckboxID + '-' + checkbox.value}></label>
                    </div>
                    <span>{checkbox.text}</span>
                  </li>
                )
              })
            }
          </ul>
        </Dropdown>
      );
    }
  };

  _renderRemoveAllOrders = () => {
    if(this.props.removeAll) {
      return(
        <button className="btn btn-sm btn--primary" onClick={this.removeAllData.bind(this)}>
          {this.props.removeAllTitle}
        </button>
      )
    }
  };

  removeAllData() {
    // API CALL TO REMOVE ALL DATA
  }

  balanceFormatter(cell) {
    let balanceClass = cell.value >= 0 ? 'color--success' : 'color--error',
      markClass = cell.mark === 'YOUR PRICE' ? 'color--primary' : '';

    return '<span class="' + balanceClass + '">' + cell.value + '</span>'
      + '<span class="dollar-equal">$' + cell.currency + '</span>'
      + '<span class="' + markClass + '">' + cell.mark + '</span>'
  }

  dateFormatter(cell) {
    let dateFormat = moment(cell).format("DD/MM/YYYY &#183 HH:MM:ss A");
    return dateFormat;
  }

  dateFormatterAgo(cell) {
    let dateFormatAgo = moment(cell).fromNow("mm");
    return dateFormatAgo + ' ago';
  }

  typeFormatter(cell) {
    let typeClass = cell === 'Buy' ? 'color--success' : 'color--error';
    return '<span class="' + typeClass + '">' + cell + '</span>'
  }

  csvDateFormatter(cell) {
    return moment(cell.value).format("DD/MM/YYYY, HH:MM:ss A")
  }

  statusFormatter = (cell, row, enumObject, rowIndex) => {
    return(
      cell === 'Verified'
        ? <span className="color--success">{cell}</span>
        : <span className="color--primary" onClick={() => {this.verifyPhone(row, rowIndex)}}>{cell}</span>
    )
  };

  primaryFormatter = (cell, row, enumObject, rowIndex) => {
    return (
      cell === 'Make Primary'
        ? <span className="color--primary" onClick={() => {this.makePrimary(rowIndex)}}>{cell}</span>
        : cell === 'New Phone'
        ? <span className="type--fade">{cell}</span>
        : cell
    )
  }

  phoneNumberFormatter(cell) {
    let lastPhoneNumbers = cell.slice(-4);
    return '(XXX) XXX-' + lastPhoneNumbers;
  }

  currentLabel(cell) {
    return cell ? '<span class="color--success">current</span>' : ''
  }

  cancelButton (cell, row, enumObject, rowIndex) {
    return (
      <span className="remove" onClick={() => {this.deleteRow(rowIndex)}}>Remove</span>
    )
  }

  verifyPhone = (row, rowIndex) => {
    this.props.openModal()
  }

  makePrimary(rowIndex) {
    // call API for making phone primary
  }

  deleteRow(rowIndex) {
    this.state.tableData.splice(rowIndex, 1);
    this.setState({
      tableData: this.state.tableData
    })
  }

  sizePerPage = (event) => {
    this.setState({sizePerPage: +event.target.value})
  };

  createCustomExportCSVButton = (onClick) => {
    return (
      <button className="btn btn-sm btn--primary" onClick={ onClick }>Download CSV</button>
    );
  };

  checkboxOnChange(event) {
    const checkboxId = event.target.id;
    this.setState({
      hiddenColumns: Object.assign(this.state.hiddenColumns,
        {
          [checkboxId]: !this.state.hiddenColumns[checkboxId],
        }
      )
    });
  }

  render() {

    const {tableTitle, tableSubTitle, searchTitle, tableData, tableBasicOptions, tablePagination, tableContainerClass, customizeColumnCheckboxID, tableExportCSV, tableCSVFileName, columnConfig, totalData} = this.props;
    const customConfig = {
      exportCSVBtn: this.createCustomExportCSVButton,
      sizePerPage: this.state.sizePerPage
    };
    let tableOptions = Object.assign({}, tableBasicOptions, customConfig);

    return (
      <div>
        <div className={'inline-block w--100 ' + (tableExportCSV ? 'with-download-csv' : '')}>
          <div className="col-md-5">
            <h3 className="color--primary unmarg">{tableTitle}</h3>
            <p>{tableSubTitle}</p>
          </div>
          <div className="col-md-2 text-center order-table--search-title">
            <p className="lead">{searchTitle}</p>
          </div>
          <div className="col-md-5 text-right order-table--buttons-group">
            {
              this._renderSizePerPageSelect()
            }
            {
              this._renderDropdown()
            }
            {
              this._renderRemoveAllOrders()
            }
          </div>
        </div>
        <div className={'without-per-page ' + (totalData ? 'with-total-data' : '')}>
          <BootstrapTable
            data={tableData}
            tableContainerClass={tableContainerClass}
            pagination = {tablePagination}
            hover
            exportCSV = {tableExportCSV}
            csvFileName={tableCSVFileName}
            options={tableOptions}>
            {
              columnConfig.map((configItem, index) => {
                let dataField = Object.keys(tableData[0])[index];
                return (
                  <TableHeaderColumn
                    key={index}
                    isKey={index === 0 ? true : false}
                    tdStyle={configItem.tdStyle}
                    thStyle={configItem.thStyle}
                    dataFormat={this[configItem.dataFormat]}
                    dataAlign={configItem.dataAlign}
                    hidden={this.state.hiddenColumns[customizeColumnCheckboxID + '-' + dataField]}
                    dataField={dataField}>
                    { configItem.columnTitle }
                  </TableHeaderColumn>
                )
              })
            }
          </BootstrapTable>
        </div>
        {
          this._renderTotalData()
        }
      </div>
    )
  }
}

export default TradingTable