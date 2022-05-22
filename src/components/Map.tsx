import { useState, useEffect } from 'react'
import mapboxgl, { MapboxOptions } from 'mapbox-gl'
import { Box } from '@chakra-ui/react'

const initOptions: MapboxOptions = {
  // token: only for public usage (URL restricted)
  accessToken: "pk.eyJ1Ijoic3cxMjI3IiwiYSI6ImNrbngyazRhcjBtY3Iyd3RnODhjbDhscWsifQ.6Uc-Lboqa0WhZbnnFJWFSA",
  container: 'mapbox',
  style: 'mapbox://styles/mapbox/light-v10',
  localIdeographFontFamily: 'sans-serif',
  center: new mapboxgl.LngLat(139.744, 35.72),
  zoom: 12,
} as const

const useMap = (options: MapboxOptions) => {
  const [map, setMap] = useState<mapboxgl.Map>()
  useEffect(() => {
    setMap(new mapboxgl.Map(options))
  }, [])

  return [map, setMap]
};

const MapView = () => {
  const [map, setMap] = useMap(initOptions)

  return (
    <>
      <div id="mapbox" />
      <Box position='absolute' left='0' top='0' bg='white' boxShadow='md' w='350px' h='100vh' overflow='scroll' p={4} color='white'>
        This is the Box
      </Box>
    </>
  )
}

export default MapView
