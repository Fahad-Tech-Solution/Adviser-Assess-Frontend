import React, { useEffect, useState } from 'react';
import { ConfigProvider, Steps } from 'antd';
import {
    FaBriefcase,
    FaCheck,
    FaGift,
    FaKey,
    FaMoneyCheckDollar,
    FaUser,
    FaPlus,
    FaChartLine,
    FaTriangleExclamation,
    FaGraduationCap,
    FaChartPie,
    FaMoneyBillWave,
    FaBuilding,
    FaUserTie,
} from "react-icons/fa6";
import {
    MdFamilyRestroom,
    MdWaterDrop,
    MdOutlineBalance,
    MdOutlineHealthAndSafety,
    MdOutlineTimeline,
    MdOutlineHomeWork,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";

import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';
import { IoBriefcase, IoBriefcaseOutline } from 'react-icons/io5';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';

const TopStepsBar = (props) => {

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj
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
                mixCondition = true;
                break;
            case "OccupationalFinancialInformation":
                mixCondition = true;
                break;
            default:
                break;
        }

        const conditionCheck = true;

        switch (cLocation) {
            case "Q2":
                stepComplete = 30;
                break;
            case "Q3":
                stepComplete = 40;
                break;
            case "Q4":
                stepComplete = 50;
                break;
            case "Q5":
                stepComplete = 60;
                break;
            case "Q6":
                stepComplete = 70;
                break;

            default:

                switch (currentPath) {
                    case "PersonalDetails":
                        stepComplete = 10;
                        break;
                    case "OccupationalFinancialInformation":
                        stepComplete = 20;
                        break;
                    default:
                        break;
                }
                break;
        }

        // Flatten all InnerPages from Pages where condition is true
        const main = Pages
            .filter(page => page.condition(conditionCheck));

        let SubPages = []

        if (mixCondition) {
            SubPages = main
                .filter((Pelem) => Pelem.route === `/PersonalDetails` || Pelem.route === `/OccupationalFinancialInformation`)
                .flatMap((Pelem) => Pelem.InnerPages);
        }
        else {
            SubPages = main
                .filter((Pelem) => Pelem.route === `/${currentPath}`)
                .flatMap((Pelem) => Pelem.InnerPages);
        }


        let conditionCheck2 = values

        let innerPages = SubPages.filter(page => page.condition(conditionCheck2));





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
            MdOutlineHomeWork,
            IoBriefcaseOutline,
            IoBriefcase,
            AiOutlineDollarCircle,
            FaBuilding,
            BsClockHistory,
            FaUserTie
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
                            fontWeight: isCurrentStep ? "700" : "500",
                        }}
                    >
                        {item.Title}
                    </span>
                ),
            };
        });

        setItems(updatedItems);
    }, [location, Pages, values]);

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
