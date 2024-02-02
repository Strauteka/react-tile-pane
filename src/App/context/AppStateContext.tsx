import { context, contextName } from 'App/store/global'
import { MovePane, PaneName, useMovePane } from 'components'
import { createContext, useContext } from 'react'

export type AppState = {
  appState: { [name: string]: {} }
  setAppState: (paneName: string, state: {}) => void
}

export const AppStateContext = createContext<AppState>({
  appState: {},
  setAppState: (paneName: string, state: {}) => {},
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
