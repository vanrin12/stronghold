// @flow
import { fromJS } from 'immutable'

import { NOT_ASKED } from "./types"

const initialState: any = fromJS({
  app: {
    login: {
      status: NOT_ASKED,
    }
  },

  flashMessage: {},

  // All user's session state, go under `user`
  user: {
    status: NOT_ASKED,
    details: {
      status: NOT_ASKED,
      data: {
        email: "",
        username: ""
      }
    },

    assets: { status: NOT_ASKED },
    balances: { status: NOT_ASKED },
    transactions: { status: NOT_ASKED },
    walletTransactions: { status: NOT_ASKED },

    exchangeRates: { status: NOT_ASKED },

    openOrders: {
      status: NOT_ASKED,
      currentPage: 1
    },

    markets: {},

    app: {  // App State
      wallet: {
        sendModal: null,
        receiveModal: null,
        fundsIsSending: false,
        receivingAddresses: {
          status: NOT_ASKED,
          data: {}
        },
        federation: {
          federationIsSending: false,
          federationAddress: null
        },
        importingWallet: {
          status: NOT_ASKED
        }
      },

      security: {
        twoFactor: {
          isOpen: false,
          has2FA: {
            status: NOT_ASKED,
          }
        },
        twoFactorModal: {
          getSetup: {
            status: NOT_ASKED
          },
          enabled: {
            status: NOT_ASKED
          },
          disabled: {
            status: NOT_ASKED
          }
        }
      },

      trade: {
        isProcessing: false,
        tradeModal: false,
        tradeActionType: null
        /* Individual market's form values
         *
         * [ marketId ] : {
         *   form: {
         *     price: string,
         *     amount: string
         *   }
         * }
        */
      },
      fetchInterval: {}
    }
  },

  trade: {
    markets: { status: NOT_ASKED }
  },

  marketsTicker: {
    status: NOT_ASKED
  },

  isSigningUp: false
})

export default initialState
