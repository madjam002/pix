import React from 'react'
import moment from 'moment'
import {compose} from 'recompose'
import {withRouter} from 'react-router'
import {gql, connectGraph} from 'react-graphql'
import {HotkeysTarget, Hotkeys, Hotkey, Button, Map} from 'ui'

import styles from './index.less'

export default compose(
  connectGraph({
    query: () => gql`
      query($mediaId: ID!) {
        item: mediaItem(id: $mediaId) {
          id
          name
          filename
          date
          thumbnail
          width
          height
          color
          exif {
            camera
            cameraModel
            flash
            latitude
            longitude
          }
          library { id }
          folder { id, path }
          next { id, thumbnail }
          previous { id, thumbnail }
        }
      }
    `,
    variables: props => ({
      mediaId: props.params.mediaId,
    }),
  }),
  withRouter,
)(
@HotkeysTarget
class extends React.PureComponent {
  goToId(id) {
    const fromGallery = this.props.location.state != null && this.props.location.state.fromGallery
    this.props.router.replace({ pathname: `/view/${id}`, state: { fromGallery } })
  }

  close() {
    const fromGallery = this.props.location.state != null && this.props.location.state.fromGallery

    fromGallery
    ? this.props.router.goBack()
    : this.props.router.push(`/libraries/${this.props.item.library.id}/${this.props.item.folder.path}`)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id !== this.props.item.id) {
      const timeSinceImageChange = Date.now() - this.lastImageChange
      this.shouldDelayFullImageRender = timeSinceImageChange < 300

      this.lastImageChange = Date.now()
    }
  }

  render() {
    const { item } = this.props
    const exif = item.exif || {}

    return (
      <div className={styles.lightbox}>
        <div className={styles.closeButton}>
          <Button iconName="cross" className="pt-large pt-minimal" onClick={this.close.bind(this)} />
        </div>

        <div className={styles.imageContent} key={item.id}>
          {/* Background image for image in case thumbnail hasn't loaded */}
          <div className={styles.imageContainer}>
            <svg className={styles.image} style={{ width: item.width, height: item.height }} viewBox={`0 0 ${item.width} ${item.height}`}>
              <rect x={0} y={0} width={item.width} height={item.height} fill={item.color} />
            </svg>
          </div>
          {/* Low res thumbnail */}
          <div className={styles.imageContainer}>
            <img src={item.thumbnail} className={styles.image} width={item.width} height={item.height} />
          </div>
          {/* Full image (delay so that we don't render if user is quickly scrubbing through photos) */}
          <DelayedFullImageRenderer src={`${window._config.serverEndpoint}/full-img?id=${item.id}`} ignoreDelay={!this.shouldDelayFullImageRender} />

          <div className={styles.navigationControls}>
            {item.previous != null ? (
              <div onClick={() => this.goToId(item.previous.id)} role="button">
                <span className="pt-icon-standard pt-icon-chevron-left" />
              </div>
            ) : <div />}
            {item.next != null ? (
              <div onClick={() => this.goToId(item.next.id)} role="button">
                <span className="pt-icon-standard pt-icon-chevron-right" />
              </div>
            ) : <div />}
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h4 className={styles.imageTitle}>{item.name}</h4>
          </div>

          <h6>Image Information</h6>

          <table className={styles.infoTable}>
            <tbody>
              <tr>
                <th>Filename</th>
                <td>{item.filename}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{item.width} x {item.height}</td>
              </tr>
              {item.date != null && (
                <tr>
                  <th>Image date</th>
                  <td>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                </tr>
              )}
              {exifRow('Camera', exif.camera)}
              {exifRow('Camera model', exif.cameraModel)}
              {exifRow('Flash', exif.flash)}
            </tbody>
          </table>

          {exif.latitude != null && (
            <DeferRendering>
              <Map latitude={exif.latitude} longitude={exif.longitude} />
            </DeferRendering>
          )}
        </div>

        {/* Invisible thumbnails for next and previous photos to speed up loading time */}
        {item.next != null && <img className={styles.hidden} src={item.next.thumbnail} />}
        {item.previous != null && <img className={styles.hidden} src={item.previous.thumbnail} />}
      </div>
    )
  }

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global
          combo="esc"
          label="Close gallery"
          onKeyDown={() => setTimeout(() =>
            this.close()
          )}
        />
        <Hotkey
          global
          combo="right"
          label="Next photo"
          onKeyDown={() => this.props.item.next && this.goToId(this.props.item.next.id)}
        />
        <Hotkey
          global
          combo="left"
          label="Previous photo"
          onKeyDown={() => this.props.item.previous && this.goToId(this.props.item.previous.id)}
        />
      </Hotkeys>
    )
  }
})

const exifRow = (label, value) => {
  if (value) {
    return (
      <tr>
        <th>{label}</th>
        <td>{value}</td>
      </tr>
    )
  }
}

class DelayedFullImageRenderer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { shouldRender: props.ignoreDelay }
  }

  componentDidMount() {
    if (!this.props.ignoreDelay) {
      this.timeout = setTimeout(() => this.setState({ shouldRender: true }), 50) // eslint-disable-line
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    if (!this.state.shouldRender) return <div />

    return (
      <div className={styles.imageContainer}>
        <img {...this.props} className={styles.image} />
      </div>
    )
  }
}

class DeferRendering extends React.Component {
  constructor(props) {
    super(props)

    this.state = { shouldRender: false }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ shouldRender: true }), 50) // eslint-disable-line
  }

  render() {
    if (!this.state.shouldRender) return <div />

    return this.props.children
  }
}
