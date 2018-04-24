// @flow
import { connect } from 'react-redux';

import toJS from './toJS';
import ChangePassword from '../pages/Security/ChangePassword';

import {
  flashError,
  flashInfo
} from '../../actions';

import {
  testPassword,
  changePassword
} from '../../apis';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassword(currentPassword, newPassword, newPassword2) {
      if (newPassword !== newPassword2) return dispatch(flashError("Your new password and verify password must match."));

      const passwordError = testPassword(newPassword);

      if (passwordError) {
        switch(passwordError.code) {
          case 'passwordTooShort':
            return dispatch(flashError('Password must be at least 8 characters in length.'));
          case 'passwordMustHaveUpper':
            return dispatch(flashError('Password must contain an uppercase letter.'));
          case 'passwordMustHaveLower':
            return dispatch(flashError('Password must contain a lowercase letter.'));
          case 'passwordMustHaveNumber':
            return dispatch(flashError('Password must contain a number.'));
          default:
            return dispatch(flashError('Password is not formatted correctly.'));
        }
      }

      changePassword(currentPassword, newPassword)
        .then(() => {
          dispatch(flashInfo('Password updated successfully.'));
        })
        .catch((err) => {
          dispatch(flashError('Something went wrong while updating your password. Please try again!'));
        });
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(toJS(ChangePassword));
