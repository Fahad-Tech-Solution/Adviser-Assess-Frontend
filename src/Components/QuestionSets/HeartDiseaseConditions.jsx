import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'

import { Divider } from 'antd'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import heartDiseaseConditions_icon_3_chest_pain from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_3_chest_pain.png";
import heartDiseaseConditions_icon_4__heart from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_4__heart-failure.png";
import heartDiseaseConditions_icon_5_Hypertensive_Heart_Disease from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_5_Hypertensive_Heart_Disease.png";
import heartDiseaseConditions_icon_6_Heartvalve from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_6_Heartvalve.png";
import heartDiseaseConditions_icon1_Heart_Attack from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon1_Heart_Attack.png";
import Coronary_Artery_Disease_CAD from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions-icon-2-Coronary_Artery_Disease_CAD.png";
import heartDiseaseConditions_icon_8_otherDisease from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_8_otherDisease.png";
import Angina from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_3_chest-pain-or-pressure.png";




const HeartDiseaseConditions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "Coronary Artery Disease (CAD)", label: "Coronary Artery Disease (CAD)" },
        { value: "Heart Attack (Myocardial Infarction)", label: "Heart Attack (Myocardial Infarction)" },
        { value: "Arrhythmia (e.g., Atrial Fibrillation)", label: "Arrhythmia (e.g., Atrial Fibrillation)" },
        { value: "Heart Failure (Congestive Heart Failure)", label: "Heart Failure (Congestive Heart Failure)" },
        { value: "Angina", label: "Angina" },
        { value: "Hypertensive Heart Disease", label: "Hypertensive Heart Disease" },
        { value: "Heart Valve Disease", label: "Heart Valve Disease" },
        { value: "Other", label: "Other" }
    ]

    const handleMultiSelectChange = ({ target }) => {

        let selectedArray = target.value;

        // console.log(selectedArray);

        // Check if "No" is selected
        const hasNoValue = selectedArray.some((item) => item.value === "Other");
        const noIndex = selectedArray.findIndex((item) => item.value === "Other");

        // If only "No" is selected or if "No" is the last selection, set only ["No"]
        if (
            (selectedArray.length === 1 && hasNoValue) ||
            (selectedArray.length === 2 && hasNoValue && noIndex === 1)
        ) {
            setFieldValue(target.name, ["Other"]);
            return;
        }

        if (hasNoValue && selectedArray.length > 2) {
            // If "No" is present in a larger selection, prioritize it and set only ["No"]
            setFieldValue(target.name, ["Other"]);
        } else {
            // Filter out any "No" values and use the remaining selected items
            const filtered = selectedArray
                .filter((item) => item.value !== "Other")
                .map((item) => item.value);
            setFieldValue(target.name, filtered);
        }
    };

    let ongoingResolvedOption = [
        { value: "", label: "Select" },
        { value: "Ongoing", label: "Ongoing" },
        { value: "Resolved", label: "Resolved" },
    ]


    let Images = {
        "Coronary Artery Disease (CAD)": Coronary_Artery_Disease_CAD,
        "Heart Attack (Myocardial Infarction)": heartDiseaseConditions_icon1_Heart_Attack,
        "Arrhythmia (e.g., Atrial Fibrillation)": heartDiseaseConditions_icon_4__heart,
        "Heart Failure (Congestive Heart Failure)": heartDiseaseConditions_icon_5_Hypertensive_Heart_Disease, // na 
        "Hypertensive Heart Disease": heartDiseaseConditions_icon_3_chest_pain,
        "Angina": Angina,
        "Heart Valve Disease": heartDiseaseConditions_icon_6_Heartvalve,
        "Other": heartDiseaseConditions_icon_8_otherDisease,
    }


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Heart disease or conditions ?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                <Divider orientation="center"
                    style={{
                        color: '#36b446',
                        fontWeight: "700",
                        fontSize: "16px"
                    }}
                >Select the type of heart disease or condition that applies to you ?</Divider>
                {
                    values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center mt-4'>
                            <div className='col-md-8'>
                                <div className='d-flex w-100 justify-content-center'>
                                    <div style={{ minWidth: "25%" }}>
                                        <Field
                                            name={`${Data.key}_diseaseAndConditions`}
                                            component={CreatableMultiSelectField}
                                            label="Multi Select Field"
                                            options={optionsMultiSelect}
                                            onChange={handleMultiSelectChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                                values[`${Data.key}_diseaseAndConditions`].includes("Other") && (
                                    <React.Fragment>
                                        <div className='row justify-content-center'>
                                            <div className='col-md-6 mt-5'>
                                                <DynamicCard
                                                    iconSrc={Images.Other}
                                                    // Head={"Other"}
                                                    altText="Medical History Icon"
                                                >
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput label={"Other Details"} name={`${Data.key}_Other`} type="textarea" rows={2} />
                                                    </div>
                                                </DynamicCard>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )}</div>

                        {(Array.isArray(values[`${Data.key}_diseaseAndConditions`]) && values[`${Data.key}_diseaseAndConditions`].length > 0 && !values[`${Data.key}_diseaseAndConditions`].includes("Other")) &&
                            <div className='row justify-content-center'>
                                <div className='col-md-6'>
                                    <div className='mt-4'>
                                        {Array.from({ length: values[`${Data.key}_diseaseAndConditions`].length || 0 }).map((elem, i) => {
                                            let diseaseAndConditions = values[`${Data.key}_diseaseAndConditions`];
                                            return (
                                                <DynamicCard
                                                    iconSrc={Images[diseaseAndConditions[i]]}
                                                    Head={diseaseAndConditions[i]}
                                                    altText="Medical History Icon"
                                                >
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis${i}`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                                    </div>
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput name={Data.key + "ongoingResolved" + i} type="Select" options={ongoingResolvedOption} className={"form-select"} label="Condition Status" />
                                                    </div>
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput name={Data.key + "treatmentsMedications" + i} type="textarea" placeholder="Treatments or medications" rows={1} label="Treatments/Medications" />
                                                    </div>
                                                </DynamicCard>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>}
                    </React.Fragment>}
            </div>
        </div>
    )
}

export default HeartDiseaseConditions
