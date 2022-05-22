import { useState, useEffect, useCallback } from 'react'
import mapboxgl, { MapboxOptions } from 'mapbox-gl'
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

const useMap = (options: MapboxOptions) => {
  const [mapboxMap, setMap] = useState<mapboxgl.Map>()
  useEffect(() => {
    setMap(new mapboxgl.Map(options))
  }, [])

  return [mapboxMap, setMap] as const
}

const useToggle = (initState = false) => {
  const [state, setState] = useState(initState)
  const toggle = useCallback(() => setState((state) => !state), [])
  return [state, toggle] as const
}

const MapView = () => {
  const [map, setMap] = useMap(initOptions)
  const [showTile, setShowTile] = useToggle()

  useEffect(() => {
    if (map) map.showTileBoundaries = showTile
  }, [map, showTile])

  return (
    <>
      <div id="mapbox" />
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
                <Switch id="show-tile" onChange={setShowTile} isChecked={showTile} />
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default MapView
