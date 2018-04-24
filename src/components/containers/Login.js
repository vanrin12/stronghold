// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import Login from '../pages/Login'
import {
  loginRequested,
  flashErrorsReset,
  flashError,
  flashInfo,
  resetLoginPageState
} from '../../actions'

import { sendEmailVerification } from '../../apis'

const mapStateToProps = (state, ownProps) => {
  return {
    flashMessage: state.get('flashMessage'),
    loginReq: state.getIn(["app", "login"]),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (username: string, password: string, code?: string) => {
      dispatch(flashErrorsReset())
      dispatch(loginRequested(username, password, code))
    },
    reset: () => {
      dispatch(resetLoginPageState())
    },
    sendEmailVerification: (email) => {
      sendEmailVerification(email)
      .then(function() {
        // TODO make green.
        dispatch(flashInfo("Please check you email and click on the\n email verification link from us."))
      })
      .catch(function() {
        dispatch(flashError("Please verify your email to login to your account."))
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Login))
