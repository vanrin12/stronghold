// @flow
// TODO split into multiple files

import { List } from 'immutable'

import {
  FLASH_ERROR,
  FLASH_ERRORS_RESET,
  FLASH_INFO,

  SIGN_UP_REQUESTED,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED,

  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  RESET_LOGIN_PAGE_STATE,

  LOGOUT_REQUESTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
  RESET_USER_STATE,

  CONFIRM_EMAIL_ADDRESS_SUCCEEDED,

  RESUME_SESSION_REQUESTED,
  RESUME_SESSION_SUCCEEDED,
  RESUME_SESSION_FAILED,

  FORGOT_PASSWORD_EMAIL_REQUESTED,
  FORGOT_PASSWORD_EMAIL_SUCCEEDED,
  FORGOT_PASSWORD_EMAIL_FAILED,

  APP_SESSION_FETCHES_REQUESTED,
  APP_SESSION_FETCHES_SUCCEEDED,
  APP_SESSION_FETCHES_FAILED,

  TRADE_PAGE_FETCHES_REQUESTED,
  TRADE_PAGE_FETCHES_SUCCEEDED,
  TRADE_PAGE_FETCHES_FAILED,

  TRADE_MARKET_FETCHES_REQUESTED,
  TRADE_MARKET_FETCHES_SUCCEEDED,
  TRADE_MARKET_FETCHES_FAILED,

  WALLET_PAGE_FETCHES_REQUESTED,
  WALLET_PAGE_FETCHES_SUCCEEDED,
  WALLET_PAGE_FETCHES_FAILED,

  TRANSACTIONS_PAGE_FETCHES_REQUESTED,
  TRANSACTIONS_PAGE_FETCHES_SUCCEEDED,
  TRANSACTIONS_PAGE_FETCHES_FAILED,

  FETCH_USER_REQUESTED,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,

  FETCH_USER_SECURITY_REQUESTED,
  FETCH_USER_SECURITY_SUCCEEDED,
  FETCH_USER_SECURITY_FAILED,

  FETCH_BALANCES_REQUESTED,
  FETCH_BALANCES_SUCCEEDED,
  FETCH_BALANCES_FAILED,

  FETCH_WALLET_TRANSACTIONS_REQUESTED,
  FETCH_WALLET_TRANSACTIONS_SUCCEEDED,
  FETCH_WALLET_TRANSACTIONS_FAILED,

  FETCH_TRANSACTIONS_REQUESTED,
  FETCH_TRANSACTIONS_SUCCEEDED,
  FETCH_TRANSACTIONS_FAILED,

  FETCH_ASSETS_REQUESTED,
  FETCH_ASSETS_SUCCEEDED,
  FETCH_ASSETS_FAILED,

  FETCH_EXCHANGE_RATES_REQUESTED,
  FETCH_EXCHANGE_RATES_SUCCEEDED,
  FETCH_EXCHANGE_RATES_FAILED,

  FETCH_MARKETS_REQUESTED,
  FETCH_MARKETS_SUCCEEDED,
  FETCH_MARKETS_FAILED,

  FEDERATION_REQUESTED,
  FEDERATION_SUCCEEDED,
  FEDERATION_FAILED,

  FETCH_ADDRESS_REQUESTED,
  FETCH_ADDRESS_SUCCEEDED,
  FETCH_ADDRESS_FAILED,

  SHOW_SEND_FUNDS_MODAL,
  HIDE_SEND_FUNDS_MODAL,
  SHOW_RECEIVE_FUNDS_MODAL,
  HIDE_RECEIVE_FUNDS_MODAL,

  // SEND FUNDS SYNCHRONOUS
  SEND_FUNDS_REQUESTED,
  SEND_FUNDS_SUCCEEDED,
  SEND_FUNDS_FAILED,
  CLEAR_SEND_FUNDS_ERROR,

  // SEND FUNDS ASYNC
  SEND_FUNDS_CREATION_REQUESTED,
  SEND_FUNDS_CREATION_SUCCEEDED,
  SEND_FUNDS_CREATION_FAILED,
  SEND_FUNDS_INITIAL_CONFIRMATION_TIMED_OUT,


  // USER FETCH INTERVAL
  START_USER_FETCH_INTERVAL,
  CONFIG_USER_FETCH_INTERVAL,
  USER_FETCH_INTERVAL,
  STOP_USER_FETCH_INTERVAL,

  // SETTINGS TWO FACTOR MODAL
  SHOW_SETTINGS_TWO_FACTOR_MODAL,
  HIDE_SETTINGS_TWO_FACTOR_MODAL,
  SETUP_TWO_FACTOR_FETCH_REQUESTED,
  SETUP_TWO_FACTOR_FETCH_SUCCEEDED,
  SETUP_TWO_FACTOR_FETCH_FAILED,
  SETUP_TWO_FACTOR_VERIFICATION_REQUESTED,
  SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED,
  SETUP_TWO_FACTOR_VERIFICATION_FAILED,
  CLEAR_SETUP_TWO_FACTOR_VERIFICATION_STATUS,
  DISABLE_TWO_FACTOR_REQUESTED,
  DISABLE_TWO_FACTOR_SUCCEEDED,
  DISABLE_TWO_FACTOR_FAILED,

  // SETTINGS CHANGE PASSWORD
  CHANGE_PASSWORD_REQUESTED,

  // Trade Page
  MARKET_INFO_REQUESTED,
  MARKET_INFO_SUCCEEDED,
  MARKET_INFO_FAILED,

  MARKET_CHART_REQUESTED,
  MARKET_CHART_SUCCEEDED,
  MARKET_CHART_FAILED,
  MARKET_CHART_POINTS_REQUESTED,

  MARKET_HISTORY_REQUESTED,
  MARKET_HISTORY_SUCCEEDED,
  MARKET_HISTORY_FAILED,

  ORDER_HISTORY_REQUESTED,
  ORDER_HISTORY_SUCCEEDED,
  ORDER_HISTORY_FAILED,

  FETCH_OPEN_ORDERS_REQUESTED,
  FETCH_OPEN_ORDERS_SUCCEEDED,
  FETCH_OPEN_ORDERS_FAILED,

  MARKETS_TICKER_REQUESTED,
  MARKETS_TICKER_SUCCEEDED,
  MARKETS_TICKER_FAILED,

  // Trade Buy/Sell
  TRADE_BUY_REQUESTED,
  TRADE_BUY_SUCCEEDED,
  TRADE_BUY_FAILED,

  TRADE_SELL_REQUESTED,
  TRADE_SELL_SUCCEEDED,
  TRADE_SELL_FAILED,

  SHOW_TRADE_MODAL,
  HIDE_TRADE_MODAL,

  TRADE_FORM_PRICE_CHANGED,
  TRADE_FORM_AMOUNT_CHANGED,
  TRADE_FORM_TOTAL_CHANGED,

  TRADE_CANCEL_ORDER_REQUESTED,
  TRADE_CANCEL_ORDER_SUCCEEDED,
  TRADE_CANCEL_ORDER_FAILED,

  // Import Wallet
  IMPORT_WALLET_REQUESTED,
  IMPORT_WALLET_SUCCEEDED,
  IMPORT_WALLET_FAILED
} from './actionTypes'

