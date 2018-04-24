// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import TopNav from '../orgs/TopNav'
//import { action } from '../../actions'

import { SUCCESS } from "../../types"

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.getIn(["user", "status"]) === SUCCESS,
    username: state.getIn(["user", "details", "data", "username"])
  }
}

/*
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(logoutRequested());
      amplitude.setUserId('null');
    },
  }
}
*/

export default connect(
  mapStateToProps
)(toJS(TopNav))
