import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SideSteps from './SideSteps'

const Questions = (props) => {
    return (
        <div className='container-fluid p-0 d-flex flex-row'>
            {/* Side Menu */}
            <SideSteps />
            <div className="flex-grow-1">
                {/* Top Menu */}
                <Routes>
                    {/* Top Menu 
                    {superAdmin.map((elem, index) => {
                        return (
                            <Route path={elem.route} element={<InstituteAndOffer Data={elem} />} />
                        )
                    })}
                    */}
                </Routes>

                <div style={{ backgroundColor: "lightgray" }} className='w-100 py-2 d-flex justify-content-center align-items-center'>
                    @Copy Rights is Owned my Fahad Tech Solution
                </div>
            </div>
        </div>
    )
}

export default Questions
