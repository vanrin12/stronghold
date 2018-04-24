// @flow

// Redirects to trade page, if they are already logged-in

import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

import { SUCCESS } from "../../types"

const locationHelper = locationHelperBuilder({})

export default connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/trade',

  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,

  authenticatedSelector: state => {
    return !(state.getIn(["user", "status"]) === SUCCESS)
  },

  wraperDisplayName: 'UserIsNotAuthenticated'

})
