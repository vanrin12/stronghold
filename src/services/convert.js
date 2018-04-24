// @flow
import _ from "lodash"
import { fetchExchangeRates } from "../apis"

import { NOT_ASKED, SUCCESS, FAILURE } from "../types"
import type { RemoteStatusType, ExchangeRateType } from "../types"

// Convert currencies eg. convert(amount { from: "USD", to: "BTC"})
// inspired by http://openexchangerates.github.io/money.js/

function createConverter() {
  let status: RemoteStatusType = NOT_ASKED
  let rates: Object = {}

  function init() {
    return new Promise( function(resolve, reject) {
      fetchExchangeRates()  // TODO how often to refresh exchange rates?
      .then(function(result: Array<ExchangeRateType>){
        status = SUCCESS
        rates = {
          USD: result
        }

        // Add the reverse rates
        rates = _.reduce(rates, function(rates, baseRates, base){
          return _.reduce(baseRates, function(rates, rate, quote){
            // Add the reverse if not already present
            if (!rates[quote]) {
              rates[quote] = {
                [base] : 1 / rate
              }
            } else if (_.isUndefined(rates[quote][base])) {
              rates[quote][base] = 1 / rate
            }
            return rates
          }, rates)
        }, rates)
        
        resolve(status)
      })
      .catch(function(error){
        status = FAILURE
        reject(status)
      })
    })
  }
  init()

  let trys = 0

  async function call(amount: string, {from, to}: {from: string, to: string}) {
    try {
      let result = "" // default if not supported

      if( status === FAILURE ) {
        return result  // don't DDOS self. issue #185-186
      }else if ( status !== SUCCESS ) {
        await init()
      }

      if (amount === "") {
        result = ""
      } else if (amount === 0) {
        result = 0
      } else if (from === to) {
        result = amount

      } else if (rates[from] && rates[from][to]) {
        // Return the converted amount using the exchange rate
        result = parseFloat(amount) / rates[from][to]
      }

      // if result is NaN return empty string.
      if(isNaN(result) && result !== "N/A") {
        result = ""
      }

      //console.log("convert: ", amount, "from", from, "to", to, "=", result)

      return result

    } catch(err) {
      trys++;
      if (trys < 4) {  // try 4 times with 500ms second delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return call.apply(this, arguments)
      } else {
        trys = 0
        return "N/A"
      }
    }
  }

  return call
}

export default createConverter
