import { makeBearerString } from 'App/sectionConfiguration/Bearer'
import { PaneName } from 'components'
import { createContext, useContext } from 'react'

export const selectionDefault = makeBearerString('selectionDefault')
export const selectionDefaultValue: EditFormType = {
  render: <>Initial FORM!</>,
}

export interface EditFormType {
  render: React.ReactNode
  [key: string]: any
}

export type EditFormState = {
  editFormState: { [name: PaneName]: EditFormType }
  setEditFormState: (paneName: PaneName, editFormState: EditFormType) => void
}

export const EditFormStateContext = createContext<EditFormState>({
  editFormState: {},
  setEditFormState: (paneName: PaneName, editFormState: EditFormType) => {},
})

export const useEditFormState = (): EditFormState => {
  return useContext(EditFormStateContext)
}
