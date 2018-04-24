// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import PasswordReset from '../pages/PasswordReset'

import {
  flashError,
  flashInfo
} from '../../actions'

import { testPassword, passwordReset } from '../../apis'

/*
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
*/

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetPassword: (password, password2, token, history) => {
      if (password !== password2) {
        return dispatch(flashError("Your new password and verify password must match."))
      }
      const passwordError = testPassword(password)
      if (passwordError) {
        switch(passwordError.code) {
          case 'passwordTooShort':
            return dispatch(flashError('Password must be at least 8 characters in length.'))
          case 'passwordMustHaveUpper':
            return dispatch(flashError('Password must contain an uppercase letter.'))
          case 'passwordMustHaveLower':
            return dispatch(flashError('Password must contain a lowercase letter.'))
          case 'passwordMustHaveNumber':
            return dispatch(flashError('Password must contain a number.'))
          default:
            return dispatch(flashError('Password is not formatted correctly.'))
        }
      }

      passwordReset(token, password)
      .then(function(){
        history.replace('/login')
        dispatch(flashInfo('Password updated successfully.\n Please login below.'))
      })
      .catch(function(err){
        dispatch(flashError('Something went wrong while updating your password.'))
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(toJS(PasswordReset))
