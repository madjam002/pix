import React from 'react'
import cx from 'classnames'
import {compose} from 'recompose'
import {withRouter, Link} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {CollapsibleList, Classes, MenuItem} from 'ui'

import Gallery from './gallery'

const renderBreadcrumb = props => {
  if (props.href != null) {
    return <Link to={props.href} className={Classes.BREADCRUMB}>{props.text}</Link>
  } else {
    return <span className={cx(Classes.BREADCRUMB, Classes.BREADCRUMB_CURRENT)}>{props.text}</span>
  }
}

const buildBreadcrumbUrl = (pathParts, index, libraryId) =>
  `/libraries/${libraryId}/${pathParts.slice(0, index + 1).join('/')}`

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
      <MenuItem href={`/libraries/${folder.library.id}`} text={folder.library.name} />
      {folder.path.split('/').map((pathPart, index) =>
        <MenuItem key={index} href={buildBreadcrumbUrl(folder.path.split('/'), index, folder.library.id)} text={pathPart} />
      )}
    </CollapsibleList>

    <Gallery items={folder.items} libraryId={folder.library.id} />
  </div>
))
