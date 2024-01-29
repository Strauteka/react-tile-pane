import { CSSProperties, useContext, useMemo } from 'react'
import {
  completeUnit,
  TabsBarContext,
  TileNodeRect,
  toCssCalcLength,
  toCssLength,
  toQuadrant,
} from '../../../../../../..'

// `${length * 100}%`dafd
export function toCssLengthLocal(
  length: number,
  offset: number,
  borderOffset: number,
  isEdge: boolean
) {
  return isEdge
    ? `calc(${length * 100}% - ` + offset + 'px )'
    : `calc(${length * 100}% - ` + (offset + borderOffset) + 'px )'
}

export function toCssCalcLengthLocal(
  percent: number,
  offset: number,
  offset2: number,
  isEdge: boolean
) {
  const localOffset = isEdge ? offset : offset + offset2
  return `calc(${toCssLength(percent)} - ${localOffset}px)`
}

export function useStyle(rect: TileNodeRect | null): CSSProperties {
  const tabBar = useContext(TabsBarContext)
  const { position } = tabBar
  const [isVertical, isAfter] = useMemo(() => toQuadrant(position), [position])
  const thickness = useMemo(
    () => completeUnit(tabBar.thickness),
    [tabBar.thickness]
  )

  const result = rect
    ? {
        position: 'absolute',
        height: isVertical
          ? toCssCalcLengthLocal(
              rect.height,
              tabBar.thickness + tabBar.borderThickness,
              tabBar.stretchBarThickness,
              rect.top + rect.height === 1
            )
          : toCssLength(rect.height),
        width: isVertical
          ? toCssLengthLocal(
              rect.width,
              tabBar.stretchBarThickness,
              tabBar.borderThickness,
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
  return result as CSSProperties
}
