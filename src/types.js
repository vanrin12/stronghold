// @flow

export type FlashMessage = {
  message: string,
  list: Array<string>
}

export type AssetType = {
  name: string,
  code: string,
  scale: number,
  scaleFull: number,
  priority: number,
  icon: string,
  IsOnlyStellar: boolean,
  depositDelayMinutes: number,
  depositMinimum: string,
  withdrawalFeeFixed: string,
  withdrawalFeePercent: string
}

export type MarketType = {
  id : number,
  name: string,
  base: string,
  counter: string,
  priority: number,
  minimumTradeTotal: string
}

export type BalanceType = {
  code: string,
  amount: string
}

// Transactions on the Wallet Page
export type WalletTransactionType = {
  txid: string,
  amount: string,
  code: string,
  otherPartyAddress: string,
  received: boolean,
  timestamp: number,
  explorerUrl: string
}

export type TransactionType = "sell" | "buy" | "sent" | "received" | ""

// Transactions on the Transaction Page
export type Transaction = {
  amount: string,
  code: string,
  timestamp: number,
  received?: boolean,  // TODO for withdrawal/deposit, replace with real payload
  otherPartyAddress?: string,  // TODO ^^
  txid?: string,
  explorerUrl?: string,
  price?: string,  // TODO For buy/sell replace with real payload
  counter?: string,  // TODO ^^
  type?: TransactionType
}


export const NOT_ASKED = "NOT_ASKED"
export const LOADING = "LOADING"
export const SUCCESS = "SUCCESS"
export const FAILURE = "FAILURE"

export type RemoteStatusType =
  | typeof NOT_ASKED
  | typeof LOADING
  | typeof SUCCESS
  | typeof FAILURE

// Based on https://github.com/krisajenkins/remotedata
export type RemoteDataType = {
  status: RemoteStatusType,
  data?: any,
  error?: any
}


export type LoginReqState = {
  status: RemoteStatusType,
  data?: {  // currently only used for errors
    errorCode: string
  },
  form?: {  // saved for 2FA's 2nd req.
    username: string,
    password: string
  },
  count?: number
}

export type MemoType = "id" | "hash" | "text"

export type TradeActionType = "Buy" | "Sell" | null


export type ExchangeRateType = {
  currency: string,
  rate: number
}

export type OrderbookOrderType = {
  amount: string,
  price: string
}

export type OpenOrderType = {
    orderId: string,
    marketId: string,
    type: string,
    amount: string,
    price: string
}

export type DataTableConfig = {
  columns: Array<string>
}

export type CandleStickData = {
  date: number,
  open: number,
  height: number,
  low: number,
  close: number,
  volume: number,
  vwap : number
}

// Available auxiliary services
export type ServicesType = {
  convert: Function
}

export type FederationResultType = {
  account_id: string,
  stellar_address: string,
  memo_type: string,
  memo: string
}

export type HistoryData = {
  amount: string,
  price: string,
  type: string,
  executedAt: number
}

export type MarketTickerData = {
  id: number,
  name: string,
  base: string,
  counter: string,
  last: string,
  volume: string,
  low: string,
  high: string
}

export type TwoFactorSetupState = {
  isOpen: boolean,
  has2FA: {
    status: RemoteStatusType,
    data?: boolean
  }
}

export type TwoFactorSetup = {
  qrData: string,
  recoveryCode: string,
  id: string
}

export type TwoFactorModalSetupState = {
  getSetup: {
    status: RemoteStatusType,
    data?: TwoFactorSetup
  },
  enabled: {
    status: RemoteStatusType
  },
  disabled: {
    status: RemoteStatusType
  }
}

// TODO some of these properties should have more exact types
