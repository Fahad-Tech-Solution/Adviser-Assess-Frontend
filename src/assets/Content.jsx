import React from "react";
import logo from "./Images/Logo.png"
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
                    statusStep: 0,
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
                {
                    Title: 'Question 2',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/Q2',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Question 3',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/Q3',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Question 4',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/Q4',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Question 5',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/Q5',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Question 6',
                    statusStep: 0,
                    icon: 'FaUser',
                    route: '/Q6',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
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