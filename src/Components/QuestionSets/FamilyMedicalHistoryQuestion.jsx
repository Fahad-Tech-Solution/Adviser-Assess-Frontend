import React from 'react'
import DynamicQuestionBlocks from '../../assets/Custom/DynamicQuestionBlocks/DynamicQuestionBlocks'


import overseas from "../../assets/Images/OccupationalFinancialInformation.png";
import heart from "../../assets/Images/Family-Q1-heart.png";
import lung_cancer from "../../assets/Images/Family-Q2-lung-cancer.png";
import Diabetes from "../../assets/Images/Diabetes.png";
import psychology from "../../assets/Images/psychology.png";

//SVGs
import health from "../../assets/SVG/health-monitoring-svgrepo-com.svg";


const FamilyMedicalHistoryQuestion = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let QuestionArray = [
        {
            title: "Do anyone had Heart Disease or Stroke?",
            img: heart,
            key: "FamilyMedicalHistory_HeartDisease",
        },
        {
            title: "Do anyone had Cancer?",
            img: lung_cancer,
            key: "FamilyMedicalHistory_Cancer",
        },
        {
            title: "Do anyone had Diabetes",
            img: Diabetes,
            key: "FamilyMedicalHistory_Diabetes",
        },
        {
            title: "Do anyone had Mental Health Conditions?",
            img: psychology,
            key: "FamilyMedicalHistory_MentalHealthConditions",
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

export default FamilyMedicalHistoryQuestion
