import React, { useState } from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes } from 'react-router-dom'
import FormComponent from './assets/Custom/FormComponent'

function App() {


  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/ResourceBlock/*" element={<ResourceBlock />} />
          <Route path="/*" element={<FormComponent />} />
        </Routes>
      </React.Fragment>



    </div>
  )
}

export default App
