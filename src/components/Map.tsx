import { useState, useEffect, useCallback } from 'react'
import mapboxgl, { MapboxOptions } from 'mapbox-gl'
import LeftPanel from './LeftPanel/LeftPanel'
import { PanelState } from './LeftPanel/reducer'
import { tileToBBOX } from '@mapbox/tilebelt'

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

  const handleChange = useCallback(
    (state: PanelState) => {
      if (map) map.showTileBoundaries = state.showTile
    },
    [map],
  )

  const moveToTileCoord = useCallback(
    (tile: PanelState['targetTileCoordinate']) => {
      const [w, s, e, n] = tileToBBOX([tile.x, tile.y, tile.z])
      map?.fitBounds([
        [w, s],
        [e, n],
      ])
    },
    [map],
  )

  return (
    <>
      <div id="mapbox" />
      <LeftPanel
        initState={initPanelState}
        onChange={handleChange}
        onGoToTileClick={moveToTileCoord}
      />
    </>
  )
}

export default MapView
