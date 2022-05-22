import { useReducer, useCallback } from 'react'
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
import { TileId } from './constants'
import { useMapEffect } from '../hooks'

type LeftPanelProps = {
  initState: PanelState
  mapboxMap: mapboxgl.Map | undefined
}

const LeftPanel: React.FC<LeftPanelProps> = ({ initState, mapboxMap: map }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  useMapEffect(state, map)

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
              opacities={state.tileOpacities}
              onChangeCheck={(payload: { tileId: TileId; checked: boolean }) => {
                dispatch({ type: 'setTileChecked', payload })
              }}
              onChangeOpacity={(payload: { tileId: TileId; opacity: number }) => {
                dispatch({ type: 'setTileOpacity', payload })
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
