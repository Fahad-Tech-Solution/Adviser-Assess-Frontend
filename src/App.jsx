import React, { useState } from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <React.Fragment>
      <Routes>
        <Route path="/ResourceBlock/*" element={<ResourceBlock />} />
      </Routes>
    </React.Fragment>
  )
}

export default App
