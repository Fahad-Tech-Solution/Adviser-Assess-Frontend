import React from "react";
import logo from "./Images/Logo.png"
const Content = {
    Pages: [
        {
            img: logo,
            Question: "-2",
            route: "/",
            condition: (CRObject) => true

        },
        {
            img: logo,
            Question: "-1",
            route: "/Disclosure",
            condition: (CRObject) => true

        },
        {
            subTitle: 'Financial Institutions',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/PersonalDetails',
            key: "PersonalDetails",
            condition: (CRObject) => true
        }
    ]

}


export default Content;