import React from 'react'
import DynamicQuestionBlocks from '../../assets/Custom/DynamicQuestionBlocks/DynamicQuestionBlocks'


import overseas from "../../assets/Images/OccupationalFinancialInformation.png";
import Health__Medical_History from "../../assets/Images/Health__Medical_History.png";
import Diabetes from "../../assets/Images/Diabetes.png";
import asthma from "../../assets/Images/asthma.png";
import ribbon from "../../assets/Images/ribbon.png";
import arthritis from "../../assets/Images/arthritis.png";
import injury from "../../assets/Images/injury.png";
import psychology from "../../assets/Images/psychology.png";
import liver from "../../assets/Images/liver-cancer.png";
import HIV from "../../assets/Images/ribbon-HIV.png";
import headache from "../../assets/Images/headache.png";
import surgery from "../../assets/Images/surgery.png";
import health from "../../assets/Images/High_Blood_Pressure_or_High_Cholesterol.png";

//SVGs
// import health from "../../assets/SVG/health-monitoring-svgrepo-com.svg";


const HealthMedicalConditions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let QuestionArray = [
        {
            title: "Heart disease or conditions",
            img: Health__Medical_History,
            key: "heartDiseaseConditions_DynamicYesNo",
        },
        {
            title: "High Blood Pressure or High Cholesterol",
            img: health,
            key: "HighBloodPressureHighCholesterol_DynamicYesNo",
        },
        {
            title: "Respiratory conditions",
            img: asthma,
            key: "RespiratoryConditions_DynamicYesNo",
        },
        {
            title: "Cancer, Tumors, Cysts",
            img: ribbon,
            key: "CancerTumorsCysts_DynamicYesNo",
        },
        {
            title: "Diabetes (Type 1 or Type 2)",
            img: Diabetes,
            key: "Diabetes_DynamicYesNo",
        },
        {
            title: "Mental Health Conditions",
            img: psychology,
            key: "MentalHealthConditions_DynamicYesNo",
        },
        {
            title: "Back or Neck Pain",
            img: injury,
            key: "BackNeckPain_DynamicYesNo",
        },
        {
            title: "Stroke or Neurological Conditions",
            img: headache,
            key: "StrokeNeurologicalConditions_DynamicYesNo",
        },
        {
            title: "Liver, Kidney, or Gastrointestinal Conditions",
            img: liver,
            key: "LiverKidneyGastrointestinalConditions_DynamicYesNo",
        },
        {
            title: "Arthritis or Joint Disorders",
            img: arthritis,
            key: "ArthritisJointDisorders_DynamicYesNo",
        },
        {
            title: "HIV/AIDS or other Immune System Disorders",
            img: HIV,
            key: "HIVAIDSOtherImmuneSystemDisorders_DynamicYesNo",
        },
        {
            title: "Surgeries or Operations",
            img: surgery,
            key: "SurgeriesOperations_DynamicYesNo",
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
            <div className="row mb-3 mt-1 justify-content-center">
                <div className='col-md-12'>
                    <h5 className=' text-center'>Do you have any of the following Health Issues ?</h5>
                </div>
            </div>
            <div className="row my-3 justify-content-center">
                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />
            </div>
        </div>
    )
}

export default HealthMedicalConditions
