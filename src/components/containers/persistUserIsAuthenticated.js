// @flow

/* Gives userIsAuthenticated ability to dispatch RESUME_SESSION_REQUESTED */

import * as React from 'react'

import { connect } from 'react-redux'
import toJS from './toJS'

import userIsAuthenticated from './userIsAuthenticated'

import {resumeSessionRequested} from '../../actions'
import { getStoredSessionKey } from '../../storage'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hasStoredSessionKey: () => {
      return !!getStoredSessionKey()
    },
    resumeSessionRequest: () => {
      dispatch(resumeSessionRequested(ownProps.match))
    }
  }
}

export default function(Child: React.Component<*>) {
  const Auth = userIsAuthenticated(Child)

  return connect(
    null,
    mapDispatchToProps
  )(toJS(Auth))
}
