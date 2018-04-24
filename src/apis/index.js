// @flow
import 'es6-promise/auto'
import 'isomorphic-fetch'
import _ from 'lodash'
import { resolve } from 'url'
import BigNumber from "bignumber.js"
import validator from 'validator'
import getAnalytics from './analytics'

const API_URL: string = process.env.REACT_APP_API_URL || ''

function formatURL(path: string) {
  return resolve(API_URL, path)
}

let sessionKey: string = ""
export function updateSessionKey(newSessionKey: string) {
  sessionKey = newSessionKey
}
export function clearSessionKey() {
  sessionKey = ""
}

const analytics = getAnalytics(process.env.REACT_APP_STRONGHOLD_ENV === 'production');

export function fetchAPI(path: string, withAuth: boolean|Object = false, options: Object|boolean = {}): Promise<any> {
  if (_.isObject(withAuth)) {
    options = withAuth
    withAuth = false
  }

  const fetchOptions: any = {}
  fetchOptions.method = options.method || 'GET'

  fetchOptions.headers = {}
  fetchOptions.headers['Content-Type'] = 'application/json'
  fetchOptions.headers['Cache-Control'] = 'no-cache'

  if(options.body) {
    fetchOptions.body = JSON.stringify(options.body)
  }


  // Add authorization header
  if(withAuth || options.withAuth) {
    fetchOptions.headers.Authorization = "Basic " + btoa(sessionKey + ':')
  }

  return fetch(formatURL(path), fetchOptions)
  .then(function(response){
    // Logout with message if 401 return
    if(!response.ok && response.status === 401) {
      return response.json().then(function(data){
        // Redirect with idle error message, if errorCode is empty string
        if(data.errorCode === "" || data.errorCode === undefined) {
          document.location.hash = "#/logout/401"
        }
        return data
        /* (since success === false, will throw in the next Then) */
      })
    }
    return response.json()
  })
  .then(function(data){
    // If non successful, throw
    if(data.success === false) {
      throw data
    } else {
      return data.result
    }
  })
}


export function fetchUser(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/exchange/user', true)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      reject(error)
    })
  })
}

export function fetchUserSecurity(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/exchange/user/security', true)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      //resolve({has2FA: true})  // TODO just for dev
      //resolve({has2FA: false})  // TODO just for dev
      reject(error)
    })
  })
}

export function fetchAssets(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/exchange/assets', false)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      reject(error)
    })
  })
}

export function fetchMarkets(): Promise<Object> {
    return new Promise( function(resolve, reject) {
        fetchAPI('/exchange/markets', true)
            .then(function(result){
                resolve(result)
            })
            .catch(function(error){
                reject(error)
            })
    })
}

export function fetchBalances(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/wallet/balances', true)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      reject(error)
    })
  })
}

export function fetchWalletTransactions(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/wallet/transactions', true)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      reject(error)
    })
  })
}

export function fetchTransactions(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/wallet/transactions', true)  // TODO change to real endpoint
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      reject(error)
    })
  })
}

export function login(username: string, password: string, code?: string): Promise<Object> {
  return new Promise( function(resolve, reject) {

    if (!username) {
      return reject({code: 'usernameIsEmpty'})
    }
    if (!password) {
      return reject({code: 'passwordIsEmpty'})
    }

    fetchAPI('/auth', {
      method: 'POST',
      body: {
        email: username,
        password,
        code
      }
    })
    .then( data => {
      if (data && data.sessionKey) {
        resolve({
          sessionKey: data.sessionKey,
        })
        analytics.addAmplitudeEvent('Logged In', username);
      } else {
        reject(data)
      }

    })
    .catch( (err)=>{
      //reject({errorCode:"INCORRECT_CODE"}) // TODO test dev
      reject(err)
    })
  })
}

// Returns error if password isn't formatted correctly
export function testPassword(password: string) {
  if (password.length < 8) {
    return {code: 'passwordTooShort'}
  }

  if (!/[A-Z]+/.test(password)) {
    return {code: 'passwordMustHaveUpper'}
  }

  if (!/[a-z]+/.test(password)) {
    return {code: 'passwordMustHaveLower'}
  }

  if (!/[0-9]+/.test(password)) {
    return {code: 'passwordMustHaveNumber'}
  }

  return null
}

export function signUp(email: string, password: string): Promise<Object> {
  return new Promise( function(resolve, reject) {
    if (!email || !password) {
      return reject({code: 'empty'})
    }

    if (!validator.isEmail(email)) {
      return reject({code: 'emailIsInvalid'})
    }

    const passwordError = testPassword(password)
    if (passwordError) {
      return reject(passwordError)
    }

    fetchAPI('/auth/register', {
      method: 'POST',
      body: {
        email,
        password
      }
    })
    .then( data => {
      resolve(data);
      analytics.addGoogleEvent({
        type: "conversion",
        id: "Mj9YCL-mqXwQ9qHS0AM"
      });
      analytics.addAmplitudeEvent('Account Created', email);
    })
    .catch( err => reject(err) )

  })
}

