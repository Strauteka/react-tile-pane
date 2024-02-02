import React, { useState } from 'react'
import { AppStateContext } from './context/AppStateContext'
import { AppInner } from './AppInner'

const App: React.FC = () => {
  const [appState, setAppState] = useState({})
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <AppStateContext.Provider
        value={{
          appState: appState,
          setAppState: (paneName: string, state: any) => {
            setAppState({ ...appState, [paneName]: state })
          },
        }}
      >
        <AppInner />
      </AppStateContext.Provider>
    </div>
  )
}

export default App
