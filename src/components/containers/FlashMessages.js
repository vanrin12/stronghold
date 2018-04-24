// @flow
import { connect } from 'react-redux'

import toJS from './toJS'
import FlashErrors from '../molecules/FlashMessages'

import { flashErrorsReset } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.getIn(['flashMessage','message']),
    list: state.getIn(['flashMessage','list']),
    type: state.getIn(['flashMessage', 'type'] || 'error')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reset: () => {
      dispatch(flashErrorsReset())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(FlashErrors))
