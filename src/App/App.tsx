import React, { useState } from 'react'
import { AppInner } from './demo'
import { AppStateContext } from './context/AppStateContext'

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
