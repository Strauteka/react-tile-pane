import { TileBranch, TileBranchSubstance } from '..'

export function createTileBranch(sub: TileBranchSubstance) {
  const { isRow, children, id, grow, characteristic } = sub
  return new TileBranch(
    isRow,
    children,
    id,
    null,
    grow,
    undefined,
    characteristic || {}
  )
}
