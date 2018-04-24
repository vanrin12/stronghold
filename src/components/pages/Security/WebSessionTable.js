// @flow
import * as React from 'react'

import { basicTableConfig, webSessionsColumnConfig } from '../../../config/securityTable.config'
import { webSessions } from '../../../config/TablesDummyData'

import BoxedTable from '../../orgs/BoxedTable'

export default function() {
  return (
    <BoxedTable
      tableTitle="Web Sessions"
      tableSubTitle="These sessions are currently signed in to your account."
      tableData={webSessions}
      tableBasicOptions={basicTableConfig}
      tableContainerClass="order-table"
      tablePagination
      removeAll
      removeAllTitle="Remove all other sessions"
      columnConfig={webSessionsColumnConfig}
    />
  )
}
