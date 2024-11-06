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

// const TopStepsBar = (props) => {

//     const sidebarWidth = props.collapsed ? '80px' : '250px'; // Change these values as needed


//     let [items, setItems] = useState([]);
//     let { Pages } = Content;


//     let location = useLocation();

//     useEffect(() => {
//         let cLocation = location.pathname.split("/")[2] || "";
//         let middleCLocation = location.pathname.split("/")[1] || "";

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

//         const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(itemUp => {

//             if (itemUp.route === "/" + middleCLocation) {
//                 return (itemUp.InnerPages.map(item => {

//                     const iconMap = {
//                         FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser, FaHome, FaQuestionCircle, MdFamilyRestroom, RiCoinsFill, FaPlus, FaChartLine,
//                         MdWaterDrop, FaTriangleExclamation, RiDiscountPercentFill, MdOutlineHealthAndSafety, MdOutlineBalance, FaGraduationCap, FaChartPie, MdOutlineTimeline, FaMoneyBillWave
//                     };

//                     const IconComponent = iconMap[item.icon] || RiCoinsFill; // Default to FaUser if not found
//                     let isCurrentStep = cLocation === item.route.replace("/", "");

//                     let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

//                     return {
//                         ...item,
//                         icon: (
//                             <span
//                                 className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
//                                 role="button"
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     fontSize: '16px', // Adjust icon size here
//                                     width: '2rem', // Adjust icon container size here
//                                     height: '2rem' // Adjust icon container height here
//                                 }}
//                             >
//                                 <IconComponent />
//                             </span>
//                         ),
//                         status: Status,
//                         subTitle: (<span style={{ color: isCurrentStep ? "#000" : "#808080", fontSize: "12px", width: "100%", fontWeight: isCurrentStep ? "600" : "500" }}> {item.Title} </span>)
//                     };

//                 }))
//             }
//         });

//         setItems(updatedItems);

//     }, [location])



//     let Nev = useNavigate();

//     let handleStepClick = (props) => {
//         Nev(props)
//     }


//     return (
//         <div
//             className='py-5 px-3 d-flex justify-content-center align-items-center  overflow-auto customScroll'
//         >

//             <ConfigProvider
//                 theme={{
//                     components: {
//                         Steps: {
//                             customIconFontSize: 30,
//                         },
//                     },
//                     token: {
//                         /* here is your global tokens */
//                         colorPrimary: "#36b446",
//                         fontSize: 12,
//                         lineWidth: 4,
//                     },
//                 }}
//             >

//                 <Steps
//                     // items={optRender === 'Opt1' ? itemsOpt1 : optRender === 'Opt2' ? itemsOpt2 : optRender === 'Opt3' ? itemsOpt1 : itemsOpt2}
//                     items={items}
//                     labelPlacement={"vertical"}
//                     initial={0}
//                     responsive={false}
//                     status={"process"}

//                 />

//             </ConfigProvider>
//         </div>
//     );
// };

// export default TopStepsBar;





