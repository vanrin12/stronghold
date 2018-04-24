// @flow
import * as React from "react"

import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import TopNav from '../containers/TopNav'

export default function() {
  return (
    <div>
      <Helmet>
        <title>Stronghold - Page Not Found</title>
        <meta name="description" content="Stonghold - Page Not Found" />
      </Helmet>
      <TopNav />
      <div className="main-container">
        <section className="height-100 bg--dark text-center">
          <div className="container pos-vertical-center">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="h1--large">404</h1>
                <p className="lead">
                  Page not found.
                </p>
                <Link to="/">Go back to home page</Link>
              </div>
            </div>
            {/*!--end of row--*/}
          </div>
          {/*!--end of container--*/}
        </section>
      </div>
    </div>
  )
}
