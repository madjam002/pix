import React from 'react'
import cx from 'classnames'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {CollapsibleList, Classes, MenuItem} from 'ui'

import Gallery from './gallery'

const renderBreadcrumb = props => {
  if (props.href != null) {
    return <a className={Classes.BREADCRUMB}>{props.text}</a>
  } else {
    return <span className={cx(Classes.BREADCRUMB, Classes.BREADCRUMB_CURRENT)}>{props.text}</span>
  }
}

export default compose(
  withRouter,
  connectGraph({
    query: () => gql`
      query($libraryId: ID!, $path: String!) {
        folderByPath(libraryId: $libraryId, path: $path) {
          id
          name
          path
          library {
            id
            name
          }
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
      path: props.params.splat,
    }),
  }),
)(({ folderByPath: folder, params }) => (
  <div>
    <CollapsibleList
      className={Classes.BREADCRUMBS}
      dropdownTarget={<span className={Classes.BREADCRUMBS_COLLAPSED} />}
      renderVisibleItem={renderBreadcrumb}
      visibleItemCount={5}
    >
      <MenuItem href="/" text={folder.library.name} />
      {folder.path.split('/').map((pathPart, index) =>
        <MenuItem key={index} href="/" text={pathPart} />
      )}
    </CollapsibleList>

    <Gallery items={folder.items} libraryId={folder.library.id} />
  </div>
))
