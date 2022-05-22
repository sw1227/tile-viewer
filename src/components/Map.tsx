import { useState, useEffect, useCallback } from 'react'
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

const initPanelState: PanelState = { showTile: false }

const useMap = (options: MapboxOptions) => {
  const [mapboxMap, setMap] = useState<mapboxgl.Map>()
  useEffect(() => {
    setMap(new mapboxgl.Map(options))
  }, [])

  return [mapboxMap, setMap] as const
}

const MapView = () => {
  const [map, setMap] = useMap(initOptions)

  const handleChange = useCallback(
    (state: PanelState) => {
      if (map) map.showTileBoundaries = state.showTile
    },
    [map],
  )

  return (
    <>
      <div id="mapbox" />
      <LeftPanel initState={initPanelState} onChange={handleChange} />
    </>
  )
}

export default MapView
