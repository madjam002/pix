import React from 'react'
import MapBox from 'mapbox-gl/dist/mapbox-gl'
import MarkerIcon from './marker-icon.png'

const mapStyle = {
  width: 350,
  height: 170,
  overflow: 'hidden',
}

export class Map extends React.Component {

  componentDidMount() {
    const { latitude, longitude } = this.props

    this.map = new MapBox.Map({
      container: this.refs.map,
      style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      center: [longitude, latitude],
      zoom: 11,
    })

    const el = document.createElement('img')
    el.className = 'map-marker'
    el.src = MarkerIcon

    this.marker = new MapBox.Marker(el)
    .setLngLat([longitude, latitude])
    .addTo(this.map)
  }

  componentWillReceiveProps(props) {
    if (props.longitude !== this.props.longitude || props.latitude !== this.props.latitude) {
      this.marker.setLngLat([props.longitude, props.latitude])
      this.map.flyTo({ center: [props.longitude, props.latitude], speed: 5 })
    }
  }

  render() {
    return <div ref="map" style={mapStyle} />
  }

}
