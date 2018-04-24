// @flow
import * as React from 'react'

import { Link } from 'react-router-dom'

import GuestMenu from './GuestMenu'
import UserMenu from './UserMenu'

import logoDark from '../../../assets/img/logo.svg'
//import logoLight from '../../../assets/img/stronghold-light.png'


type Props = {
  transparent: boolean,
  isLoggedIn: boolean,
  username: string
}

type State = {
  showMenu: boolean
}

class TopNav extends React.Component<Props, State> {
  state = {
    showMenu: false
  }

  toggleMenu = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault()
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  render() {

    // Show GuestMenu if not logged-in
    let menu
    if (this.props.isLoggedIn) {
      menu = <UserMenu username={this.props.username} />
    } else {
      menu = <GuestMenu />
    }

    // nav's elements className
    let navClassName = "bar bar--sm bar-1"
    if (!this.state.showMenu) {
      navClassName += " hidden-xs"
    }
    // Transparent nav?
    if (this.props.transparent) {
      navClassName += ' bar--absolute bar--transparent'
    }

    let columnWidth = ["col-md-2 col-sm-3", "col-md-10 col-sm-9"]

    return (
      <div className="TopNav">
        <div className="nav-container">
          <div className="bar bar--sm visible-xs">
            <div className="container">
              <div className="row">
                <div className="col-xs-3 col-sm-2">
                  <Link to="/">
                    <img className="logo" alt="stronghold" src={logoDark} />
                  </Link>
                </div>
                <div className="col-xs-9 col-sm-10 text-right">
                  <a href="#toggleMenu" className="hamburger-toggle" data-toggle-class="#menu1;hidden-xs" onClick={ this.toggleMenu }>
                    <i className="icon icon--sm stack-interface stack-menu"></i>
                  </a>
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </div>
          {/*end bar*/}
          <nav id="menu1" className={ navClassName }>
            <div className="container">
              <div className="row">
                <div className={columnWidth[0] + " hidden-xs"}>
                  <div className="bar__module">
                    <Link to="/">
                      <img className="logo" alt="stronghold" src={logoDark} />
                    </Link>
                  </div>
                  {/*end module*/}
                </div>
                <div className={columnWidth[1] + " text-right text-left-xs"}>
                  { menu }
                </div>
              </div>
              {/*end of row*/}
            </div>
            {/*end of container*/}
          </nav>
          {/*end bar*/}
        </div>
      </div>
    );
  }
}

export default TopNav;
