import React, { useState } from 'react'
import { AppStateContext, AppStateType } from './context/AppStateContext'
import { AppInner } from './AppInner'
import {
  EditFormStateContext,
  EditFormType,
  selectionDefault,
  selectionDefaultValue,
} from './context/EditFormStateContext'
import { AppSelectionContext } from './context/AppSelectionContext'
import { PaneName } from 'components'
import {
  ClosedPaneStateContext,
  ClosedPaneType,
} from './context/ClosedPaneStateContext'
import { color } from './component/tabBar/basic/styles'

// On initial build, rect panels registers edit state,
// So multiple fire on setEditFormState and actual edditFormState lags behind
const instantMapOfEditState: { [x: string]: EditFormType } = {}
const instantMapOfAppState: { [x: string]: AppStateType } = {}

const App: React.FC = () => {
  const [closedPaneState, setClosedPaneState] = useState({})
  const [appState, setAppState] = useState({})
  const [selection, setSelection] = useState(selectionDefault)
  const selectionValue = { selection, setSelection }
  const [edditFormState, setEditFormState] = useState({
    [selectionDefault]: selectionDefaultValue,
  })
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: color.secondaryLL
      }}
    >
      <AppSelectionContext.Provider value={selectionValue}>
        <EditFormStateContext.Provider
          value={{
            editFormState: edditFormState,
            setEditFormState(paneName: PaneName, state: EditFormType) {
              instantMapOfEditState[paneName] = state
              setEditFormState({
                ...instantMapOfEditState,
              })
            },
          }}
        >
          <AppStateContext.Provider
            value={{
              appState: appState,
              setAppState: (paneName: string, state: AppStateType) => {
                instantMapOfAppState[paneName] = state
                setAppState({
                  ...instantMapOfAppState,
                })
              },
            }}
          >
            <ClosedPaneStateContext.Provider
              value={{
                closedPaneState: closedPaneState,
                setClosedPaneState: (
                  paneName: string,
                  state: ClosedPaneType
                ) => {
                  setClosedPaneState({...closedPaneState, [paneName]: state})
          
                },
              }}
            >
              <AppInner />
            </ClosedPaneStateContext.Provider>
          </AppStateContext.Provider>
        </EditFormStateContext.Provider>
      </AppSelectionContext.Provider>
    </div>
  )
}

export default App
