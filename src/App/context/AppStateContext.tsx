import { createContext } from 'react'

export type AppState = {
  appState: { [name: string]: {} }
  setAppState: (paneName: string, state: {}) => void
}

export const AppStateContext = createContext<AppState>({
  appState: {},
  setAppState: (paneName: string, state: {}) => {},
})
