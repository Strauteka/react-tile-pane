import { createContext, useContext } from 'react'

export type AppScopeState = {
  appScopeState: { scopeName: string, paneState:{[name: string]: {}} }
  setAppScopeState: (paneName: string, state: {}) => void
}

export const AppScopeStateContext = createContext<AppScopeState>({
  appScopeState: {scopeName: '', paneState: {}  },
  setAppScopeState: (paneName: string, state: {}) => {},
})


export const useAppScopeState = (): AppScopeState => {
  return useContext(AppScopeStateContext)
}
