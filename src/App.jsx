import React, { useEffect } from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes, useLocation } from 'react-router-dom'
import Starter from './Components/Starter'

function App() {

  let location = useLocation();
  useEffect(() => {

    let cLocation = location.pathname;

    console.log(cLocation)

  }, [location])



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
