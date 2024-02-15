import { useContext, useMemo } from 'react'
import {
  ContainerRectContext,
  TileBranchesContext,
  TileLeavesContext,
  TabsBarContext,
  absolute2Relative,
  TitleRectsContext,
  Vector2,
} from '../../../..'
import { useThrottleFn } from '../../../hook'
import { calcLeafWithTitleRect, calcPreBox } from '../util'
import { TileCharacteristic } from 'components/tilePane/model'

export function useCalcPreBox(
  position: Vector2,
  throttle?: number,
  characteristic?: TileCharacteristic
) {
  const containerRect = useContext(ContainerRectContext)
  const branches = useContext(TileBranchesContext)
  const leaves = useContext(TileLeavesContext)
  const { preBox: preBoxInTabBar } = useContext(TabsBarContext)
  const titleRects = useContext(TitleRectsContext)

  const leafWithTitleRects = calcLeafWithTitleRect(titleRects, leaves)

  const innerPosition = useMemo(
    () => absolute2Relative(containerRect, ...position),
    [containerRect, position]
  )

  const calcLazyPreBox = useThrottleFn(calcPreBox, throttle)
  const paneWithPreBox = useMemo(
    () =>
      calcLazyPreBox(
        branches,
        leaves,
        leafWithTitleRects,
        innerPosition,
        preBoxInTabBar,
      ),
    [
      branches,
      calcLazyPreBox,
      innerPosition,
      leafWithTitleRects,
      leaves,
      preBoxInTabBar,
    ]
  )
  return { paneWithPreBox, leafWithTitleRects }
}
