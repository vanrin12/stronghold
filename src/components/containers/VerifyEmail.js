// @flow
import { connect } from 'react-redux'

import { flashError, confirmEmailAddressSucceeded } from '../../actions'
import { verifyEmail, updateSessionKey } from '../../apis'
import { storeSessionKey } from '../../storage'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    verifyEmail: (token, history) => {
      verifyEmail(token)
      .then(function(data) {
        updateSessionKey(data.sessionKey)
        return storeSessionKey(data.sessionKey)
      })
      .then(function() {
        dispatch(confirmEmailAddressSucceeded())
      })
      .catch(function(){
        history.replace('/login')
        dispatch(flashError('Something went wrong while verifying your email. Please try again.'))
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(function( { match, history, verifyEmail }: Object ){
  if (match && match.params && match.params.token) {
    const token =  match.params.token
    verifyEmail(token, history)
  }

  return null
})
