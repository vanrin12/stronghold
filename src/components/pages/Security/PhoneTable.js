// @flow
import * as React from 'react'

import { basicTableConfig, phoneColumnConfig } from '../../../config/securityTable.config'
import { phoneNumbers } from '../../../config/TablesDummyData'

import BoxedTable from '../../orgs/BoxedTable'

type Props = {
  openModal: Function
}

class PhoneTable extends React.Component<Props> {
  render() {
    return (
      <BoxedTable
        tableData={phoneNumbers}
        tableBasicOptions={basicTableConfig}
        tableContainerClass="order-table"
        columnConfig={phoneColumnConfig}
        openModal={this.props.openModal}
      />
    )
  }
}

export default PhoneTable;
