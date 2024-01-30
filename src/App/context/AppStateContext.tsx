import { createContext } from 'react'

export type AppSelection = {
  selection: string
  setSelection: (paneName: string) => void
}

export const AppSelectionContext = createContext<AppSelection>({
  selection: '',
  setSelection: (paneName: string) => {},
})
