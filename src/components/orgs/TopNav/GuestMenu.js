// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'

type Props = {
}

export default function GuestMenu(props: Props) {
  return (
    <div className="TopNav__GuestMenu">
      <div className="bar__module">
        <ul className="menu-horizontal text-left">
          <li>
            <a href="https://stronghold.co/about/">About</a>
          </li>
          <li>
            <a href="https://stronghold.zendesk.com/hc/en-us" target="_blank" rel="noopener noreferrer">Help</a>
          </li>
        </ul>
      </div>
      {/*end module*/}
      <div className="bar__module">
        <Link className="btn btn--sm type--uppercase" to="/login">
          <span className="btn__text">
            Log In
          </span>
        </Link>
        <Link className="btn btn--sm btn--primary type--uppercase" to="/signup">
          <span className="btn__text">
            Sign Up
          </span>
        </Link>
      </div>
      {/*end module*/}
    </div>
  )
}
