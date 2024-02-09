import { createTileBranch, TileBranchSubstance, unfold } from '../../..'

export function initRootNode(rootNodeSub: TileBranchSubstance) {
  const rootNode = createTileBranch(rootNodeSub)
  const nodes = unfold(rootNode)
  console.log('abc1, ', rootNodeSub)
  console.log('abc2, ', rootNode)
  console.log('abc3, ', nodes)
  return { rootNode, ...nodes }
}
