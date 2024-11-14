import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SideSteps from './SideSteps';
import Content from '../assets/Content';
import QuestionsSet from './QuestionsSet';
import TopStepsBar from './TopStepsBar';
import { Splitter } from 'antd';

const Questions = (props) => {
    let { Pages } = Content;
    let location = useLocation();
    let cLocation = location.pathname.split("/")[1] || "";


    let { FormickOBj } = props;

   // State to manage the collapsed state and panel size
   const [isCollapsed, setIsCollapsed] = useState(false);
   const [panelSize, setPanelSize] = useState("20%"); // Initial size

   // Toggle collapsed state and set panel size accordingly
   const handleCollapseToggle = (collapsed) => {
       setIsCollapsed(collapsed);
       setPanelSize(collapsed ? "0%" : "20%"); // Set to 0% when collapsed, 20% when expanded
   };


    return (
        <div className="container-fluid p-0 overflow-x-hidden ">
            <div className="row">
                <TopStepsBar FormickOBj={props.FormickOBj} />
                <div className="col-md-12">
                    <Splitter
                        style={{
                            height: "100%",
                        }}
                    >
                        <Splitter.Panel>
                            <div className='w-100' >
                                <Routes>
                                    {Pages.filter(item => item.condition(true)).map((Pelem, PIndex) => {
                                        if (Pelem.route === "/" + cLocation) {

                                            return (Pelem.InnerPages.map((elem, index) => {
                                                return (
                                                    <Route path={elem.route} element={<QuestionsSet FormickOBj={props.FormickOBj} Data={elem} parentElem={Pelem} />} />
                                                )
                                            }))
                                        }
                                    })}
                                </Routes>
                            </div>
                        </Splitter.Panel>
                        <Splitter.Panel
                            collapsible={true}
                            max={"42%"}
                            defaultSize={"22%"}
                        >
                            {/* Side Menu */}
                            <SideSteps FormickOBj={props.FormickOBj} />
                        </Splitter.Panel>
                    </Splitter>
                </div>
            </div>
        </div>
    );
};

export default Questions;
