import * as React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import CoinIcon from '../atoms/CoinIcon';

import moment from 'moment';

class BsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizePerPage: this.props.tableBasicOptions.paginationSize,
      tableData: this.props.tableData,
    };
  }

  static balanceFormatter(cell) {
    let balanceClass = cell.value >= 0 ? 'color--success' : 'color--error',
      markClass = cell.mark === 'YOUR PRICE' ? 'color--primary' : '';

    return '<span class="' + balanceClass + '">' + cell.value + '</span>'
      + '<span class="dollar-equal">$' + cell.currency + '</span>'
      + '<span class="' + markClass + '">' + cell.mark + '</span>'
  }

  static booleanFormatter(cell) {
    let booleanClass = cell === true ? 'color--success' : 'color--error';
    return (
      <span className={booleanClass}>
        {cell.toString()}
      </span>
    )
  }

  static dateFormatter(cell) {
    return moment(cell * 1000).format('YYYY-MM-DD h:mm A');
  }

  static txIdFormatter(cell, row) {
    return <a title="View transaction in explorer" href={row.explorerUrl} target="_blank">{ cell.substr(0, 8) }</a>
  }

  static iconFormatter(cell) {
    return <CoinIcon icon={cell} />
  }

  static amountFormatter(cell, row) {
    let amountClass = cell >= 0 ? 'color--success' : 'color--error';
    return (
      <span className={amountClass}>
        {cell > 0 ? '+' : '-'}{cell} {row.code}
      </span>
    )
  }

  render() {
    const {
      tableTitle,
      tableSubTitle,
      tableData,
      tableBasicOptions,
      tablePagination,
      tableContainerClass,
      tableExportCSV,
      tableCSVFileName,
      columnConfig,
      totalData
    } = this.props;
    const customConfig = {
      exportCSVBtn: this.createCustomExportCSVButton,
      sizePerPage: this.state.sizePerPage
    };
    let tableOptions = Object.assign({}, tableBasicOptions, customConfig);

    return (
      <div>
        <div className={'BsTable__title-container inline-block w--100 ' + (tableExportCSV ? 'with-download-csv' : '')}>
          <div className="col-md-5">
            <h3 className="color--primary unmarg">{tableTitle}</h3>
            <p>{tableSubTitle}</p>
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
            {columnConfig.map((configItem, index) => {
                let dataField = Object.keys(tableData[0])[index];
                return (
                  <TableHeaderColumn
                    key={index}
                    isKey={index === 0 ? true : false}
                    tdStyle={configItem.tdStyle}
                    thStyle={configItem.tdStyle}
                    dataFormat={this[configItem.dataFormat]}
                    dataAlign={configItem.dataAlign}
                    dataField={dataField}>
                    { configItem.columnTitle }
                  </TableHeaderColumn>
                )
              })
            }
          </BootstrapTable>
        </div>
      </div>
    )
  }
}

export default BsTable;
