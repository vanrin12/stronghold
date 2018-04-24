// @flow
import { all } from 'redux-saga/effects'

import signUp from './signUp'
import login from './login'
import appSession from './appSession'
import fetches from './fetches'
import { sendFundsSynchronous, watchImportWallet } from './funds'
import markets from './markets'
import trades from './trades'
import federation from './federation'
import forgotPassword from './forgotPassword'
import fetchInterval from './fetchInterval'
import pageFetches from './pageFetches'
import twoFactor from './twoFactor'

export default function* rootSaga(): Iterable<any> {
  yield all([
    signUp(),
    login(),
    appSession(),
    fetches(),
    federation(),
    sendFundsSynchronous(),
    forgotPassword(),
    markets(),
    trades(),
    watchImportWallet(),
    fetchInterval(),
    pageFetches(),
    twoFactor()
  ])
}
