// @flow

// Redirect to login page, if user isn't logged in

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import { SUCCESS } from "../../types"

export default connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state, ownProps) => {
    if (state.getIn(["user", "status"]) === SUCCESS) {
      return true

    // If there's a stored session, try to resume it.
    } else if(ownProps.hasStoredSessionKey && ownProps.hasStoredSessionKey() && ownProps.resumeSessionRequest) {
      ownProps.resumeSessionRequest()
      return true
    }
    return false
  },
  wrapperDisplayName: 'UserIsAuthenticated'
})