export function verifyEmail(token: string): Promise<Object> {
  return new Promise(function(resolve, reject){
    fetchAPI('/auth/confirm/' + token, {
      method: 'POST'
    })
    .then(function(data){
      resolve(data)
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function sendEmailVerification(email: string): Promise<Object> {
  return new Promise(function(resolve, reject){
    fetchAPI('/auth/confirm', {
      method: 'POST',
      body: {
        email
      }
    })
    .then(function(data){
      resolve(data)
      analytics.addAmplitudeEvent('Email Verification Sent', email)
    })
    .catch(function(err){
      reject(err)
    })
  })
}

function _sendFunds({address, amount, code, memoType, memo}: Object): Promise<Object> {
  const body = {}  // unsealed object
  body.code = code
  body.amount = amount
  body.destinationAddress = address

  if (memo && memoType) {
    body.memo = memo
    body.memoType = memoType
  }
  return new Promise(function(resolve, reject) {
    fetchAPI('/wallet/send', true, {
      method: 'POST',
      body
    })
    .then(function(data){
      resolve(data)
      analytics.addAmplitudeEvent('Asset Sent')
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function sendFunds(params: Object): Promise<Object> {
  const { address, amount, fees, walletBalance } = params

  return new Promise(function(resolve, reject){
    if(address === "") {
      reject({code: "ADDRESS_BLANK"})
      return
    }
    if(amount === "") {
      reject({code: "AMOUNT_BLANK"})
      return
    }
    if(fees === null) {
      reject({code: "FEES_ERROR"})
      return
    }
    try {
      const bAmount = new BigNumber(amount)
      /*  // test has false positives, out of BigNumber EXPONENTIAL_AT range
      if (bAmount.toString() !== amount) {
        reject({code: "AMOUNT_NOT_AS_GIVEN"})  // The user sees a different amount than the value of the amount
      }
      */
      if (bAmount.lessThanOrEqualTo(0)) {
        reject({code: "AMOUNT_NOT_POSITIVE"})
      } else if (bAmount.greaterThan(walletBalance)) {
        reject({code: "AMOUNT_NOT_ENOUGH"})
      } else if (bAmount.plus(fees).greaterThan(walletBalance)) {
        reject({code: "AMOUNT_WITH_FEES_NOT_ENOUGH"})
      }
      resolve()
    } catch(err) {
      reject({code: "INVALID_AMOUNT"})
    }
  }).then(function() {
    return _sendFunds(params)
  })
}


export function fetchAddress(code: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI('/wallet/receive/'+code, true)
    .then(function(data){
      resolve(data)
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function fetchExchangeRates(): Promise<any> {
  return new Promise(function(resolve, reject) {
    fetchAPI("/exchange/rates", true)
    .then(function(data){
      resolve(data.reduce(function(rates, rate){
        rates[rate.currency] = rate.rate
        return rates
      }, {}))
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function forgotPasswordRequest(email: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI('/auth/password/reset', {
      method: 'POST',
      body: {
        email
      }
    })
    .then(function(data){
      resolve(data)
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function passwordReset(code: string, password: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI('/auth/password/reset/'+code, {
      method: 'POST',
      body: {
        password
      }
    })
    .then(function(data){
      resolve(data)
    })
    .catch(function(err){
      reject(err)
    })
  })
}

export function changePassword(currentPassword: string, newPassword: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI('/auth/password', true, {
        method: 'POST',
        body: {
          currentPassword,
          newPassword
        }
      })
      .then(function(data){
        resolve(data)
      })
      .catch(function(err){
        reject(err)
      })
  })
}

export function tradeBuy({marketId, price, amount}: {marketId: string, price: string, amount: string}): Promise<Object> {
    return new Promise(function (resolve, reject) {
        fetchAPI('/exchange/orders', true, {
            method: 'POST',
            body: {
                marketId,
                amount,
                price,
                action: 'buy'
            }
        })
        .then(function (data) {
            resolve(data)
        })
        .catch(function (err) {
            reject(err)
        })
    })
}
export function tradeSell({marketId, price, amount}: {marketId: string, price: string, amount: string}): Promise<Object> {
    return new Promise(function (resolve, reject) {
        fetchAPI('/exchange/orders', true, {
            method: 'POST',
            body: {
                marketId,
                amount,
                price,
                action: 'sell'
            }
        })
        .then(function (data) {
            resolve(data)
        })
        .catch(function (err) {
            reject(err)
        })
    })
}

export function fetchOpenOrders(): Promise<Object> {
    return new Promise(function(resolve, reject) {
        fetchAPI("/exchange/orders", true)
            .then(function (data) {
                resolve(data)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}

export function marketInfoRequest(marketId: number): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI("/exchange/markets/" + marketId, true)
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}

export function marketChartRequest(marketId: number): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI(`/exchange/markets/${marketId}/charts`, true)
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}

export function marketHistoryRequest(marketId: number): Promise<any> {
  return new Promise(function(resolve, reject) {
    fetchAPI(`/exchange/markets/${marketId}/trades`, true)
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
        reject(err)
    })
  })
}

export function orderHistoryRequest(marketId: number): Promise<any> {
  return new Promise(function(resolve, reject) {
    fetchAPI(`/exchange/orders/${marketId}/trades`, true)
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
        reject(err)
    })
  })
}

export function marketsTickerRequest(): Promise<any> {
  return new Promise(function(resolve, reject) {
    fetchAPI("/v1/markets/ticker")
    .then(function (data) {
      resolve(data.reduce( function(ticker, market) {
        ticker[market.id] = market
        return ticker
      }, {}))
    })
    .catch(function (err) {
        reject(err)
    })
  })
}

export function tradeCancelOrder(orderId: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI("/exchange/orders/" + orderId, true, {
      method: "DELETE"
    })
    .then(function (data) {
        resolve(data)
    })
    .catch(function (err) {
        reject(err)
    })
  })
}

export function importWallet(seed: string): Promise<Object> {
  return new Promise(function(resolve, reject) {
    fetchAPI("/wallet/merge/" + seed, true, {
      method: "POST",
      body: {}
    })
    .then(function (data) {
      resolve(data)
    })
    .catch(function (err) {
      reject(err)
    })
  })
}

export function setupFetchTwoFactor(): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI("/auth/2fa/setup", true)
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      // TODO test success data
      /*
      resolve({
        recoveryCode: "987-654",
        id: "123456",
        qrData: "iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAABlBMVEX///8AAABVwtN+AAACJUlEQVR42uzdQY7iQAyGUbj/pWc7G9DvsjGk875VS02j5M2iVOVE85AkSZIkSZIkSZIkSZIkSdIz7v/PJ99Z/Tm/BgAAAAAAMAswdUOvvi35bf86AQAAAABAByBf+nKG93/buQYAAAAAALAPkGxi+sssAAAAAAD45WUw2azkx1oAAAAAAOAXAKo3V93uzAIDAAAAAIApgLPx+OzPF3w+AAAAAAAuDzC1bPbHIxcJAAAAAP4UQHLh+WJYXeKq3wAAAAAAAHbWgrNt06vPv7+VBAMAAAAAAOwMRp7FpkYo+TILAAAAAAA+MRjJj76qY433W6vqkRsAAAAAAPgEQH4YdjYGqd7EyvAEAAAAAAAUlqmpg7TOuAYAAAAAAOwcifUv52w8fvYPAgAAAAAAphiSW08Ot85emF5/kBYAAAAAbg0wtRzlJGcDGQAAAAAAsDkkOXtw6ey1ufWXJAAAAAAAwGP2cdfOLX5pMwQAAAAAtwbobzvOXrlIls3F1yYAAAAA4NYAyaVVj7vyzVZnhA4AAAAAAK67U6giAQAAAACAnWFIPh5JBhr5MVt+5AYAAAAAAHaWteRiq0P1swdsAQAAAADA5wA6x1HJcdrU8RgAAAAAAPgWQP+3+SZpZUsEAAAAAABaAMnfdsYjAAAAAADg1/77/WQD1Pn8+vNhAAAAAHBrgKnxeL7Ang3SAQAAAACAJEmSJEmSJEmSJEmSJEnSrfsXAAD//8rNOxFRTgVkAAAAAElFTkSuQmCC"
      })
      */
      reject(error)
    })
  })
}

export function setupTwoFactorVerifyCode(id: string, code: string): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/auth/2fa/setup', true, {
      method: "POST",
      body: {
        id,
        code
      }
    })
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      //resolve({})  // TODO test success
      reject(error)
    })
  })
}

export function disableTwoFactor(code: string): Promise<Object> {
  return new Promise( function(resolve, reject) {
    fetchAPI('/auth/2fa/disable', true, {
      method: "POST",
      body: {
        code
      }
    })
    .then(function(result){
      resolve(result)
    })
    .catch(function(error){
      //resolve({})  // TODO test success
      reject(error)
    })
  })
}
