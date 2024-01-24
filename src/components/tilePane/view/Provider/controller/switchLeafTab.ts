import { TileLeaf } from '../../..'
import { TileStore } from '../typings'

export function switchLeafTab(
  state: TileStore,
  switchLeafTab: { leaf: TileLeaf; onTab: number }
) {
  console.log('switchingtab', switchLeafTab.leaf, switchLeafTab.onTab)
  const { leaves, ...rest } = state
  const newLeaves = leaves.slice()
  const leaf = newLeaves.find((l) => l === switchLeafTab.leaf)
  if (leaf && leaf.onTab != switchLeafTab.onTab) {
    leaf.onTab = switchLeafTab.onTab
  }
  return { leaves: newLeaves, ...rest }
}
