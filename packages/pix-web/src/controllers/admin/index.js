import React from 'react'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {Tree, PageWithSidebar, Stacked, PageHeader} from 'ui'

export default compose(
  withRouter,
)(props => (
  <PageWithSidebar
    sidebar={
      <Stacked>
        <PageHeader>Admin</PageHeader>

        <Tree
          contents={genSidebar(props)}
          onNodeClick={handleNodeClick.bind(null, props.router)}
        />
      </Stacked>
    }
    page={props.children}
  />
))

const handleNodeClick = (router, node) => {
  router.push(node.href)
}

const genSidebar = props => [
  {
    label: 'Users',
    href: '/admin',
    isSelected: props.router.isActive('/admin', true),
  },
]
