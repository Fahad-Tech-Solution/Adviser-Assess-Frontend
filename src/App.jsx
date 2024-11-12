import React, { useEffect } from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes, useLocation } from 'react-router-dom'
import Starter from './Components/Starter'

import Aos from "aos";
import "aos/dist/aos.css";

function App() {

  let location = useLocation();
  useEffect(() => {

    let cLocation = location.pathname;

    console.log(cLocation)

  }, [location])

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });
  }, []);

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
