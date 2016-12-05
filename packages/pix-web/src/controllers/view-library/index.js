import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
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
  }),
)(({ library, params }) => (
  <div>
    <h1>{library.name}</h1>

    <Button onClick={actions.indexLibrary.bind(null, library.id)} text="Index" />

    <Gallery items={library.items} libraryId={library.id} />
  </div>
))
