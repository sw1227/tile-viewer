import { useEffect, useReducer } from 'react'
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
import TileSelector from './TileSelector'

type LeftPanelProps = {
  initState: PanelState
  onChange: (state: PanelState) => void
  onGoToTileClick: (tile: PanelState['targetTileCoordinate']) => void
}

const LeftPanel: React.FC<LeftPanelProps> = ({ initState, onChange, onGoToTileClick }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  useEffect(() => onChange(state), [state])

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
            <p>one!</p>
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
                <TileSelector
                  tileCoordinate={state.targetTileCoordinate}
                  onChange={(payload: { z?: number; x?: number; y?: number }) => {
                    dispatch({ type: 'setTargetTile', payload })
                  }}
                  onGoToTileClick={onGoToTileClick}
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
