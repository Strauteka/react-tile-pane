import { unfoldBearer } from 'App/sectionConfiguration/Bearer'
import { rootPane } from 'App/sectionConfiguration/MainSectionLayout'
import { sectionKeys } from 'App/sectionConfiguration/SectionName'
import {
  PaneName,
  TileDispatchContext,
  TileLeaf,
  TileLeavesContext,
} from 'components'
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
  const leaves = useContext(TileLeavesContext)
  const dispatch = useContext(TileDispatchContext)
  return (leaf, name) => {
    if (leaf && name) {
      const bearer = unfoldBearer(name)
      console.log('Closing ', bearer.paneName)
      if (
        !leaves.some((leaf) =>
          leaf.children.some(
            (section) =>
              unfoldBearer(section).paneName !== sectionKeys.editForm &&
              section !== name
          )
        )
      ) {
        console.log('reset ROOT!')
        dispatch({ reset: rootPane })
      } else if (bearer.paneName === sectionKeys.editForm) {
        const bearer = unfoldBearer(name)
        closePaneContext.setClosedPaneState(bearer.paneName, {
          grow: leaf.grow,
        })
      }
    }
  }
}
