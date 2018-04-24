// @flow
import * as React from "react"

import Helmet from 'react-helmet'

import TopNav from '../containers/TopNav'

export default function() {
  return (
    <div>
      <Helmet>
        <title>Stronghold - Maintenance</title>
        <meta name="description" content="Stonghold - Maintenance" />
      </Helmet>
      <TopNav />
      <div className="main-container">
        <section className="height-100 bg--dark text-center">
          <div className="container pos-vertical-center">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="h1--large">Maintenance</h1>
                <p className="lead">
                  Stronghold is undergoing planned maintenance from 4pm PST to 10pm PST. Check <a href="https://twitter.com/strongholdxchg" target="_blank" rel="noopener noreferrer">https://twitter.com/strongholdxchg</a> for updates.
                </p>
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
