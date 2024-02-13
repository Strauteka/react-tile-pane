import { TileStore } from '../..'
import {
  MovingTab,
  removeInArray,
  TileBranch,
  TileLeaf,
  unfold,
} from '../../../..'

export function startMovingTab(
  { movingTabs, leaves, branches, rootNode }: TileStore,
  tabToStopMoving: Pick<MovingTab, 'name' | 'leaf'>,
  notMoving?: boolean
): TileStore {
  const newMovingTabs = movingTabs.slice()
  const { name } = tabToStopMoving
  const existedTab = newMovingTabs.find((it) => (it.name = name))

  const leafIndex = leaves.findIndex((l) => l === tabToStopMoving.leaf)
  const leaf = leaves.find((l) => l.children.includes(name))
  const tabIndex = leaf?.children.findIndex((it) => it === name) ?? 0
  if (leaf) {
    const newChildren = removeInArray(leaf.children, name)
    leaf.onTab =
      leaf.onTab != tabIndex
        ? tabIndex < leaf.onTab
          ? leaf.onTab - 1
          : leaf.onTab
        : newChildren.length - 1
    leaf.setChildren(newChildren)

    if (leaf.parent && leaf.parent.children.length > 0) {
      leaf.parent.children.forEach((child) => {
        if (child.children.length == 0) {
          removeNode(branches, child)
        }
      })
    }
  }
  if (!notMoving && !existedTab) {
    newMovingTabs.push({ ...tabToStopMoving, tabIndex, leafIndex })
  }

  const nodes = unfold(rootNode)
  return {
    movingTabs: newMovingTabs,
    rootNode,
    ...nodes,
  }
}

export function removeNode(
  branches: TileBranch[],
  node: TileLeaf | TileBranch
) {
  const parent = branches.find((it) => it === node.parent)
  if (parent) {
    const newChildren = removeInArray(
      parent.children,
      (it) => it.id === node.id
    )
    //does not go into recursive, if parent dont have parent
    if (newChildren.length === 0 && parent.parent != null) {
      removeNode(branches, parent)
    } else {
      parent.setChildren(newChildren)
    }
  }
}
