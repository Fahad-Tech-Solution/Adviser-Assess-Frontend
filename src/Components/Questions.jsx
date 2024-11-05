import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SideSteps from './SideSteps'
import Content from '../assets/Content';
import QuestionsSet from './QuestionsSet';

const Questions = (props) => {
    let { Pages } = Content;
    let location = useLocation();
    let cLocation = location.pathname.split("/")[1] || "";

    return (
        <div className='container-fluid p-0 overflow-x-hidden'>

            <div className='row'>

                {/* Top Menu */}
                <div className='col-md-9 '>
                    <Routes>
                        {Pages.filter(item => item.condition(true)).map((Pelem, PIndex) => {
                            if (Pelem.route === "/" + cLocation) {
                                return (Pelem.InnerPages.map((elem, index) => {
                                    return (
                                        <Route path={elem.route} element={<QuestionsSet Data={elem} />} />
                                    )
                                }))
                            }
                        })}
                    </Routes>
                </div>
                <div className='col-md-3'>
                    {/* Side Menu */}
                    <SideSteps />
                </div>
            </div>

        </div>
    )
}

export default Questions
