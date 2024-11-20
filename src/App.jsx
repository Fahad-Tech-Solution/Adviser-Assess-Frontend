import React, { useEffect } from 'react'
import './App.css'
import ResourceBlock from './assets/ResourceBlock/ResourceBlock'
import { Route, Routes, useLocation } from 'react-router-dom'
import Starter from './Components/Starter'

import Aos from "aos";
import "aos/dist/aos.css";
import { Element, scroller } from 'react-scroll'

function App() {

  let location = useLocation();
  useEffect(() => {

    let cLocation = location.pathname;

    console.log(cLocation)

    // Automatically scroll to "test1" when the component mounts
    scroller.scrollTo("test1", {
      duration: 800, // Animation duration in milliseconds
      delay: 0, // Delay before scroll starts
      smooth: "easeInOutQuart", // Smooth scroll effect
      offset: -70, // Adjust for fixed headers (if any)
    });

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
      <Element name="test1" className="element"></Element>
      <Routes>
        <Route path="/ResourceBlock/*" element={<ResourceBlock />} />
        <Route path="/*" element={<Starter />} />
      </Routes>
    </div>
  )
}

export default App
