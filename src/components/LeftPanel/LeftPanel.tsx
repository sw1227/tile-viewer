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
} from '@chakra-ui/react'
import { PanelState, reducer } from './reducer'

type LeftPanelProps = {
  initState: PanelState
  onChange: (state: PanelState) => void
}

const LeftPanel: React.FC<LeftPanelProps> = ({ initState, onChange }) => {
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
          <Tab>Tile</Tab>
          <Tab>Coordinate</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="show-tile" mb="0">
                Show tile coordinate?
              </FormLabel>
              <Switch
                id="show-tile"
                onChange={() => {
                  dispatch({ type: 'toggleShowTile' })
                }}
                isChecked={state.showTile}
              />
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LeftPanel
