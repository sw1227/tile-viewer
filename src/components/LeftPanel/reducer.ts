import { Reducer } from 'react'
import { TileId } from './constants'

export type PanelState = {
  showTile: boolean // set map.showTileBoundaries or not
  targetTileCoordinate: {
    z: number
    x: number
    y: number
  }
  selectedTiles: { [key in TileId]?: boolean }
}

type Action =
  | { type: 'toggleShowTile' }
  | { type: 'setTargetTile'; payload: { z?: number; x?: number; y?: number } }
  | { type: 'setTileChecked'; payload: { tileId: TileId; checked: boolean } }

export const reducer: Reducer<PanelState, Action> = (state, action) => {
  switch (action.type) {
    case 'toggleShowTile':
      return { ...state, showTile: !state.showTile }
    case 'setTargetTile':
      const updates = action.payload
      const oldTile = state.targetTileCoordinate
      // If z is updated, update x and y to its (grand) parent/child
      if (updates.z) {
        const scale = 2 ** (updates.z - oldTile.z)
        updates.x = Math.floor(scale * oldTile.x)
        updates.y = Math.floor(scale * oldTile.y)
      }
      return {
        ...state,
        targetTileCoordinate: { ...oldTile, ...updates },
      }
    case 'setTileChecked':
      return {
        ...state,
        selectedTiles: { ...state.selectedTiles, [action.payload.tileId]: action.payload.checked },
      }
  }
}
