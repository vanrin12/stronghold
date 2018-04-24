// @flow
import { connect } from 'react-redux'

import {
  showSettingsTwoFactorModal,
  hideSettingsTwoFactorModal,
  setupTwoFactorVerificationRequested,
  clearSetupTwoFactorVerificationStatus,
  fetchUserSecurityRequested,
  disableTwoFactorRequested,
} from '../../actions'

import toJS from './toJS'
import Security from '../pages/Security'

import {flashError, flashInfo} from '../../actions';

import {testPassword, changePassword} from '../../apis';

const mapStateToProps = (state, ownProps) => {
  const user = state.get('user');
  return {
    twoFactor: user.getIn(["app", "security", "twoFactor"]),
    twoFactorModal: user.getIn(["app", "security", "twoFactorModal"]),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
            dispatch(fetchUserSecurityRequested())
        },
        openTwoFactorModal: (has2Factor: boolean) => {
            dispatch(showSettingsTwoFactorModal(has2Factor))
        },
        closeTwoFactorModal: () => {
            dispatch(hideSettingsTwoFactorModal())
        },
        verifyTwoFactorCode: (id, code) => {
            dispatch(setupTwoFactorVerificationRequested(id, code))
        },
        clearVerificationStatus: () => {
            dispatch(clearSetupTwoFactorVerificationStatus())
        },
        changePassword(currentPassword, newPassword, newPassword2) {
            console.log('container changePassword init');
            if (newPassword !== newPassword2) return dispatch(flashError("Your new password and verify password must match."));

            const passwordError = testPassword(newPassword);

            if (passwordError) {
                switch (passwordError.code) {
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
        },
        disableTwoFactor: (code: string) => {
            dispatch(disableTwoFactorRequested(code))
        }
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Security))
