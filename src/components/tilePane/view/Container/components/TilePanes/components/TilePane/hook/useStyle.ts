import { CSSProperties, useContext, useMemo } from 'react'
import {
  completeUnit,
  TabsBarContext,
  TileNodeRect,
  toCssCalcLength,
  toCssLength,
  toQuadrant,
} from '../../../../../../..'

function toCssLengthLocal(length: number, removeSize: number, isEdge: boolean) {
  const localRemoveSize = isEdge ? 0 : removeSize
  return `calc(${length * 100}% - ${localRemoveSize}em)`
}

function toCssCalcLengthLocal(
  length: number,
  removeSize: number,
  removeSize2: number,
  isEdge: boolean
) {
  const localRemoveSize = isEdge ? removeSize : removeSize + removeSize2
  return `calc(${toCssLength(length)} - ${localRemoveSize}em)`
}

export function useStyle(rect: TileNodeRect | null): CSSProperties {
  const tabBar = useContext(TabsBarContext)
  const { position } = tabBar
  const [isVertical, isAfter] = useMemo(() => toQuadrant(position), [position])
  const thickness = useMemo(
    () => completeUnit(tabBar.thickness),
    [tabBar.thickness]
  )
  return rect
    ? {
        position: 'absolute',
        height: isVertical
          ? toCssCalcLengthLocal(
              rect.height,
              tabBar.thickness,
              tabBar.stretchBarThickness,
              rect.top + rect.height === 1
            )
          : toCssLength(rect.height),
        width: isVertical
          ? toCssLengthLocal(
              rect.width,
              tabBar.stretchBarThickness,
              rect.left + rect.width === 1
            )
          : toCssCalcLength(rect.width, thickness, '-'),
        top:
          isVertical && !isAfter
            ? toCssCalcLength(rect.top, thickness, '+')
            : toCssLength(rect.top),
        left:
          !isVertical && !isAfter
            ? toCssCalcLength(rect.left, thickness, '+')
            : toCssLength(rect.left),
      }
    : {
        display: 'none',
      }
}
