import React from 'react'
import './App.css'
import { LeftTabDemo } from './demo'

const App: React.FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
  
      }}
    >
      {/* <div style={{ width: '200px', height: '100%', backgroundColor: 'gray' }}>
        test112323
      </div> */}

      <LeftTabDemo />
    </div>
  )
}

export default App
