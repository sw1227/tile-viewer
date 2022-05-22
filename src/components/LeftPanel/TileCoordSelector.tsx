import {
  Text,
  VStack,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Code,
} from '@chakra-ui/react'
import { PanelState } from './reducer'

type TileSelectorProps = {
  tileCoordinate: PanelState['targetTileCoordinate']
  onChange: (payload: { z?: number; x?: number; y?: number }) => void
  onGoToTileClick: (tile: PanelState['targetTileCoordinate']) => void
}

const TileSelector: React.FC<TileSelectorProps> = ({
  tileCoordinate,
  onChange,
  onGoToTileClick,
}) => {
  return (
    <>
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
            value={tileCoordinate.z}
            onChange={(_, value) => {
              onChange({ z: value })
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
            max={2 ** tileCoordinate.z - 1}
            maxW="80px"
            size="xs"
            value={tileCoordinate.x}
            onChange={(_, value) => {
              onChange({ x: value })
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
            max={2 ** tileCoordinate.z - 1}
            maxW="80px"
            size="xs"
            value={tileCoordinate.y}
            onChange={(_, value) => {
              onChange({ y: value })
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button size="sm" ml="2" onClick={() => onGoToTileClick(tileCoordinate)}>
            Go
          </Button>
        </HStack>
      </VStack>
    </>
  )
}

export default TileSelector
