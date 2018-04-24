// @flow
import * as React from 'react'

import { basicTableConfig, accountActivityColumnConfig } from '../../../config/securityTable.config'
import { accountActivity } from '../../../config/TablesDummyData'

import BoxedTable from '../../orgs/BoxedTable'

export default function() {
  return (
    <BoxedTable
      tableTitle="Account Activity"
      tableSubTitle="Recent activity on your account"
      tableData={accountActivity}
      tableBasicOptions={basicTableConfig}
      tableContainerClass="order-table"
      tablePagination
      columnConfig={accountActivityColumnConfig}
      sizePerPageCount='20'
    />
  )
}