import React, { useEffect, useState } from 'react';
import { ConfigProvider, Steps } from 'antd';
import {
    FaBriefcase,
    FaCheck,
    FaGift,
    FaKey,
    FaMoneyCheckDollar,
    FaUser,
    // FaHome,
    // FaQuestionCircle,
    FaPlus,
    FaChartLine,
    FaTriangleExclamation,
    FaGraduationCap,
    FaChartPie,
    FaMoneyBillWave,
} from "react-icons/fa6";
import {
    MdFamilyRestroom,
    MdWaterDrop,
    MdOutlineBalance,
    MdOutlineHealthAndSafety,
    MdOutlineTimeline,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";

import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';

const TopStepsBar = (props) => {
    const sidebarWidth = props.collapsed ? '80px' : '250px'; // Adjust as needed

    const [items, setItems] = useState([]);
    const { Pages } = Content;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = location.pathname.split("/")[1] || "";
        const cLocation = location.pathname.split("/")[2] || "";
        // console.log(location.pathname, currentPath);

        let stepComplete = 0;
        let mixCondition = false;

        switch (currentPath) {
            case "PersonalDetails":
                stepComplete = 10;
                mixCondition = true;
                break;
            case "OccupationalFinancialInformation":
                stepComplete = 20;
                mixCondition = true;
                break;
            default:
                break;
        }

        const conditionCheck = true;


        // Flatten all InnerPages from Pages where condition is true
        const main = Pages
            .filter(page => page.condition(conditionCheck));

        let innerPages = []

        if (mixCondition) {
            innerPages = main
                .filter((Pelem) => Pelem.route === `/PersonalDetails` || Pelem.route === `/OccupationalFinancialInformation`)
                .flatMap((Pelem) => Pelem.InnerPages);
        }
        else {
            innerPages = main
                .filter((Pelem) => Pelem.route === `/${currentPath}`)
                .flatMap((Pelem) => Pelem.InnerPages);
        }


        // console.log(main, "Data", currentPath);


        // Icon mapping for easy reference
        const iconMap = {
            FaBriefcase,
            FaCheck,
            FaGift,
            FaKey,
            FaMoneyCheckDollar,
            FaUser,
            // FaHome,
            // FaQuestionCircle,
            MdFamilyRestroom,
            RiCoinsFill,
            FaPlus,
            FaChartLine,
            MdWaterDrop,
            FaTriangleExclamation,
            RiDiscountPercentFill,
            MdOutlineHealthAndSafety,
            MdOutlineBalance,
            FaGraduationCap,
            FaChartPie,
            MdOutlineTimeline,
            FaMoneyBillWave,
        };

        // console.log(currentPath, "ma kea btao")

        // Map each InnerPage to a step item
        const updatedItems = innerPages.map((item, index) => {
            const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found

            let isCurrentStep = false;
            let NevBase = currentPath;
            if (currentPath === "PersonalDetails") {
                if (index === 0) {
                    isCurrentStep = true
                }
                else {
                    NevBase = "OccupationalFinancialInformation";
                }
            }
            else if (currentPath === "OccupationalFinancialInformation") {
                if (index === 0) {
                    NevBase = "PersonalDetails";
                }
                else {
                    isCurrentStep = cLocation === item.route.replace("/", "");
                }
            }
            else {
                isCurrentStep = cLocation === item.route.replace("/", "");
            }


            let status;
            if (stepComplete < item.statusStep) {
                status = "wait";
            } else if (stepComplete > item.statusStep) {
                status = "finish";
            } else {
                status = 'process';
            }

            return {
                ...item,
                icon: (
                    <span
                        className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
                        role="button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px', // Adjust icon size here
                            width: '2rem', // Adjust icon container size here
                            height: '2rem', // Adjust icon container height here
                        }}
                        onClick={() => { handleStepClick(`/${NevBase}${item.route}`) }}
                    >
                        <IconComponent />
                    </span>
                ),
                status: status,
                subTitle: (
                    <span
                        style={{
                            color: isCurrentStep ? "#000" : "#808080",
                            fontSize: "12px",
                            width: "100%",
                            fontWeight: isCurrentStep ? "600" : "500",
                        }}
                    >
                        {item.Title}
                    </span>
                ),
            };
        });

        setItems(updatedItems);
    }, [location, Pages, props]);

    const handleStepClick = (path) => {
        // alert(path);

        navigate(path);
    };

    return (
        <div className='pt-4 px-3 d-flex justify-content-center align-items-center overflow-auto '>
            <ConfigProvider
                theme={{
                    components: {
                        Steps: {
                            customIconFontSize: 30,
                        },
                    },
                    token: {
                        colorPrimary: "#36b446",
                        fontSize: 12,
                        lineWidth: 4,
                    },
                }}
            >
                <Steps
                    items={items}
                    labelPlacement="vertical"
                    initial={0}
                    responsive={false}
                    status="process"
                />
            </ConfigProvider>

        </div>
    );
};

export default TopStepsBar;
