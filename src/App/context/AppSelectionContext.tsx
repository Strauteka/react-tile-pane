import { PaneName } from 'components'
import { createContext, useContext } from 'react'

export type AppSelection = {
  selection: PaneName
  setSelection: (paneName: PaneName) => void
}

export const AppSelectionContext = createContext<AppSelection>({
  selection: '',
  setSelection: (paneName: PaneName) => {},
})

export const useSelection = (): AppSelection => {
  return useContext(AppSelectionContext)
}
