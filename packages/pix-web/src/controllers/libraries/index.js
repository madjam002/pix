import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {Tree, PageWithSidebar} from 'ui'

export default compose(
  withRouter,
  connectGraph({
    query: () => gql`
      query {
        isFirstRun
        viewer {
          user {
            id
            username
          }
          libraries {
            id
            name
          }
          isAdmin
        }
      }
    `,
    renderOutdated: true,
  }),
)(props => (
  <PageWithSidebar
    sidebar={
      <Tree
        contents={genSidebar(props)}
        onNodeClick={handleNodeClick.bind(null, props.router)}
      />
    }
    page={
      props.children
    }
  />
))

const handleNodeClick = (router, node) => {
  router.push(node.href)
}

const genSidebar = props => [
  {
    iconName: 'pt-icon-flash',
    label: 'Libraries',
    isExpanded: true,
    hasCaret: true,
    href: '/libraries',
    isSelected: props.router.isActive('/libraries', true),
    childNodes: [
      ...props.viewer.libraries.map(library => ({
        iconName: 'pt-icon-media',
        label: library.name,
        href: `/libraries/${library.id}`,
        isSelected: props.router.isActive(`/libraries/${library.id}`, true),
      })),
      props.viewer.isAdmin && {
        iconName: 'pt-icon-plus',
        label: 'Add new library',
        href: '/libraries/add',
        isSelected: props.router.isActive('/libraries/add', true),
      },
    ],
  },
]