import type {
  AssetType,
  MarketType,
  BalanceType,
  WalletTransactionType,
  Transaction,
  ExchangeRateType,
  OpenOrderType,
  CandleStickData,
  FederationResultType,
  HistoryData,
  MarketTickerData,
  TradeActionType
} from './types'

import type { AddressValidationResult } from "./apis/addressValidation"

// Flash Messages
export function flashError(message: string, options?: {list?: List<string>, code?: string} = {}) {
  return {
    type: FLASH_ERROR,
    message,
    list: options.list,
    code: options.code
  }
}

export function flashInfo(message: string, list?: List<string>) {
  return {
    type: FLASH_INFO,
    message,
    list
  }
}

export function flashErrorsReset() {
  return {
    type: FLASH_ERRORS_RESET,
  }
}

// SignUp
export function signUpRequested(email: string, password: string) {
  return {
    type: SIGN_UP_REQUESTED,
    email,
    password
  }
}
export function signUpSucceeded() {
  return {
    type: SIGN_UP_SUCCEEDED
  }
}
export function signUpFailed(error: Object = {}) {
  return {
    type: SIGN_UP_FAILED,
    error
  }
}

// Login
export function loginRequested(username: string, password: string, code?:string) {
  return {
    type: LOGIN_REQUESTED,
    username,
    password,
    code
  }
}

export function loginSucceeded() {
  return {
    type: LOGIN_SUCCEEDED
  }
}

export function loginFailed(error: Object = {}) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export function resetLoginPageState() {
  return {
    type: RESET_LOGIN_PAGE_STATE
  }
}

