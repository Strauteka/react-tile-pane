import { TileStore } from '../..'
import { Into, PaneWithPreBox } from '../../..'
import {
  PaneName,
  removeInArray,
  unfold,
  isTileLeaf,
  TileBranch,
  TileLeaf,
  TileLeafSubstance,
  TileBranchSubstance,
  replaceInArray,
  TileCharacteristic,
} from '../../../..'
import { removeNode } from './startMovingTab'

export type TabToStopMoving = {
  pane: PaneName
  preBox?: PaneWithPreBox
  characteristic?: TileCharacteristic
}

export function stopMovingTab(
  { movingTabs, ...rest }: TileStore,
  { pane, preBox, characteristic }: TabToStopMoving
): TileStore {
  const newMovingTabs = removeInArray(movingTabs, (it) => (it.name = pane))
  if (preBox) {
    const { rootNode } = rest
    insertPane(pane, preBox, rest, characteristic)
    const nodes = unfold(rootNode)
    return { movingTabs: newMovingTabs, rootNode, ...nodes }
  } else return { movingTabs: newMovingTabs, ...rest }
}

const next: Into[] = ['right', 'bottom']
const row: Into[] = ['right', 'left']

function insertPane(
  pane: PaneName,
  preBox: PaneWithPreBox,
  nodes: Pick<TileStore, 'branches' | 'leaves'>,
  characteristic?: TileCharacteristic
) {
  // const { targetNode: node, into } = preBox
  const node = preBox.leaf ?? preBox.branch ?? preBox.tab
  if (!node) return
  const { target, into } = node
  const { leaves, branches } = nodes
  const isNext = typeof into === 'number' ? false : next.includes(into)
  const isBrother = typeof into === 'number' ? false : isSegment(target, into)
  const isRow = typeof into === 'number' ? false : row.includes(into)
  if (!(target instanceof TileBranch)) {
    const leaf =
      leaves.find((it) => it === target) || leaves.find((notUsed) => true)
    if (leaf) {
      if (into === 'center') {
        const newChildren = leaf.children.slice()
        newChildren.push(pane)
        leaf.setChildren(newChildren)
        // leaf.setCharacteristic(characteristic)
        leaf.onTab = leaf.children.length - 1
      } else if (preBox.tab) {
        const newChildren = leaf.children.slice()
        const index = preBox.tab.into + (preBox.tab.hasNext ? 1 : 0)
        newChildren.splice(index, 0, pane)
        leaf.setChildren(newChildren)
        leaf.onTab = index
      } else {
        isBrother
          ? segment(branches, target, pane, isNext, characteristic)
          : fission(target, pane, isNext, isRow, characteristic)
      }
    }
  } else {
    const branch = branches.find((it) => it === target)
    if (branch) {
      fission(target, pane, isNext, isRow, characteristic)
    }
  }
}

/** 分割 ——插入同级节点 */
function segment(
  branches: TileBranch[],
  node: TileBranch | TileLeaf,
  pane: PaneName,
  isNext: boolean,
  characteristic?: TileCharacteristic
) {
  const { parent } = node
  if (!parent) return
  const grow = characteristic?.grow || node.grow / 2
  const leaf: TileLeafSubstance = { characteristic, grow, children: [pane] }
  node.grow = grow
  const indexInParent = parent.children.findIndex((it) => it === node)
  const index = isNext ? indexInParent + 1 : indexInParent
  const newNodes: (TileBranchSubstance | TileLeafSubstance)[] =
    parent.children.slice()
  if (
    newNodes.find(({ children }) => {
      if (children instanceof Array) return children.includes(pane as any)
      return children === pane
    })
  )
    return
  newNodes.splice(index, 0, leaf)

  if (parent.parent && parent.parent.children.length == 1) {
    parent.parent.setChildren([parent, ...newNodes])
    parent.parent.isRow = parent.isRow
    parent.parent.grow = parent.grow
    removeNode(branches, parent)
  } else {
    parent.setChildren(newNodes)
  }
}

