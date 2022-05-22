import { useState, useEffect } from 'react'
import mapboxgl, { MapboxOptions } from 'mapbox-gl'
import { TileId, TILE_CATALOG } from './LeftPanel/constants'
import { PanelState } from './LeftPanel/reducer'

export const useMap = (options: MapboxOptions) => {
  const [mapboxMap, setMap] = useState<mapboxgl.Map>()
  useEffect(() => {
    setMap(new mapboxgl.Map(options))
  }, [])

  return [mapboxMap, setMap] as const
}

export const useMapEffect = (state: PanelState, map?: mapboxgl.Map) => {
  useEffect(() => {
    // Update raster layers
    Object.entries(state.selectedTiles).forEach(([tileId, checked]) => {
      if (checked) {
        // Add source and layer if not exist
        if (!map?.getSource(tileId)) {
          map?.addSource(tileId, {
            type: 'raster',
            tiles: [TILE_CATALOG[tileId as TileId].url],
            tileSize: 256,
            minzoom: 4,
            maxzoom: 16,
            attribution:
              '地理院タイル(色別標高図の海域部は海上保安庁海洋情報部の資料を使用して作成)',
          })
        }
        if (!map?.getLayer(tileId)) {
          map?.addLayer({
            id: tileId,
            type: 'raster',
            source: tileId,
            paint: { 'raster-opacity': state.tileOpacities[tileId as TileId] || 0.5 },
          })
        }
      } else {
        // Remove layer if exists (source is not removed)
        if (map?.getLayer(tileId)) {
          map?.removeLayer(tileId)
        }
      }
    })
  }, [map, state.selectedTiles])

  useEffect(() => {
    // Update boundary setting
    if (map) map.showTileBoundaries = state.showTile
  }, [map, state.showTile])

  useEffect(() => {
    Object.entries(state.tileOpacities).forEach(([tileId, opacity]) => {
      // Update layer opacity if layer exists
      if (map?.getLayer(tileId)) {
        map?.setPaintProperty(tileId, 'raster-opacity', opacity)
      }
    })
  }, [map, state.tileOpacities])
}
