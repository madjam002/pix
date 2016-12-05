import React from 'react'
import {Tree, Classes} from '@blueprintjs/core'

export default class extends React.Component {

  constructor(props) {
    super(props)

    this.state = { nodes: [] }
  }

  async componentWillMount() {
    await this.load('/', this.state.nodes)
  }

  handleNodeExpand(node) {
    node.isExpanded = true
    this.forceUpdate()

    this.load(node.path, node.childNodes)
  }

  handleNodeCollapse(node) {
    node.isExpanded = false
    this.forceUpdate()
  }

  handleNodeClick(node) {
    node.isExpanded = !node.isExpanded
    this.forceUpdate()

    this.load(node.path, node.childNodes)
  }

  async load(dir, nodes) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const dirs = await (await fetch('/fs?dir=' + dir)).json()

    nodes.length = 0

    for (const dir of dirs) {
      nodes.push({
        iconName: 'folder-close',
        label: dir.name,
        path: dir.path,
        hasCaret: true,
        childNodes: [{
          iconName: 'pt-icon-time',
          label: 'Loading',
        }],
      })
    }

    this.forceUpdate()
  }

  render() {
    return (
      <Tree
        contents={this.state.nodes}
        className={Classes.ELEVATION_0}
        onNodeExpand={this.handleNodeExpand.bind(this)}
        onNodeCollapse={this.handleNodeCollapse.bind(this)}
        onNodeClick={this.handleNodeClick.bind(this)}
      />
    )
  }

}
