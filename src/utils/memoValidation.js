import type { MemoType } from "../../types"

import BigNumber from "bignumber.js"

// get byteCount of string
function byteCount(str: string): number {
  return ~-encodeURI(str).split(/%..|./).length
}

// if unsigned 64-bit interger
function isUInt64(str: string): boolean {
  try {
    const b = new BigNumber(str)
    return b.greaterThanOrEqualTo(0) && b.lessThanOrEqualTo("18446744073709551615")
  } catch(err) {
    return false
  }
}

function isHex(str: string): boolean {
  return /^[0-9A-Fa-f]+$/.test(str)
}

export function validateMemo(memo: string, memoType: MemoType) {

  // MEMO_TEXT : A string up to 28-bytes long. (I will assume UTF-8 in backend)
  if (memoType === "text") {
    return byteCount(memo) <= 28
  // MEMO_ID : A 64 bit unsigned integer.
  } else if(memoType === "id") {
    return isUInt64(memo)
  //MEMO_HASH : A 32 byte hash. (will always be 64 characters - A-Fa-f0-9)
  } else if(memoType === "hash") {
    return isHex(memo) && memo.length === 64
  }
  return false
}
