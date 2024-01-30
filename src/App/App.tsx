import React, { useState } from 'react'
import { AppInner } from './demo'
import { AppSelectionContext } from './context/AppStateContext'

const App: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <AppInner />
    </div>
  )
}

export default App
