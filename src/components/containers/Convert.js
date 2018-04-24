// @flow
import { connect } from 'react-redux'

/*
import {
} from '../../actions'
*/

import toJS from './toJS'
import Convert from '../pages/Convert'

/*
const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}
*/

export default connect(
  /*
  mapStateToProps,
  mapDispatchToProps
  */
)(toJS(Convert))
