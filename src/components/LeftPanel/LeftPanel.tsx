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
  Button,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Code,
} from '@chakra-ui/react'
import { PanelState, reducer } from './reducer'

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
                <VStack>
                  <Text align="center">
                    指定したタイル座標 <Code>z/x/y </Code> へ移動
                  </Text>
                  <HStack>
                    <NumberInput
                      min={1}
                      max={20}
                      maxW="60px"
                      size="xs"
                      value={state.targetTileCoordinate.z}
                      onChange={(_, value) => {
                        dispatch({ type: 'setTargetTile', payload: { z: value } })
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      min={0}
                      max={2 ** state.targetTileCoordinate.z - 1}
                      maxW="80px"
                      size="xs"
                      value={state.targetTileCoordinate.x}
                      onChange={(_, value) => {
                        dispatch({ type: 'setTargetTile', payload: { x: value } })
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      min={0}
                      max={2 ** state.targetTileCoordinate.z - 1}
                      maxW="80px"
                      size="xs"
                      value={state.targetTileCoordinate.y}
                      onChange={(_, value) => {
                        dispatch({ type: 'setTargetTile', payload: { y: value } })
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button
                      size="sm"
                      ml="2"
                      onClick={() => onGoToTileClick(state.targetTileCoordinate)}
                    >
                      Go
                    </Button>
                  </HStack>
                </VStack>
              </Center>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LeftPanel
