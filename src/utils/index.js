// @flow

import BigNumber from "bignumber.js"

export { validateMemo } from "./memoValidation"

// Calculate fees, returns null if errors
type calcFeesArgs = {
  amount: string,
  feeFixed: string,
  feePercent: string,
  scaleFull: number
}

export function calcFees({amount, feeFixed, feePercent, scaleFull}:calcFeesArgs): string|null {
  try {
    const bAmount = new BigNumber(amount)
    let bFees = new BigNumber(feeFixed)

    bFees = bFees.plus(bAmount.times(feePercent))

    return new BigNumber(bFees.toFixed(scaleFull)).toString()

    //return (parseFloat(this.props.feeFixed) + (amount * parseFloat(this.props.feePercent))).toFixed(this.props.scaleFull)
  } catch(err) {
    return null
  }
}

