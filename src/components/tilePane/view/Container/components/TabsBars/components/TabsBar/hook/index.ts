import { CSSProperties, useContext, useMemo } from 'react'
import {
  completeUnit,
  TabBarMoreProps,
  TabsBarContext,
  TileNodeRect,
  toCssLength,
  toQuadrant,
} from '../../../../../../..'
export function useTabBarStyle(
  tabBarProps: TabBarMoreProps,
  isHidden?: boolean
): { styled: CSSProperties; thickness: number } {
  const rect = tabBarProps.leaf.rect
  const tabBar = useContext(TabsBarContext)
  const { position } = tabBar
  const [isVertical, isAfter] = useMemo(() => toQuadrant(position), [position])
  const thicknessNumber = useMemo(() => {
    return (
      (tabBar.thicknessOverride
        ? tabBar.thicknessOverride(tabBarProps.leaf)
        : undefined) ?? tabBar.thickness
    )
  }, [tabBar.thickness, tabBar.thicknessOverride, tabBarProps.leaf])

  const thickness = useMemo(() => {
    return completeUnit(thicknessNumber)
  }, [thicknessNumber])

  return {
    styled: {
      visibility: isHidden ? 'hidden' : undefined,
      position: 'absolute',
      width: isVertical ? toCssLength(rect.width) : thickness,
      height: isVertical ? thickness : toCssLength(rect.height),
      top: isAfter ? undefined : toCssLength(rect.top),
      bottom: isAfter ? toCssLength(1 - rect.top - rect.height) : undefined,
      left: isAfter ? undefined : toCssLength(rect.left),
      right: isAfter ? toCssLength(1 - rect.left - rect.width) : undefined,
    },
    thickness: thicknessNumber,
  }
}
