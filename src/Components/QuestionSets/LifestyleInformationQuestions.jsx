import React from 'react'
import DynamicQuestionBlocks from '../../assets/Custom/DynamicQuestionBlocks/DynamicQuestionBlocks'


import overseas from "../../assets/Images/OccupationalFinancialInformation.png";
import smoke from "../../assets/Images/life-Q1-smoke.png";
import vape from "../../assets/Images/life-Q2-vape.png";
import alcohal from "../../assets/Images/life-Q3-alcohal.png";
import drugs from "../../assets/Images/life-Q4-drugs.png";
import alpine from "../../assets/Images/alpine.png";
import travel from "../../assets/Images/travel-and-tourism.png";

//SVGs
import health from "../../assets/SVG/health-monitoring-svgrepo-com.svg";


const LifestyleInformationQuestions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let QuestionArray = [
        {
            title: "Do you Smoke ?",
            img: smoke,
            key: "LifestyleInformation_SmokerYesNo",
        },
        {
            title: "Do you Vape ?",
            img: vape,
            key: "LifestyleInformation_VapeYesNo",
        },
        {
            title: "Do you consume alcohol ?",
            img: alcohal,
            key: "LifestyleInformation_alcohol",
        },
        {
            title: "Do you use recreational drugs ?",
            img: drugs,
            key: "LifestyleInformation_RecreationalDrugs",
        },
        {
            title: "Do you participate in any hazardous activities or sports ?",
            img: alpine,
            key: "hazardousActivitiesSports_DynamicYesNo",
        },
        {
            title: "Have you traveled or do you plan to travel overseas to high-risk regions?",
            img: travel,
            key: "hazardousActivitiesSports_travelOverseas",
        },
    ]


    const QuestionClick = (index, elem, values, setFieldValue) => {
        // console.log("image clicked in goals", index, elem.key, values);

        if (!values[elem.key]) {
            setFieldValue(elem.key, "Yes");
            return
        }

        if (values[elem.key] == "No") {
            setFieldValue(elem.key, "Yes");
        }
        if (values[elem.key] == "Yes") {
            setFieldValue(elem.key, "No");
        }
    }


    return (
        <div className="container">
            <div className="row my-3 justify-content-center">
                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />
            </div>
        </div>
    )
}

export default LifestyleInformationQuestions
