import React from 'react'
import {gql, connectGraph} from 'react-graphql'

import {JobsPopoverMenuItem} from 'controllers/jobs-popover'

export default connectGraph({
  query: () => gql`
    query {
      isFirstRun
      viewer {
        user {
          id
          username
        }
      }
    }
  `,
})(props => (
  <div>
    <nav className="pt-navbar pt-fixed-top pt-dark">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Pix</div>
      </div>
      <div className="pt-navbar-group pt-align-right">
        <button className="pt-button pt-minimal pt-icon-user">{props.viewer.user.username}</button>
        <JobsPopoverMenuItem />
      </div>
    </nav>

    <div style={{ marginTop: 100, marginLeft: 16, marginRight: 16 }}>
      {props.children}
    </div>
  </div>
))
