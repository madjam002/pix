import React from 'react'
import {compose} from 'recompose'
import {withRouter, Link} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {Button} from 'ui'

import Gallery from './gallery'

import * as actions from './actions'

export default compose(
  withRouter,
  connectGraph({
    query: () => gql`
      query($libraryId: ID!) {
        library(id: $libraryId) {
          id
          name
          items {
            id
            name
            path
            __typename
            ...on Folder {
              width
              height
              thumbnail
            }
            ...on MediaItem {
              width
              height
              thumbnail
              color
            }
          }
        }
      }
    `,
    variables: props => ({
      libraryId: props.params.libraryId,
    }),
    renderOutdated: true,
    refetchOnMount: true,
  }),
)(({ library, params }) => (
  <div>
    <h1>{library.name}</h1>

    <Button onClick={actions.indexLibrary.bind(null, library.id)} text="Index" />
    <Link to={`/libraries/${library.id}/settings`}><Button text="Settings" /></Link>

    <Gallery items={library.items} libraryId={library.id} />
  </div>
))
