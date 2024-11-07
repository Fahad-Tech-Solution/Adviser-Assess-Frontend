import React from "react";
import logo from "./Images/Logo.png"
import { components } from "react-select";
import EmploymentStatus from "../Components/QuestionSets/EmploymentStatus";

import OccupationalFinancialInformation from "../assets/Images/OccupationalFinancialInformation.png"
import IncomeInformation from "../Components/QuestionSets/IncomeInformation";
import WorkEnvironment from "../Components/QuestionSets/WorkEnvironment";
import WeeklyWorkHours from "../Components/QuestionSets/WeeklyWorkHours";
import SelfEmploymentDetails from "../Components/QuestionSets/SelfEmploymentDetails";


const Content = {
    Pages: [
        {
            img: logo,
            Question: "-2",
            route: "/",
            condition: (CRObject) => false

        },
        {
            img: logo,
            Question: "-1",
            route: "/Disclosure",
            condition: (CRObject) => false

        },
        {
            description: "Your Personal information",
            Title: 'Personal Details',
            statusStep: 0,
            icon: 'FaUser',
            route: '/PersonalDetails',
            key: "PersonalDetails",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Personal Details',
                    statusStep: 10,
                    icon: 'FaUser',
                    route: '/',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
            ]

        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Occupational/Financial Information',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/OccupationalFinancialInformation',
            key: "OccupationalFinancialInformation",
            imgUrl: OccupationalFinancialInformation,
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Employment Status',
                    statusStep: 20,
                    icon: 'MdOutlineHomeWork',
                    route: '/',
                    key: "EmploymentStatus",
                    components: <EmploymentStatus />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Second Occupation',
                    statusStep: 30,
                    icon: 'IoBriefcase',
                    route: '/Q2',
                    key: "SecondOccupation",
                    components: <EmploymentStatus />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Income Information',
                    statusStep: 40,
                    icon: 'AiOutlineDollarCircle',
                    route: '/Q3',
                    key: "IncomeInformation",
                    components: <IncomeInformation />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Work Environment',
                    statusStep: 50,
                    icon: 'FaBuilding',
                    route: '/Q4',
                    key: "workEnvironment",
                    components: <WorkEnvironment />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Weekly Work Hours',
                    statusStep: 60,
                    icon: 'BsClockHistory',
                    route: '/Q5',
                    key: "weeklyWorkHours",
                    components: <WeeklyWorkHours />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Self-Employment Details',
                    statusStep: 70,
                    icon: 'FaUserTie',
                    route: '/Q6',
                    key: "SelfEmploymentDetails",
                    components: <SelfEmploymentDetails />,
                    condition: (CRObject) => {
                        console.log("CRObject:", CRObject);
                        console.log("EmploymentStatus_EmploymentType:", CRObject[`EmploymentStatus_EmploymentType`]);
                        return CRObject[`EmploymentStatus_EmploymentType`] === "Self-employed";
                    }
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Health & Medical History',
            statusStep: 0,
            icon: 'MdOutlineHealthAndSafety',
            route: '/Health_MedicalHistory',
            key: "Health_MedicalHistory",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Question 1',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Family Medical History',
            statusStep: 0,
            icon: 'MdFamilyRestroom',
            route: '/FamilyMedicalHistory',
            key: "FamilyMedicalHistory",
            condition: (CRObject) => true,
            InnerPages: [],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Declaration',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/Declaration',
            key: "Declaration",
            condition: (CRObject) => false
        },
    ]

}


export default Content;