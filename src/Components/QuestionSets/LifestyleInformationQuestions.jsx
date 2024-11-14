import React from 'react'
import DynamicQuestionBlocks from '../../assets/Custom/DynamicQuestionBlocks/DynamicQuestionBlocks'


import overseas from "../../assets/Images/OccupationalFinancialInformation.png";
import smoke from "../../assets/Images/life-Q1-smoke.png";
import vape from "../../assets/Images/life-Q2-vape.png";
import alcohal from "../../assets/Images/life-Q3-alcohal.png";
import drugs from "../../assets/Images/life-Q4-drugs.png";

//SVGs
import health from "../../assets/SVG/health-monitoring-svgrepo-com.svg";


const LifestyleInformationQuestions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let QuestionArray = [
        {
            title: "Do you smoke",
            img: smoke,
            key: "LifestyleInformation_SmokerYesNo",
        },
        {
            title: "High Blood Pressure or High Cholesterol",
            img: vape,
            key: "LifestyleInformation_VapeYesNo",
        },
        {
            title: "Respiratory conditions",
            img: alcohal,
            key: "LifestyleInformation_alcohol",
        },
        {
            title: "Cancer, Tumors, Cysts",
            img: drugs,
            key: "LifestyleInformation_RecreationalDrugs",
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
