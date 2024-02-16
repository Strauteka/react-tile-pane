import { foldBearer, unfoldBearer } from 'App/sectionConfiguration/Bearer'
import { PaneName, TileLeaf } from 'components'
import { createContext, useContext } from 'react'

export interface ClosedPaneType {
  grow: number
  [key: string]: any
}

export type EditFormState = {
  closedPaneState: { [name: PaneName]: ClosedPaneType }
  setClosedPaneState: (
    paneName: PaneName,
    editFormState: ClosedPaneType
  ) => void
}

export const ClosedPaneStateContext = createContext<EditFormState>({
  closedPaneState: {},
  setClosedPaneState: (paneName: PaneName, closedPane: ClosedPaneType) => {},
})

export type ClosedPane = (leaf?: TileLeaf, name?: PaneName) => void
export type getClosedPane = (name: PaneName) => ClosedPaneType | undefined

export const getClosedPane = (): getClosedPane => {
  const closePaneContext = useContext(ClosedPaneStateContext)
  return (name) => closePaneContext.closedPaneState[name]
}

export const useClosedPane = (): ClosedPane => {
  const closePaneContext = useContext(ClosedPaneStateContext)
  return (leaf, name) => {
    if (leaf && name) {
      const bearer = unfoldBearer(name)
      closePaneContext.setClosedPaneState(bearer.paneName, { grow: leaf.grow })
    }
  }
}