// Logout
export function logoutRequested() {
  return {
    type: LOGOUT_REQUESTED
  }
}
export function logoutSucceeded() {
  return {
    type: LOGOUT_SUCCEEDED
  }
}
export function logoutFailed() {
  return {
    type: LOGOUT_FAILED
  }
}
export function resetUserState() {
  return {
    type: RESET_USER_STATE
  }
}

// Resuming Session
export function resumeSessionRequested(match: Object) {
  return {
    type: RESUME_SESSION_REQUESTED,
    match
  }
}
export function resumeSessionSucceeded() {
  return {
    type: RESUME_SESSION_SUCCEEDED
  }
}
export function resumeSessionFailed() {
  return {
    type: RESUME_SESSION_FAILED
  }
}

export function confirmEmailAddressSucceeded() {
  return {
    type: CONFIRM_EMAIL_ADDRESS_SUCCEEDED
  }
}

// Forgot Password Reset
export function forgotPasswordEmailRequested(email: string) {
  return {
    type: FORGOT_PASSWORD_EMAIL_REQUESTED,
    email
  }
}

export function forgotPasswordEmailSucceeded() {
  return {
    type: FORGOT_PASSWORD_EMAIL_SUCCEEDED
  }
}

export function forgotPasswordEmailFailed() {
  return {
    type: FORGOT_PASSWORD_EMAIL_FAILED
  }
}


// User
export function fetchUserRequested() {
  return {
    type: FETCH_USER_REQUESTED
  }
}

export function fetchUserSucceeded(user: any) {
  return {
    type: FETCH_USER_SUCCEEDED,
    user
  }
}

export function fetchUserFailed() {
  return {
    type: FETCH_USER_FAILED
  }
}

export function fetchUserSecurityRequested() {
  return {
    type: FETCH_USER_SECURITY_REQUESTED
  }
}
export function fetchUserSecuritySucceeded(data: {has2FA: boolean}) {
  return {
    type: FETCH_USER_SECURITY_SUCCEEDED,
    has2FA: data.has2FA
  }
}
export function fetchUserSecurityFailed() {
  return {
    type: FETCH_USER_SECURITY_FAILED
  }
}

// Balances
export function fetchBalancesRequested() {
  return {
    type: FETCH_BALANCES_REQUESTED
  }
}

export function fetchBalancesSucceeded(balances: List<BalanceType>) {
  return {
    type: FETCH_BALANCES_SUCCEEDED,
    balances
  }
}

export function fetchBalancesFailed() {
  return {
    type: FETCH_BALANCES_FAILED
  }
}


// Wallet Transactions
export function fetchWalletTransactionsRequested() {
  return {
    type: FETCH_WALLET_TRANSACTIONS_REQUESTED
  }
}

export function fetchWalletTransactionsSucceeded(transactions: List<WalletTransactionType>) {
  return {
    type: FETCH_WALLET_TRANSACTIONS_SUCCEEDED,
    transactions
  }
}

export function fetchWalletTransactionsFailed() {
  return {
    type: FETCH_WALLET_TRANSACTIONS_FAILED
  }
}

// Transactions
export function fetchTransactionsRequested() {
  return {
    type: FETCH_TRANSACTIONS_REQUESTED
  }
}

export function fetchTransactionsSucceeded(transactions: List<Transaction>) {
  return {
    type: FETCH_TRANSACTIONS_SUCCEEDED,
    transactions
  }
}

export function fetchTransactionsFailed() {
  return {
    type: FETCH_TRANSACTIONS_FAILED
  }
}

// Assets
export function fetchAssetsRequested() {
  return {
    type: FETCH_ASSETS_REQUESTED
  }
}

export function fetchAssetsSucceeded(assets: List<AssetType>) {
  return {
    type: FETCH_ASSETS_SUCCEEDED,
    assets
  }
}

export function fetchAssetsFailed() {
  return {
    type: FETCH_ASSETS_FAILED
  }
}

// Markets
export function fetchMarketsRequested() {
    return {
        type: FETCH_MARKETS_REQUESTED
    }
}

export function fetchMarketsSucceeded(markets: List<MarketType>) {
    return {
        type: FETCH_MARKETS_SUCCEEDED,
        markets
    }
}

export function fetchMarketsFailed() {
    return {
        type: FETCH_MARKETS_FAILED
    }
}

