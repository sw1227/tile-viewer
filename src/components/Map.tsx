import { useState, useEffect } from 'react'
import mapboxgl, { MapboxOptions } from 'mapbox-gl'
import LeftPanel from './LeftPanel/LeftPanel'
import { PanelState } from './LeftPanel/reducer'

const initOptions: MapboxOptions = {
  // token: only for public usage (URL restricted)
  accessToken:
    'pk.eyJ1Ijoic3cxMjI3IiwiYSI6ImNrbngyazRhcjBtY3Iyd3RnODhjbDhscWsifQ.6Uc-Lboqa0WhZbnnFJWFSA',
  container: 'mapbox',
  style: 'mapbox://styles/mapbox/light-v10',
  localIdeographFontFamily: 'sans-serif',
  center: new mapboxgl.LngLat(139.744, 35.72),
  zoom: 12,
} as const

const initPanelState: PanelState = {
  showTile: false,
  targetTileCoordinate: { z: 12, x: 3638, y: 1612 },
  selectedTiles: {},
}

const useMap = (options: MapboxOptions) => {
  const [mapboxMap, setMap] = useState<mapboxgl.Map>()
  useEffect(() => {
    setMap(new mapboxgl.Map(options))
  }, [])

  return [mapboxMap, setMap] as const
}

const MapView = () => {
  const [map, setMap] = useMap(initOptions)

  return (
    <>
      <div id="mapbox" />
      <LeftPanel initState={initPanelState} mapboxMap={map} />
    </>
  )
}

export default MapView
