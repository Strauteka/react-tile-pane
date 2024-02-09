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
  console.log('insertPane! TARGET', target, into)
  const { leaves, branches } = nodes
  const isNext = typeof into === 'number' ? false : next.includes(into)
  const isBrother = typeof into === 'number' ? false : isSegment(target, into)
  const isRow = typeof into === 'number' ? false : row.includes(into)
  console.log('insertPane!', pane, preBox)
  if (isTileLeaf(target)) {
    const leaf =
      leaves.find((it) => it === target) || leaves.find((notUsed) => true)
    if (leaf) {
      console.log('insertPane!')
      if (into === 'center') {
        console.log('insertPane!')
        const newChildren = leaf.children.slice()
        newChildren.push(pane)
        leaf.setChildren(newChildren)
        // leaf.setCharacteristic(characteristic)
        leaf.onTab = leaf.children.length - 1
      } else if (preBox.tab) {
        console.log('insertPane! 3')
        const newChildren = leaf.children.slice()
        const index = preBox.tab.into + (preBox.tab.hasNext ? 1 : 0)
        newChildren.splice(index, 0, pane)
        leaf.setChildren(newChildren)
        leaf.onTab = index
      } else {
        console.log('insertPane! isBrother')
        isBrother
          ? segment(target, pane, isNext, characteristic)
          : fission(target, pane, isNext, isRow, characteristic)
      }
    }
  } else {
    console.log('insertPane! 2')
    const branch = branches.find((it) => it === target)
    if (branch) {
      console.log('insertPane! 2123')
      fission(target, pane, isNext, isRow, characteristic)
    }
  }
}

/** 分割 ——插入同级节点 */
function segment(
  node: TileBranch | TileLeaf,
  pane: PaneName,
  isNext: boolean,
  characteristic?: TileCharacteristic
) {
  const { parent } = node
  if (!parent) return
  const grow = node.grow / 2
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
  parent.setChildren(newNodes)
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

  console.log('insertPane! fission',parent, grow)
  if (!parent) {
    const newLeaf: TileLeafSubstance = {
      characteristic,
      grow: grow,
      children: [pane],
    }
    const oldLeaf: TileBranchSubstance | TileLeafSubstance = isTileLeaf(node)
      ? node.dehydrate()
      : node.dehydrate()

    if (substanceHasPane(oldLeaf, pane)) return
    if (!isTileLeaf(node)) {
      node.isRow = isRow
      node.setChildren(isNext ? [oldLeaf, newLeaf] : [newLeaf, oldLeaf])
    }
    return
  }
  const brother = parent.children.filter((it) => it !== node)
  if (brother.some((it) => hasPane(it, pane))) return

  const newLeaf: TileLeafSubstance = {characteristic, grow, children: [pane] }
  const branch: TileBranchSubstance = {
    grow,
    isRow,
    children: isNext ? [node, newLeaf] : [newLeaf, node],
  }
  const newNodes = replaceInArray<TileBranchSubstance | TileLeafSubstance>(
    parent?.children,
    node,
    branch
  )
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
