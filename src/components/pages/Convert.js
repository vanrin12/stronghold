// @flow
import * as React from 'react'

import Helmet from 'react-helmet'

import TopNav from '../containers/TopNav'

type Props = {
}

class Convert extends React.Component<Props> {
  render() {

    return (
      <div>
        <Helmet>
          <title>Stronghold - Convert Service</title>
          <meta name="description" content="Stonghold Security - Conversion Service" />
        </Helmet>
        <TopNav />
        <div className="container">
          <section>
            <h1>Convert Service</h1>
          </section>
        </div>
      </div>
    );
  }
}

export default Convert