/** 分裂 ——插入子级节点*/
function fission(
  node: TileBranch | TileLeaf,
  pane: PaneName,
  isNext: boolean,
  isRow: boolean,
  characteristic?: TileCharacteristic
) {
  const { parent, grow } = node
  if (!parent) {

    const newLeafGrow = characteristic?.grow ?? 1
    const newLeaf: TileLeafSubstance = {
      characteristic,
      grow: newLeafGrow,
      children: [pane],
    }
    const oldLeaf: TileBranchSubstance | TileLeafSubstance = isTileLeaf(node)
      ? node.dehydrate()
      : node.dehydrate()
    //if leaf already has this pane
    if (substanceHasPane(oldLeaf, pane)) return
    if (node instanceof TileBranch) {
      node.isRow = isRow
      const childrenCount = node.children.length <= 1
      let ch: GrowRequireType[] = []
      if (childrenCount) {
     
        ch = isNext ? [...node.children, newLeaf] : [newLeaf, ...node.children]
        if (newLeafGrow != 1 && ch.length == 1) {
          ch = isNext
            ? [{ grow: 1 - newLeafGrow, children: [] }, newLeaf]
            : [newLeaf, ...node.children]
        }
      } else {
        ch = isNext ? [oldLeaf, newLeaf] : [newLeaf, oldLeaf]
      }
      const calcGrow = calcChildGrowsOnAddRoot(ch) as (
        | TileBranchSubstance
        | TileLeafSubstance
      )[]
      node.setChildren(calcGrow)
    }
    return
  }

  const brother = parent.children.filter((it) => it !== node)
  if (brother.some((it) => hasPane(it, pane))) return

  const newLeaf: TileLeafSubstance = { characteristic, grow, children: [pane] }
  const parentChildrenCount = parent.children.length <= 1
  const branch: TileBranchSubstance | TileLeafSubstance = parentChildrenCount
    ? newLeaf
    : {
        grow,
        isRow,
        children: isNext ? [node, newLeaf] : [newLeaf, node],
      }

  if (parentChildrenCount) {
    parent.isRow = isRow
  }
  const newNodes = !isTileLeaf(branch)
    ? replaceInArray<TileBranchSubstance | TileLeafSubstance>(
        parent.children,
        node,
        branch
      )
    : [
        ...(isNext
          ? [...parent.children, newLeaf]
          : [newLeaf, ...parent.children]),
      ]
  parent.setChildren(newNodes)
}

function isSegment(node: TileBranch | TileLeaf, into: Into): boolean {
  const isRow = node.parent?.isRow
  const segmentInto: Into[] = isRow ? ['left', 'right'] : ['top', 'bottom']
  return segmentInto.includes(into)
}

function hasPane(node: TileBranch | TileLeaf, pane: PaneName): boolean {
  if (isTileLeaf(node)) return node.children.includes(pane)
  return node.children.some((it) => hasPane(it, pane))
}

function substanceHasPane(
  substance: TileBranchSubstance | TileLeafSubstance,
  pane: PaneName
): boolean {
  if (substance.children instanceof Array)
    return substance.children.some((it) => {
      if (typeof it === 'object') return substanceHasPane(it, pane)
      return it === pane
    })
  return substance.children === pane
}

type GrowRequireType = { grow?: number; characteristic?: { grow?: number } }
export function calcChildGrowsOnAddRoot<T extends GrowRequireType>(children: T[]): T[] {
  const growsSolid = children.map((c) => ({
    grow: c.grow ?? 1,
    desiredGrow: c.characteristic?.grow,
  }))
  const desiredSum = growsSolid.reduce((s, n) => (s += n.desiredGrow ?? 0), 0)
  const growSum = growsSolid.reduce(
    (s, n) => (s += n.desiredGrow ? 0 : n.grow),
    0
  )
  const koef = growSum / (1 - desiredSum)
  const grows = growsSolid.map((c) => c.desiredGrow ?? c.grow / koef)
  return children.map((child, i) => {
    child.grow = grows[i]
    return child
  })
}
