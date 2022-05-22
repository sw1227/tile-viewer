import {
  Image,
  VStack,
  Box,
  HStack,
  StackDivider,
  Heading,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react'
import { TILE_CATALOG, TileId } from './constants'

type TileTabProps = {
  selectedTiles: { [key in TileId]?: boolean }
  opacities: { [key in TileId]?: number }
  onChangeCheck: (payload: { tileId: TileId; checked: boolean }) => void // TODO: rename
  onChangeOpacity: (payload: { tileId: TileId; opacity: number }) => void
}

const TileTab: React.FC<TileTabProps> = ({
  selectedTiles,
  opacities,
  onChangeCheck,
  onChangeOpacity,
}) => {
  const tile = { z: 12, x: 3638, y: 1612 }
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />}>
      {(Object.keys(TILE_CATALOG) as TileId[]).map((tileId) => {
        const tileUrl = TILE_CATALOG[tileId].url
          .replace('{z}', String(tile.z))
          .replace('{x}', String(tile.x))
          .replace('{y}', String(tile.y))
        const isChecked = selectedTiles[tileId]
        return (
          <HStack align="stretch" key={tileId}>
            <Image boxSize="128px" objectFit="cover" src={tileUrl} shadow="lg" />
            <Box w="150px">
              <Checkbox
                isChecked={isChecked}
                onChange={(e) => {
                  onChangeCheck({ tileId, checked: e.target.checked })
                }}
              >
                <Heading size="xs">{TILE_CATALOG[tileId].name}</Heading>
              </Checkbox>
              {!isChecked ? null : (
                <RangeSlider
                  value={[opacities[tileId] || 0.5]}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={([value]) => {
                    onChangeOpacity({ tileId, opacity: value })
                  }}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                </RangeSlider>
              )}
            </Box>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default TileTab
