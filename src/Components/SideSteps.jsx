// import React, { useEffect, useState } from 'react';
// import { Anchor, Button, ConfigProvider, Menu, Steps } from 'antd';
// import { MdMailOutline, MdOutlineControlCamera, MdOutlineDesktopWindows, MdOutlineHealthAndSafety, MdPieChartOutlined } from 'react-icons/md';
// import { RiAppsLine, RiCoinsFill, RiMenu2Fill, RiMenuFill } from 'react-icons/ri';

// import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaMoneyBillWave, FaPlus, FaUser, FaChartLine, FaTriangleExclamation, FaGraduationCap, FaChartPie } from "react-icons/fa6";
// import { FaHome, FaQuestionCircle } from "react-icons/fa";
// import { MdFamilyRestroom, MdWaterDrop, MdOutlineBalance, MdOutlineTimeline } from "react-icons/md";

// import { RiDiscountPercentFill } from "react-icons/ri";

// import AdviserS1 from "../assets/Images/Logo.png";
// import AdviserSmini from "../assets/Images/Logo.png";
// import { useLocation, useNavigate } from 'react-router-dom';
// import Content from '../assets/Content';

// const { SubMenu } = Menu;

// const SideSteps = (props) => {

//     const sidebarWidth = props.collapsed ? '80px' : '250px'; // Change these values as needed


//     let [items, setItems] = useState([]);
//     let { Pages } = Content;


//     let location = useLocation();

//     useEffect(() => {
//         let cLocation = location.pathname.split("/")[1] || "";

//         console.log(location.pathname, cLocation);

//         let stepComplete = 0;

//         switch (cLocation) {
//             case "PersonalDetails": stepComplete = 10; break;
//             case "OccupationalFinancialInformation": stepComplete = 20; break;
//             case "Health_MedicalHistory": stepComplete = 30; break;
//             case "FamilyMedicalHistory": stepComplete = 40; break;
//             default: stepComplete = 0; break;
//         }


//         const itemsToRender = Pages

//         let conditionCheck = true

//         const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {

//             const iconMap = {
//                 FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser, FaHome, FaQuestionCircle, MdFamilyRestroom, RiCoinsFill, FaPlus, FaChartLine,
//                 MdWaterDrop, FaTriangleExclamation, RiDiscountPercentFill, MdOutlineHealthAndSafety, MdOutlineBalance, FaGraduationCap, FaChartPie, MdOutlineTimeline, FaMoneyBillWave
//             };

//             const IconComponent = iconMap[item.icon] || RiCoinsFill; // Default to FaUser if not found
//             let isCurrentStep = cLocation === item.route.replace("/", "");

//             let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

//             return {
//                 ...item,
//                 icon: (
//                     <span
//                         className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '16px', // Adjust icon size here
//                             width: '30px', // Adjust icon container size here
//                             height: '30px' // Adjust icon container height here
//                         }}
//                         role="button"
//                         onClick={() => handleStepClick(item.route)}
//                     >
//                         <IconComponent />
//                     </span>
//                 ),
//                 status: Status,
//                 title: (<span
//                     style={{
//                         color: isCurrentStep ? "#000" : "#808080",
//                         fontSize: "14px", width: "100%",
//                         fontWeight: isCurrentStep ? "700" : "600"
//                     }}
//                     role="button"
//                     onClick={() => {
//                         handleStepClick(`${item.route}`)
//                     }}
//                 > {item.Title} </span>),
//                 description: item.description
//             };
//         });

//         setItems(updatedItems);

//     }, [location])



//     let Nev = useNavigate();

//     let handleStepClick = (props) => {
//         Nev(props)
//     }


//     return (
//         <div
//             className='py-5 px-3 d-flex justify-content-center align-items-center FullHeight'
//         >

//             <ConfigProvider>

//                         <Steps
//                     className="custom-steps"
//                     items={items}
//                     initial={0}
//                     responsive={false}
//                     status={"process"}
//                     direction="vertical"
//                     size="small"
//                     current={1}
//                 />
//             </ConfigProvider>
//         </div>
//     );
// };

// export default SideSteps;


import React, { useEffect, useState } from 'react';
import { Anchor, ConfigProvider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';

const SideSteps = (props) => {
    const { Link } = Anchor;
    const { Pages } = Content;
    const location = useLocation();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const sidebarWidth = props.collapsed ? '80px' : '250px'; // Adjust width as needed

    useEffect(() => {
        const currentPath = location.pathname.split("/")[1] || "";

        // Filter and map items based on the current condition
        const itemsToRender = Pages;
        const conditionCheck = true;

        const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {
            const isCurrentStep = currentPath === item.route.replace("/", "");

            return {
                ...item,
                isCurrentStep,
                title: (
                    <span
                        style={{
                            color: isCurrentStep ? "green" : "#808080",  // Green if active
                            fontSize: "14px",
                            width: "100%",
                            fontWeight: isCurrentStep ? "700" : "600"
                        }}
                        role="button"
                        onClick={() => handleStepClick(item.route)}
                    >
                        {item.Title}
                    </span>
                )
            };
        });

        setItems(updatedItems);
    }, [location.pathname]);  // Update items when location changes

    const handleStepClick = (route) => {
        navigate(route);
    };

    return (
        <div
            className='py-5 px-3'
            style={{ width: sidebarWidth }}
        >
            <ConfigProvider>
                <Anchor
                    className="custom-anchor"
                    affix={false} // Optional: Disable sticky behavior
                >
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.route}
                            title={item.title}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                handleStepClick(item.route); // Use custom navigation
                            }}
                            className={item.isCurrentStep ? "active-step" : ""}
                        />
                    ))}
                </Anchor>
            </ConfigProvider>
        </div>
    );
};

export default SideSteps;

