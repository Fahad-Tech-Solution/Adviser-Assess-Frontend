import React from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes } from 'react-router-dom'
import Starter from './Components/Starter'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/ResourceBlock/*" element={<ResourceBlock />} />
        <Route path="/*" element={<Starter />} />
      </Routes>
    </div>
  )
}

export default App