// Addresses
export function fetchAddressRequested() {
  return {
    type: FETCH_ADDRESS_REQUESTED
  }
}

export function fetchAddressSucceeded(address: string) {
  return {
    type: FETCH_ADDRESS_SUCCEEDED,
    address
  }
}

export function fetchAddressFailed(code: string) {
  return {
    type: FETCH_ADDRESS_FAILED,
    code
  }
}

export function federationRequested(federationAddress: string) {
  return {
    type: FEDERATION_REQUESTED,
    federationAddress
  }
}

export function federationSucceeded(result: FederationResultType, validation: AddressValidationResult) {
  return {
    type: FEDERATION_SUCCEEDED,
    address: result.stellar_address,
    accountId: result.account_id,
    memoType: result.memo_type,
    memo: result.memo,
    isValid: validation.isValid,
    isStellarAddress: validation.isStellarAddress
  }
}

export function federationFailed() {
  return {
    type: FEDERATION_FAILED
  }
}

export function showSendFundsModal(asset: AssetType) {
  return {
    type: SHOW_SEND_FUNDS_MODAL,
    asset
  }
}
export function hideSendFundsModal() {
  return {
    type: HIDE_SEND_FUNDS_MODAL
  }
}
export function showReceiveFundsModal(asset: AssetType) {
  return {
    type: SHOW_RECEIVE_FUNDS_MODAL,
    asset
  }
}
export function hideReceiveFundsModal() {
  return {
    type: HIDE_RECEIVE_FUNDS_MODAL
  }
}

// Send Funds Synchronous
export function sendFundsRequested({address, amount, memo, memoType, code, fees}: Object) {
  return {
    type: SEND_FUNDS_REQUESTED,
    address,
    amount,
    code,
    memo,
    memoType,
    fees
  }
}
export function sendFundsSucceeded() {
  return {
    type: SEND_FUNDS_SUCCEEDED
  }
}
export function sendFundsFailed(error: Object) {
  return {
    type: SEND_FUNDS_FAILED,
    error
  }
}
export function clearSendFundsError() {
  return {
    type: CLEAR_SEND_FUNDS_ERROR
  }
}

// Send Funds Async
export function sendFundsCreationRequested(address: string, amount: string, message: string, code: string) {
  return {
    type: SEND_FUNDS_CREATION_REQUESTED,
    address,
    amount,
    message,
    code
  }
}
export function sendFundsCreationSucceeded() {
  return {
    type: SEND_FUNDS_CREATION_SUCCEEDED
  }
}
export function sendFundsCreationFailed() {
  return {
    type: SEND_FUNDS_CREATION_FAILED
  }
}
export function sendFundsInitialConfirmationTimedOut() {
  return {
    type: SEND_FUNDS_INITIAL_CONFIRMATION_TIMED_OUT
  }
}

// Security Settings, Two-Factor Modal
export function showSettingsTwoFactorModal(has2Factor: boolean) {
  return {
    type: SHOW_SETTINGS_TWO_FACTOR_MODAL,
    has2Factor
  }
}
export function hideSettingsTwoFactorModal() {
  return {
    type: HIDE_SETTINGS_TWO_FACTOR_MODAL
  }
}

export function setupTwoFactorFetchRequested() {
  return {
    type: SETUP_TWO_FACTOR_FETCH_REQUESTED
  }
}
export function setupTwoFactorFetchSucceeded(data: any) {
  return {
    type: SETUP_TWO_FACTOR_FETCH_SUCCEEDED,
    data
  }
}
export function setupTwoFactorFetchFailed() {
  return {
    type: SETUP_TWO_FACTOR_FETCH_FAILED
  }
}

export function setupTwoFactorVerificationRequested(id:string, code: string) {
  return {
    type: SETUP_TWO_FACTOR_VERIFICATION_REQUESTED,
    id,
    code
  }
}
export function setupTwoFactorVerificationSucceeded() {
  return {
    type: SETUP_TWO_FACTOR_VERIFICATION_SUCCEEDED
  }
}
export function setupTwoFactorVerificationFailed() {
  return {
    type: SETUP_TWO_FACTOR_VERIFICATION_FAILED
  }
}
export function clearSetupTwoFactorVerificationStatus() {
  return {
    type: CLEAR_SETUP_TWO_FACTOR_VERIFICATION_STATUS
  }
}

