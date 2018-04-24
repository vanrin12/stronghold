// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import SignUp from '../pages/SignUp'
import { signUpRequested, flashErrorsReset } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    isInProgress: state.get('isSigningUp')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signUp: (email, password) => {
      dispatch(flashErrorsReset())
      dispatch(signUpRequested(email, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SignUp))
