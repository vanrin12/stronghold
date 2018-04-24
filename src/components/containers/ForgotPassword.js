// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import ForgotPassword from '../pages/ForgotPassword'

import {
  forgotPasswordEmailRequested,
} from '../../actions'

/*
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
*/

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    forgotPasswordRequest: (email) => {
      dispatch(forgotPasswordEmailRequested(email))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(toJS(ForgotPassword))