export function disableTwoFactorRequested(code: string) {
  return {
    type: DISABLE_TWO_FACTOR_REQUESTED,
    code
  }
}
export function disableTwoFactorSucceeded() {
  return {
    type: DISABLE_TWO_FACTOR_SUCCEEDED
  }
}
export function disableTwoFactorFailed() {
  return {
    type: DISABLE_TWO_FACTOR_FAILED
  }
}

export function changePasswordRequested() {
  return {
    type: CHANGE_PASSWORD_REQUESTED
  }
}

// Trade Buy/Sell
export function showTradeModal(tradeActionType: TradeActionType) {
  return {
    type: SHOW_TRADE_MODAL,
    tradeActionType
  }
}

export function hideTradeModal() {
  return {
    type: HIDE_TRADE_MODAL
  }
}

export function tradeBuyRequested(marketId: string, price: string, amount: string) {
  return {
    type: TRADE_BUY_REQUESTED,
    marketId,
    price,
    amount
  }
}
export function tradeBuySucceeded() {
  return {
    type: TRADE_BUY_SUCCEEDED
  }
}
export function tradeBuyFailed(error: Object) {
  return {
    type: TRADE_BUY_FAILED,
    error
  }
}

export function tradeSellRequested(marketId: string, price: string, amount: string) {
  return {
    type: TRADE_SELL_REQUESTED,
    marketId,
    price,
    amount
  }
}
export function tradeSellSucceeded() {
  return {
    type: TRADE_SELL_SUCCEEDED
  }
}
export function tradeSellFailed(error: Object) {
  return {
    type: TRADE_SELL_FAILED,
    error
  }
}

export function marketInfoRequested(marketId: number) {
  return {
    type: MARKET_INFO_REQUESTED,
    marketId
  }
}
export function marketInfoSucceeded(marketId: number, marketData: Object) {
  return {
    type: MARKET_INFO_SUCCEEDED,
    marketId,
    marketData
  }
}
export function marketInfoFailed(marketId: number) {
  return {
    type: MARKET_INFO_FAILED,
    marketId
  }
}

export function marketChartRequested(marketId: number) {
  return {
    type: MARKET_CHART_REQUESTED,
    marketId
  }
}
export function marketChartSucceeded(marketId: number, chartData: CandleStickData) {
  return {
    type: MARKET_CHART_SUCCEEDED,
    marketId,
    chartData
  }
}
export function marketChartFailed(marketId: number) {
  return {
    type: MARKET_CHART_FAILED,
    marketId
  }
}

export function marketChartPointsRequested(marketId: number) {
  return {
    type: MARKET_CHART_POINTS_REQUESTED,
    marketId
  }
}

export function marketHistoryRequested(marketId: number) {
  return {
    type: MARKET_HISTORY_REQUESTED,
    marketId
  }
}
export function marketHistorySucceeded(marketId: number, historyData: Array<HistoryData>) {
  return {
    type: MARKET_HISTORY_SUCCEEDED,
    marketId,
    historyData
  }
}
export function marketHistoryFailed(marketId: number) {
  return {
    type: MARKET_HISTORY_FAILED,
    marketId
  }
}

export function orderHistoryRequested(marketId: number) {
  return {
    type: ORDER_HISTORY_REQUESTED,
    marketId
  }
}
export function orderHistorySucceeded(marketId: number, orderHistoryData: Array<HistoryData>) {
  return {
    type: ORDER_HISTORY_SUCCEEDED,
    marketId,
    orderHistoryData
  }
}
export function orderHistoryFailed(marketId: number) {
  return {
    type: ORDER_HISTORY_FAILED,
    marketId
  }
}

export function startUserFetchInterval(ms: number = 5000) {
  return {
    type: START_USER_FETCH_INTERVAL,
    ms
  }
}

export function configUserFetchInterval(options: Object) {
  return Object.assign({}, options, {
    type: CONFIG_USER_FETCH_INTERVAL
  })
}

export function stopUserFetchInterval() {
  return {
    type: STOP_USER_FETCH_INTERVAL
  }
}

export function userFetchInterval() {
  return {
    type: USER_FETCH_INTERVAL
  }
}

export function fetchExchangeRatesRequested() {
  return {
    type: FETCH_EXCHANGE_RATES_REQUESTED
  }
}
export function fetchExchangeRatesSucceeded(rates: Array<ExchangeRateType>) {
  return {
    type: FETCH_EXCHANGE_RATES_SUCCEEDED,
    data: {
      rates
    }
  }
}
export function fetchExchangeRatesFailed() {
  return {
    type: FETCH_EXCHANGE_RATES_FAILED
  }
}

