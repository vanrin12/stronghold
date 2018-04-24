// @flow
import * as React from 'react'

import { basicTableConfig, webSessionsColumnConfig } from '../../../config/securityTable.config'
import { confirmedDeviced } from '../../../config/TablesDummyData'

import BoxedTable from '../../orgs/BoxedTable'

export default function() {
  return (
    <BoxedTable
      tableTitle="Confirmed Deviced"
      tableSubTitle="These sessions are currently allowed to access your account."
      tableData={confirmedDeviced}
      tableBasicOptions={basicTableConfig}
      tableContainerClass="order-table"
      tablePagination
      removeAll
      removeAllTitle="Remove all other sessions"
      columnConfig={webSessionsColumnConfig}
    />
  )
}
