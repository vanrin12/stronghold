// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'

import Dropdown from '../../../components/atoms/Dropdown'

import "./UserMenu.css"

type Props = {
  username: string
}

class UserMenu extends React.Component<Props> {
  render() {
    return (
      <div className="TopNav__UserMenu">
        <div className="TopNav__UserMenu__links">
          <ul className="menu-horizontal text-left">
            <li>
              <Link to="/trade">Trade</Link>
            </li>
            <li>
              <Link to="/balances">Balances</Link>
            </li>
            {/*<li>
              <Link to="/transactions">Transactions</Link>
            </li>*/}
          </ul>
        </div>
        <div className="TopNav__UserMenu__right-bar">
          <Dropdown title={<span className="TopNav__UserMenu__username">{ this.props.username }<i className="stack-down-open"></i></span>}>
            <ul className="menu-vertical">
              <li>
                <Link to="/security">Security</Link>
              </li>
              <li>
                <a href="https://stronghold.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">Support</a>
              </li>
              <li className="separate">
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default UserMenu;
