// @flow
import * as React from "react"

import { LOADING, SUCCESS, FAILURE } from "../../../types"
import type { RemoteStatusType } from "../../../types"

import "./FederationAddress.css"

type Props = {
  result: {
    status: RemoteStatusType,
    address?: string,  // the address used for resolveAddress federation check
    accountId?: string,
    isValid?: boolean,
    isStellarAddress?: boolean
  },
  address: string  // the typed in address
}

export default function(props: Props) {
  let className = "FederationAddress"
  let text = null

  const { status, address, accountId, isValid, isStellarAddress } = props.result

  if ((status === SUCCESS || status === LOADING) && props.address === address && accountId && isValid && isStellarAddress) {
    text = accountId
    className += " color--success"
  } else if (status === LOADING) {
    text = "Resolving..."
  } else if (status === FAILURE) {
    text = "Cannot find account."
    className += " color--error"
  } else if (status === SUCCESS && !isStellarAddress) {
    text = "Not a valid Stellar address."
    className += " color--error"
  }

  return (
    <span className={ className }>
      { text }
    </span>
  )
}
