import {
  Image,
  VStack,
  Box,
  HStack,
  StackDivider,
  Heading,
  // RangeSlider,
  // RangeSliderTrack,
  // RangeSliderFilledTrack,
  // RangeSliderThumb,
} from '@chakra-ui/react'
import { TILE_CATALOG } from './constants'

const TileTab = () => {
  const tile = { z: 12, x: 3638, y: 1612 }
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />}>
      {TILE_CATALOG.map(({ name, url: baseUrl }) => {
        const tileUrl = baseUrl
          .replace('{z}', String(tile.z))
          .replace('{x}', String(tile.x))
          .replace('{y}', String(tile.y))
        return (
          <HStack align="stretch" key={name}>
            <Image boxSize="128px" objectFit="cover" src={tileUrl} shadow="lg" />
            <Box w="150px">
              <Heading size="xs">{name}</Heading>
              {/* <Box>
                <RangeSlider defaultValue={[0.5]} min={0} max={1} step={0.1}>
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                </RangeSlider>
              </Box> */}
            </Box>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default TileTab
