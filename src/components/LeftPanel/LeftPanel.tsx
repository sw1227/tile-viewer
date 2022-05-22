import { useEffect, useReducer, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import { tileToBBOX } from '@mapbox/tilebelt'
import {
  Box,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  StackDivider,
  Center,
} from '@chakra-ui/react'
import { PanelState, reducer } from './reducer'
import TileCoordSelector from './TileCoordSelector'
import TileTab from './TileTab'
import { TileId, TILE_CATALOG } from './constants'

type LeftPanelProps = {
  initState: PanelState
  mapboxMap: mapboxgl.Map | undefined
}

const LeftPanel: React.FC<LeftPanelProps> = ({ initState, mapboxMap: map }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    // Update boundary setting
    if (map) map.showTileBoundaries = state.showTile

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
            paint: { 'raster-opacity': 0.5 }, // TODO: set by slider
          })
        }
      } else {
        // Remove layer if exists (source is not removed)
        if (map?.getLayer(tileId)) {
          map?.removeLayer(tileId)
        }
      }
    })
  }, [map, state])

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
    <Box
      position="absolute"
      left="0"
      top="0"
      bg="white"
      boxShadow="md"
      w="350px"
      h="100vh"
      overflow="scroll"
      p={4}
    >
      <Text align="center" fontSize="2xl">
        Tile viewer
      </Text>
      <Tabs>
        <TabList>
          <Tab>タイル</Tab>
          <Tab>座標</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TileTab
              selectedTiles={state.selectedTiles}
              onChange={(payload: { tileId: TileId; checked: boolean }) => {
                dispatch({ type: 'setTileChecked', payload })
              }}
            />
          </TabPanel>
          <TabPanel>
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
              <Center h="40px">
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="show-tile" mb="0">
                    タイル座標を地図上に表示
                  </FormLabel>
                  <Switch
                    id="show-tile"
                    onChange={() => {
                      dispatch({ type: 'toggleShowTile' })
                    }}
                    isChecked={state.showTile}
                  />
                </FormControl>
              </Center>
              <Center>
                <TileCoordSelector
                  tileCoordinate={state.targetTileCoordinate}
                  onChange={(payload: { z?: number; x?: number; y?: number }) => {
                    dispatch({ type: 'setTargetTile', payload })
                  }}
                  onGoToTileClick={moveToTileCoord}
                />
              </Center>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LeftPanel
