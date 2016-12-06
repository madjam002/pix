import React from 'react'
import {Link} from 'react-router'
import {ContextMenuTarget, Menu, MenuItem, MenuDivider} from 'ui'
import calculateLayout from './calculate-layout'

export default class extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
    this.state = { rowToRender: 0 }

    this.rows = []
    this.rowCoordinates = []
    this.totalHeight = 0
  }

  componentDidMount() {
    this.calculate(this.props)
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(nextProps) {
    this.calculate(nextProps)
  }

  calculate(props) {
    const media = props.items.map(item => ({
      ...item,
      url: `/libraries/${props.libraryId}/${item.path}`,
      color: item.color || '#202B33',
      width: item.width || 100,
      height: item.height || 100,
      thumbnail: item.thumbnail,
    }))

    console.log('Got', this.refs.container.scrollWidth)

    this.rows = toViewportSize(this.refs.container.scrollWidth, calculateLayout(media))

    this.rowCoordinates = []

    this.totalHeight = this.rows.reduce((currHeight, row) => {
      this.rowCoordinates.push(currHeight)
      if (row.items[0])
        return currHeight + row.items[0].height + 4
      return currHeight
    }, 0)

    this.forceUpdate()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const offset = document.body.scrollTop

    let rowIndex = 0, rowOffset = 0

    for (let i = 0; i < this.rowCoordinates.length; i++) {
      if (this.rowCoordinates[i] > offset) {
        rowIndex = i
        break
      }
    }

    this.setState({ rowToRender: rowIndex })
  }

  renderRows(offset) {
    const rowElements = []
    for (let i = Math.max(0, offset - 7); i < offset + 15; i++) {
      const row = this.rows[i]
      if (!row) continue
      const offset = this.rowCoordinates[i]

      rowElements.push(
        <Row key={i} offset={offset}>
          {row.items.map(({ item, width, height}) =>
            <Thumbnail key={item.id} {...item} item={item} width={width} height={height} actualWidth={item.width} actualHeight={item.height} />
          )}
        </Row>
      )
    }

    return rowElements
  }

  render() {
    const rows = this.rows

    return (
      <div ref="container" className="container" style={{ position: 'relative', height: this.totalHeight }}>
        {this.renderRows(this.state.rowToRender)}
      </div>
    )
  }
}

@ContextMenuTarget
class Thumbnail extends React.PureComponent {
  renderContextMenu() {
    return (
      <Menu>
        <MenuItem text="View" iconName="pt-icon-maximize" />
        <MenuItem text="Select" iconName="pt-icon-tick" />
        <MenuDivider />
        <MenuItem text="Download" iconName="pt-icon-cloud-download" href={`/download?id=${this.props.id}`} />
        <MenuDivider />
        <MenuItem text="Delete" iconName="pt-icon-trash" />
      </Menu>
    )
  }

  render() {
    const props = this.props

    return (
      <Link to={props.url}>
        <div style={{ ...styles.thumb, width: props.width, height: props.height, backgroundColor: props.color, backgroundImage: `url(${props.thumbnail})` }}>
          {props.item.__typename === 'Folder' && (
            <div style={styles.thumbnailTitleContainer}>{props.item.name}</div>
          )}
        </div>
      </Link>
    )
  }
}

const Row = props => (
  <div style={{ ...styles.row, height: props.height, top: props.offset }}>
    {props.children}
  </div>
)

const styles = {
  container: {
  },
  thumb: {
    width: 100,
    height: 100,
    position: 'relative',
    float: 'left',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    margin: 2,
  },
  thumbNew: {
    float: 'left',
  },
  thumbnailTitleContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)',
    color: 'white',
    fontSize: 18,
    padding: 12,
    paddingTop: 100,
  },
  row: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
}

const toViewportSize = (width, rows) => {
  const viewportWidth = width - 20 // TODO figure out why this margin is necessary

  return rows.map(row => ({
    ...row,
    items: row.items.map(({ item, width, height}) => ({
      item,
      width: width * viewportWidth,
      height: height * viewportWidth,
    })),
  }))
}
