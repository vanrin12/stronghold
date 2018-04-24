// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import Charts from '../pages/Charts'

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.get('username')
  }
}

/*
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    action: () => {
      dispatch(action())
    },
  }
}
*/

export default connect(
  mapStateToProps
  //,mapDispatchToProps
)(toJS(Charts))
