import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {Tree} from 'ui'

import styles from './index.less'

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
        }
      }
    `,
  }),
)(props => (
  <div className={styles.container}>
    <div className={styles.sidebar}>
      <Tree
        contents={genSidebar(props)}
        onNodeClick={handleNodeClick.bind(null, props.router)}
      />
    </div>

    <div className={styles.main}>
      {props.children}
    </div>
  </div>
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
      {
        iconName: 'pt-icon-plus',
        label: 'Add new library',
        href: '/libraries/add',
        isSelected: props.router.isActive('/libraries/add', true),
      },
    ],
  },
]
