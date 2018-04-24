// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import { logoutRequested, flashError } from '../../actions'

/*
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
*/

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(logoutRequested())
    },
    flashIdle: () => {
      dispatch(flashError("For security purposes, your session has timed out. Please login again to continue."))
    }
  }
}

type Props = {
  logout: Function,
  history: Object,
  flashIdle: Function
}

class Logout extends React.Component<Props> {
  componentWillMount() {
    this.props.logout()
    this.props.history.replace('/login')
    if (this.props.match && this.props.match.params && this.props.match.params.code === "401") {
      this.props.flashIdle()
    }
  }
  render() {
    return null
  }
}

export default connect(
  null,
  //mapStateToProps,
  mapDispatchToProps
)(Logout)