export function fetchOpenOrdersRequested() {
  return {
    type: FETCH_OPEN_ORDERS_REQUESTED
  }
}
export function fetchOpenOrdersSucceeded(orders: Array<OpenOrderType>) {
  return {
    type: FETCH_OPEN_ORDERS_SUCCEEDED,
    orders
  }
}
export function fetchOpenOrdersFailed() {
  return {
    type: FETCH_OPEN_ORDERS_FAILED
  }
}

export function marketsTickerRequested() {
  return {
    type: MARKETS_TICKER_REQUESTED,
  }
}
export function marketsTickerSucceeded(data: {[marketId: number]: MarketTickerData}) {
  return {
    type: MARKETS_TICKER_SUCCEEDED,
    data
  }
}
export function marketsTickerFailed() {
  return {
    type: MARKETS_TICKER_FAILED
  }
}

export function tradeFormPriceChanged(marketId: string, price: string) {
  return {
    type: TRADE_FORM_PRICE_CHANGED,
    marketId,
    price
  }
}
export function tradeFormAmountChanged(marketId: string, amount: string) {
  return {
    type: TRADE_FORM_AMOUNT_CHANGED,
    marketId,
    amount
  }
}
export function tradeFormTotalChanged(marketId: string, total: string, baseScale: number) {
  return {
    type: TRADE_FORM_TOTAL_CHANGED,
    marketId,
    total,
    baseScale
  }
}

export function tradeCancelOrderRequested(orderId: string) {
  return {
    type: TRADE_CANCEL_ORDER_REQUESTED,
    orderId
  }
}
export function tradeCancelOrderSucceeded(orderId: string) {
  return {
    type: TRADE_CANCEL_ORDER_SUCCEEDED,
    orderId
  }
}
export function tradeCancelOrderFailed(orderId: string) {
  return {
    type: TRADE_CANCEL_ORDER_FAILED,
    orderId
  }
}

export function importWalletRequested(seed: string) {
  return {
    type: IMPORT_WALLET_REQUESTED,
    seed
  }
}

export function importWalletSucceeded() {
  return {
    type: IMPORT_WALLET_SUCCEEDED
  }
}

export function importWalletFailed() {
  return {
    type: IMPORT_WALLET_FAILED
  }
}

export function appSessionFetchesRequested() {
  return {
    type: APP_SESSION_FETCHES_REQUESTED
  }
}
export function appSessionFetchesSucceeded() {
  return {
    type: APP_SESSION_FETCHES_SUCCEEDED
  }
}
export function appSessionFetchesFailed() {
  return {
    type: APP_SESSION_FETCHES_FAILED
  }
}

export function tradePageFetchesRequested() {
  return {
    type: TRADE_PAGE_FETCHES_REQUESTED
  }
}
export function tradePageFetchesSucceeded() {
  return {
    type: TRADE_PAGE_FETCHES_SUCCEEDED
  }
}
export function tradePageFetchesFailed() {
  return {
    type: TRADE_PAGE_FETCHES_FAILED
  }
}

export function tradeMarketFetchesRequested(marketId: number) {
  return {
    type: TRADE_MARKET_FETCHES_REQUESTED,
    marketId
  }
}
export function tradeMarketFetchesSucceeded() {
  return {
    type: TRADE_MARKET_FETCHES_SUCCEEDED
  }
}
export function tradeMarketFetchesFailed() {
  return {
    type: TRADE_MARKET_FETCHES_FAILED
  }
}

export function walletPageFetchesRequested() {
  return {
    type: WALLET_PAGE_FETCHES_REQUESTED
  }
}
export function walletPageFetchesSucceeded() {
  return {
    type: WALLET_PAGE_FETCHES_SUCCEEDED
  }
}
export function walletPageFetchesFailed() {
  return {
    type: WALLET_PAGE_FETCHES_FAILED
  }
}

export function transactionsPageFetchesRequested() {
  return {
    type: TRANSACTIONS_PAGE_FETCHES_REQUESTED
  }
}
export function transactionsPageFetchesSucceeded() {
  return {
    type: TRANSACTIONS_PAGE_FETCHES_SUCCEEDED
  }
}
export function transactionsPageFetchesFailed() {
  return {
    type: TRANSACTIONS_PAGE_FETCHES_FAILED
  }
}
