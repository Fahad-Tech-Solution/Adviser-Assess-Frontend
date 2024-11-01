import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Menu, Steps } from 'antd';
import { MdMailOutline, MdOutlineControlCamera, MdOutlineDesktopWindows, MdPieChartOutlined } from 'react-icons/md';
import { RiAppsLine, RiCoinsFill, RiMenu2Fill, RiMenuFill } from 'react-icons/ri';
import AdviserS1 from "../assets/Images/Logo.png";
import AdviserSmini from "../assets/Images/Logo.png";
import { useLocation, useNavigate } from 'react-router-dom';
import Content from '../assets/Content';

const { SubMenu } = Menu;

const SideSteps = (props) => {

    const sidebarWidth = props.collapsed ? '80px' : '250px'; // Change these values as needed


    let [items, setItems] = useState([]);
    let { Pages } = Content;


    let location = useLocation();

    useEffect(() => {
        let cLocation = (location.pathname === "/Pages" || location.pathname === "/Pages/") ? "" : location.pathname.replace("/Pages/", "");
        console.log(location.pathname, cLocation);

        let stepComplete = 0;

        switch (cLocation) {
            case "InvestmentPlatforms":
                stepComplete = 10;
                break;
            case "InvestmentBonds":
                stepComplete = 20;
                break;
            case "SuperannuationFunds":
                stepComplete = 30;
                break;
            case "AccountBasedPensions":
                stepComplete = 40;
                break;
            case "Annuities":
                stepComplete = 50;
                break;
            case "PersonalInsurances":
                stepComplete = 60;
                break;
            default:
                stepComplete = 0;
                break;
        }

        const itemsToRender = Pages

        let conditionCheck = true

        const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {

            const iconMap = {
                RiCoinsFill,
            };

            const IconComponent = iconMap[item.icon] || RiCoinsFill; // Default to FaUser if not found
            let isCurrentStep = cLocation === item.route.replace("/", "");

            let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

            return {
                ...item,
                icon: (
                    <span
                        className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
                        role="button"
                        onClick={() => {
                            handleStepClick(`/Pages${item.route}`)
                        }}
                        style={{ height: "2rem", width: "6rem" }}
                    >
                        <IconComponent />
                    </span>
                ),
                status: Status,
                subTitle: (<span style={{ color: isCurrentStep ? "#000" : "#808080", fontSize: "12px", width: "100%", fontWeight: isCurrentStep ? "600" : "500" }}> {item.subTitle} </span>)
            };
        });

        setItems(updatedItems);

    }, [location])



    let Nev = useNavigate();
    let handleStepClick = (props) => {
        Nev(props)
    }

    let description = "this is a description"

    return (
        <div
            className='p-5'
        >
            <ConfigProvider
            // theme={{
            //     components: {
            //         Steps: {
            //             customIconFontSize: 30,
            //         },
            //     },
            //     token: {
            //         /* here is your global tokens */
            //         colorPrimary: "#36b446",
            //         fontSize: 12,
            //         lineWidth: 4,
            //     },
            // }}
            >

                <Steps
                    // items={items}
                    items={[
                        {
                            title: 'Finished',
                            description,
                        },
                        {
                            title: 'In Progress',
                            description,
                        },
                        {
                            title: 'Waiting',
                            description,
                        },
                    ]}
                    initial={0}
                    responsive={false}
                    status={"process"}
                    direction="vertical"
                    size="small"
                    current={1}
                />

            </ConfigProvider>
        </div>
    );
};

export default SideSteps;
