import { context, contextName } from 'App/store/global'
import { MovePane, PaneName, useMovePane } from 'components'
import { createContext, useContext } from 'react'

export interface AppStateType {
  [key: string]: any
}

export type AppState = {
  appState: { [name: PaneName]: {} }
  setAppState: (paneName: PaneName, state: AppStateType) => void
}

export const AppStateContext = createContext<AppState>({
  appState: {},
  setAppState: (paneName: PaneName, state: AppStateType) => {},
})

export const useAppState = (): AppState => {
  return useContext(AppStateContext)
}

export const useScopedMovePane = (scopeName?: PaneName): MovePane => {
  return (
    (scopeName ? context[scopeName]?.movePane : useMovePane()) ||
    context[contextName.main]?.movePane
  )
}
