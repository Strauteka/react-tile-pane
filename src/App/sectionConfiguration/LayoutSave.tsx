import {
  TileBranchSubstance,
  TileLeafSubstance,
  useGetRootNode,
} from 'components'
import { makeBearerString } from './Bearer'
// todo: save default layout on button rendered in tab?
export const SaveLayout = (props: { pane: string, saveLayout: boolean  }) => {
  const getRootNode = useGetRootNode()()
  localStorage.setItem(props.pane, JSON.stringify(getRootNode))
  return <></>
}

export const getLayout = (
  pane: string,
  root: TileBranchSubstance
): TileBranchSubstance | undefined => {
  const localRoot = localStorage.getItem(pane)
  return localRoot
    ? (JSON.parse(localRoot) as TileBranchSubstance)
    : getRootLayout(root)
}

const getRootLayout = (root: TileBranchSubstance): TileBranchSubstance => {
  const rootCopy: TileBranchSubstance = JSON.parse(JSON.stringify(root))
  return getRootReplace(rootCopy) as TileBranchSubstance
}

const getRootReplace = <
  T extends TileBranchSubstance | TileLeafSubstance | string
>(
  root: T
): T => {
  if (typeof root === 'string') {
    return makeBearerString(root) as T
  }
  const children = root.children.map((entry) => getRootReplace(entry) as T)
  root.children = children as
    | (TileBranchSubstance | TileLeafSubstance)[]
    | string[]
  return root
}
