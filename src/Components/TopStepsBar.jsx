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
    FaHeartPulse,
    FaRibbon,
    FaSyringe,
    FaBone,
    FaWineBottle,
    FaClipboardCheck,
    FaFileSignature,
    FaFileContract,
    FaClipboardList,
} from "react-icons/fa6";
import {
    MdFamilyRestroom,
    MdWaterDrop,
    MdOutlineBalance,
    MdOutlineTimeline,
    MdOutlineHomeWork,
    MdMonitorHeart,
    MdHealthAndSafety,
    MdOutlineHealthAndSafety,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill, RiStethoscopeLine } from "react-icons/ri";


import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';
import { IoBriefcase, IoBriefcaseOutline } from 'react-icons/io5';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { BsClockHistory } from 'react-icons/bs';
import { openNotification } from '../assets/Api/Api';
import { PiBrain } from 'react-icons/pi';
import { GiFamilyHouse, GiKidneys, GiKneeCap, GiMeal, GiParachute } from 'react-icons/gi';
import { FaHeartbeat, FaProcedures } from 'react-icons/fa';

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
        console.log(location.pathname, currentPath);

        let stepComplete = 0;
        let mixCondition = false;
        let mixConditionForLast4 = false;
        let Health_MedicalHistoryCase = {
            status: false,
            set: "set1",
            trueArray: []
        };

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

        switch (currentPath) {
            case "PersonalDetails":
                stepComplete = 10;
                break;
            case "OccupationalFinancialInformation":
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
                        stepComplete = 20;
                        break;
                }
                break;
            case "Health_MedicalHistory":
                Health_MedicalHistoryCase.status = true;
                mixConditionForLast4 = true;
                switch (cLocation) {
                    case "Q1":
                        stepComplete = 20;
                        break;
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
                    case "Q7":
                        stepComplete = 80;
                        break;
                    case "Q8":
                        stepComplete = 10;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    case "Q9":
                        stepComplete = 20;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    case "Q10":
                        stepComplete = 30;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    case "Q11":
                        stepComplete = 40;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    case "Q12":
                        stepComplete = 50;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    case "Q13":
                        stepComplete = 60;
                        Health_MedicalHistoryCase.set = "set2"
                        break;
                    default:
                        stepComplete = 10;
                        break;
                }
                break;
            case "LifestyleInformation":
                mixConditionForLast4 = true;
                Health_MedicalHistoryCase.status = true;
                // stepComplete = 70;
                switch (cLocation) {
                    case "Q2":
                        stepComplete = 70;
                        break;
                    default:
                        stepComplete = 80;
                        break;
                }

                Health_MedicalHistoryCase.set = "set2"
                break;
            case "FamilyMedicalHistory":
                mixConditionForLast4 = true;
                Health_MedicalHistoryCase.status = true;
                stepComplete = 90;
                Health_MedicalHistoryCase.set = "set2"
                break;
            case "Declaration":
                mixConditionForLast4 = true;
                Health_MedicalHistoryCase.status = true;
                stepComplete = 100;
                Health_MedicalHistoryCase.set = "set2"
                break;
            default:
                break;
        }

        // Flatten all InnerPages from Pages where the condition is true
        const main = Pages.filter(page => page.condition(conditionCheck));

        let SubPages = [];

        // Check the condition and generate SubPages with concatenated routes
        if (mixCondition) {
            SubPages = main
                .filter((Pelem) => Pelem.route === `/PersonalDetails` || Pelem.route === `/OccupationalFinancialInformation`)
                .flatMap((Pelem) =>
                    Pelem.InnerPages.map((innerPage) => ({
                        ...innerPage,
                        route: `${Pelem.route}${innerPage.route}` // Concatenate parent route with inner page route
                    }))
                );
        } else if (mixConditionForLast4) {
            SubPages = main
                .filter((Pelem) => Pelem.route === `/Health_MedicalHistory` || Pelem.route === `/LifestyleInformation` || Pelem.route === `/Declaration` || Pelem.route === `/FamilyMedicalHistory`)
                .flatMap((Pelem) =>
                    Pelem.InnerPages.map((innerPage) => ({
                        ...innerPage,
                        route: `${Pelem.route}${innerPage.route}` // Concatenate parent route with inner page route
                    }))
                );

            Health_MedicalHistoryCase.trueArray = main
                .filter((Pelem) => Pelem.route === `/Health_MedicalHistory`)
                .flatMap((Pelem) =>
                    Pelem.InnerPages.map((innerPage) => ({
                        ...innerPage,
                        route: `${Pelem.route}${innerPage.route}` // Concatenate parent route with inner page route
                    }))
                );

        } else {
            SubPages = main
                .filter((Pelem) => Pelem.route === `/${currentPath}`)
                .flatMap((Pelem) =>
                    Pelem.InnerPages.map((innerPage) => ({
                        ...innerPage,
                        route: `${Pelem.route}${innerPage.route}` // Concatenate parent route with inner page route
                    }))
                );
        }

        // Now SubPages will have the concatenated route structure as required


        let conditionCheck2 = values

        let innerPages = SubPages.filter(page => page.condition(conditionCheck2));
        Health_MedicalHistoryCase.ConditionLength = (Health_MedicalHistoryCase.trueArray.filter(page => page.condition(conditionCheck2))).length;

        // Check if innerPages length is greater than 7
        if (Health_MedicalHistoryCase.status && innerPages.length > 7) {
            // Get the current index of the user in the innerPages array (you need to determine the current page index here)
            const currentIndex = innerPages.findIndex((page) => page.route === `/${currentPath}/${cLocation}`);

            // If the user is on index 8 or greater, slice from index 8 to 17
            if (currentIndex >= 12) {
                innerPages = innerPages.slice(12, 19);
            } else if (currentIndex >= 6) {
                innerPages = innerPages.slice(6, 12);
            } else {
                // If the user is on index less than 8, slice the first 8 pages
                innerPages = innerPages.slice(0, 6);
            }
        }

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
            MdHealthAndSafety,
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
            FaUserTie,
            FaHeartPulse,
            RiStethoscopeLine,
            MdMonitorHeart,
            FaRibbon,
            FaSyringe,
            PiBrain,
            FaBone,
            GiKidneys,
            GiKneeCap,
            FaHeartbeat,
            FaProcedures,
            GiParachute,
            GiMeal,
            FaWineBottle,
            FaClipboardCheck,
            MdOutlineHealthAndSafety,
            GiFamilyHouse,
            FaFileSignature,
            FaFileContract,
            FaClipboardList
        };

        console.log(innerPages)



        const currentIndex = innerPages.findIndex((innerPage) => innerPage.route === `/${currentPath}/${cLocation}`); // Find the current index based on the route


        const updatedItems = innerPages.map((item, index) => {
            const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found

            const fullRoute = `/${currentPath}/${cLocation}`;
            const isCurrentStep = fullRoute === item.route;

            let status;

            if (index < currentIndex) {
                // Previous pages have been completed
                status = 'finish';
            } else if (index === currentIndex) {
                // The current page is in progress
                status = 'process';
            } else {
                // Future pages are yet to be completed
                status = 'wait';
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
                        onClick={async () => {
                            if (currentPath === "PersonalDetails") {
                                const touch = await setFieldTouched("EmailAddress"); if (!touch.EmailAddress) {
                                    handleStepClick(`${item.route}`)
                                } else {
                                    openNotification("error", "topRight", "Warning Notification", "Please! enter email before proceeding");
                                }
                            }
                            else {
                                handleStepClick(`${item.route}`)
                            }
                        }}
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


