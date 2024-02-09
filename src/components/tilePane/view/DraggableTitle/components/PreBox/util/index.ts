import {
  MovingTab,
  TabsBarConfig,
  TileBranch,
  TileLeaf,
  TileNodeRect,
  udefinedOrDefault,
} from '../../../../..'
import { PaneWithPreBox } from '../../../typings'
import { LeafWithTitleRect } from './calcLeafWithTitleRect'

const branchProportion = 0.05
const leafProportion = 0.3
export function calcPreBox(
  branches: TileBranch[],
  leaves: TileLeaf[],
  leafWithTitleRects: LeafWithTitleRect[],
  innerPosition: [number, number],
  config: TabsBarConfig['preBox']
): PaneWithPreBox | undefined {
  if (!innerPosition) return
  const [x, y] = innerPosition

  for (const { leaf, rect: titleRect, index } of leafWithTitleRects) {
    if (isInPane(titleRect, innerPosition)) {
      const isEnd = config?.isRow
        ? titleRect.left + titleRect.width / 2 < x
        : titleRect.top + titleRect.height / 2 < y
      const isNext = config?.isReverse ? !isEnd : isEnd
      return {
        tab: {
          target: leaf,
          into: index,
          hasNext: isNext,
        },
      }
    }
  }

  for (const pane of branches) {
    console.log('branches', pane)
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (pane.isRow) {
        if (
          y - top <= height * branchProportion &&
          udefinedOrDefault(pane.characteristic.movable?.top, true)
        )
          return { branch: { target: pane, into: 'top' } }
        if (
          top + height - y <= height * branchProportion &&
          udefinedOrDefault(pane.characteristic.movable?.bottom, true)
        )
          return { branch: { target: pane, into: 'bottom' } }
      } else {
        if (
          x - left <= width * branchProportion &&
          udefinedOrDefault(pane.characteristic.movable?.left, true)
        )
          return { branch: { target: pane, into: 'left' } }
        if (
          left + width - x <= width * branchProportion &&
          udefinedOrDefault(pane.characteristic.movable?.right, true)
        )
          return { branch: { target: pane, into: 'right' } }
      }
    }
  }
  console.log('ToLeaves')
  for (const pane of leaves) {
    console.log('leaves', pane)
    if (isInPane(pane.rect, innerPosition)) {
      const { left, top, width, height } = pane.rect
      if (
        x - left <= width * leafProportion &&
        udefinedOrDefault(pane.characteristic.movable?.left, true)
      )
        return { leaf: { target: pane, into: 'left' } }
      if (
        left + width - x <= width * leafProportion &&
        udefinedOrDefault(pane.characteristic.movable?.right, true)
      )
        return { leaf: { target: pane, into: 'right' } }
      if (
        y - top <= height * leafProportion &&
        udefinedOrDefault(pane.characteristic.movable?.top, true)
      )
        return { leaf: { target: pane, into: 'top' } }
      if (
        top + height - y <= height * leafProportion &&
        udefinedOrDefault(pane.characteristic.movable?.bottom, true)
      )
        return { leaf: { target: pane, into: 'bottom' } }
      if (udefinedOrDefault(pane.characteristic.movable?.center, true))
        return { leaf: { target: pane, into: 'center' } }
    }
  }
  console.log('notMatch!!!')
  const leaf = leaves
    .map((pane) => {
      return {
        pane: pane,
        allow: Object.entries({
          ...{ center: true, top: true, bottom: true, left: true, right: true },
          ...pane.characteristic.movable,
        }).find((entry: [string, boolean]) => entry[1] != null && entry[1]) as [
          string,
          boolean
        ],
      }
    })
    .filter((entry: { pane: TileLeaf; allow: [string, boolean] }) => {
      return entry.allow != null
    })
    .map((entry: { pane: TileLeaf; allow: [string, boolean] }) => {
      return { leaf: { target: entry.pane, into: entry.allow[0] as any } }
    })
    .find((notUsed) => true)

  if (leaf) {
    return leaf
  }
  //first allowed position
  const branch = branches
    .map((pane) => {
      return {
        pane: pane,
        allow: Object.entries({
          ...{ top: true, bottom: true, left: true, right: true },
          ...pane.characteristic.movable,
        }).find((entry: [string, boolean]) => entry[1] != null && entry[1]) as [
          string,
          boolean
        ],
      }
    })
    .filter((entry: { pane: TileBranch; allow: [string, boolean] }) => {
      return entry.allow != null
    })
    .map((entry: { pane: TileBranch; allow: [string, boolean] }) => {
      return { branch: { target: entry.pane, into: entry.allow[0] as any } }
    })
    .find((notUsed) => true)

  if (branch) {
    return branch
  }
}

function isInPane(position: TileNodeRect, [x, y]: [number, number]) {
  const { left, top, width, height } = position
  return left < x && x < left + width && top < y && y < top + height
}

export * from './calcBoxPosition'
export * from './calcLeafWithTitleRect'
