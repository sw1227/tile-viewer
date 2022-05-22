import mapboxgl, { MapboxOptions } from 'mapbox-gl'
import { useState, useEffect } from 'react'

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
    <div id="mapbox" />
  )
}

export default MapView
