import { Reducer } from 'react'

export type PanelState = {
  showTile: boolean
}

type Action = { type: 'toggleShowTile' }

export const reducer: Reducer<PanelState, Action> = (state, action) => {
  switch (action.type) {
    case 'toggleShowTile':
      return { ...state, showTile: !state.showTile }
  }
}
