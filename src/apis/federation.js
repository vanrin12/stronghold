// @flow
//import { StellarSdk } from "stellar-sdk"

import type { FederationResultType } from "../types"

export function resolveAddress(username: string) : Promise<FederationResultType> {
  return new Promise((resolve, reject) => {
    window.StellarSdk.FederationServer.resolve(username).then(res => {
      resolve({
        account_id: res.account_id,
        stellar_address: res.stellar_address,
        memo_type: res.memo_type,
        memo: res.memo
      });
    }).catch(reject);
  })
}
