// @flow
import * as React from 'react'

import Helmet from 'react-helmet'

import TopNav from '../../containers/TopNav'

import TwoFactorSection from './TwoFactorSection'
import TwoFactorModal from './TwoFactorModal'

import ChangePassword from './ChangePassword'

/*
import TwoFactor from './TwoFactor'
import TwoFactorModal from './TwoFactorModal'

import WebSessionTable from './WebSessionTable'
import ConfirmedDevicedTable from './ConfirmedDevicedTable'
import AccountActivityTable from './AccountActivityTable'

import CloseAccount from './CloseAccount'
*/

import type { TwoFactorSetupState, TwoFactorModalSetupState } from '../../../types'

type Props = {
  init: Function,
  twoFactor: TwoFactorSetupState,
  twoFactorModal: TwoFactorModalSetupState,
  openTwoFactorModal: Function,
  closeTwoFactorModal: Function,
  fetchTwoFactorQrCode: Function,
  verifyTwoFactorCode: Function,
  clearVerificationStatus: Function,
  disableTwoFactor: Function,
  changePassword: Function
}

class Security extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.init()
  }

  closeAccount() {
    console.log('account closed');
    // API Call to close account
  }

  render() {
    let modalHTML = null;
    if (this.props.twoFactor.isOpen) {
      modalHTML = (
        <TwoFactorModal
          getSetup={ this.props.twoFactorModal.getSetup }
          enabled={ this.props.twoFactorModal.enabled }
          disabled={ this.props.twoFactorModal.disabled }
          close={ this.props.closeTwoFactorModal }
          verify={ this.props.verifyTwoFactorCode }
          clearVerificationStatus={ this.props.clearVerificationStatus }
          has2Factor={ this.props.twoFactor.has2FA.data }
          disable={ this.props.disableTwoFactor }
        />
      )
      /*
      modalHTML = (
        <TwoFactorModal
          isOpen={true}
          onClose={this.props.closeModal}
          phoneVerify={this.props.phoneVerify}
          isVerifying={this.props.isVerifying}
        />
      )
      */
    }

    return (
      <div>
        <Helmet>
          <title>Stronghold - Security</title>
          <meta name="description" content="Stonghold Security" />
        </Helmet>
        <TopNav />
        <div className="container">
          <section>
            <div className="col-sm-9 col-md-6">
              <div className="boxed boxed--border">
                <TwoFactorSection
                  open={ this.props.openTwoFactorModal }
                  has2FA={ this.props.twoFactor.has2FA }
                />
              </div>
            </div>
            <div className="col-sm-9 col-md-6">
              <div className="boxed boxed--border">
                <ChangePassword changePassword={ this.props.changePassword } />
              </div>
            </div>
            {/*
            <div className="boxed boxed--border">
              <TwoFactor
                openModal={this.props.openModal}
              />
            </div>
            <div className="boxed boxed--border">
             <WebSessionTable />
            </div>
            <div className="boxed boxed--border">
              <ConfirmedDevicedTable />
            </div>
            <div className="boxed boxed--border">
             <AccountActivityTable />
            </div>
            <div className="boxed boxed--border bg--error">
              <CloseAccount onClick={this.closeAccount}/>
            </div>
            */}
          </section>
        </div>
        { modalHTML }
      </div>
    );
  }
}

export default Security
