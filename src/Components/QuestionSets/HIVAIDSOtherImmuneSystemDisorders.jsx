import React, { useEffect, useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import Other from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_8_otherDisease.png";
import { Divider } from 'antd'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import bloodSample from "../../assets/Images/hiv/blood-sample-min.png";
import hiv from "../../assets/Images/hiv/hiv-min.png";

const HIVAIDSOtherImmuneSystemDisorders = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "HIV", label: "HIV" },
        { value: "AID", label: "AID" },
        { value: "Other", label: "Other" },
    ]

    const handleMultiSelectChange = ({ target }) => {
        let selectedArray = target.value;

        console.log(selectedArray);

        // Check if "Other" or "Unknown" is selected
        const hasOther = selectedArray.some((item) => item.value === "Other");
        const hasUnknown = selectedArray.some((item) => item.value === "Unknown");

        const otherIndex = selectedArray.findIndex((item) => item.value === "Other");
        const unknownIndex = selectedArray.findIndex((item) => item.value === "Unknown");

        if (unknownIndex === 1 && otherIndex === 0) {
            setFieldValue(target.name, ["Unknown"]);
            return;
        }

        // If only "Other" or "Unknown" is selected, or if it is the last selection, set only that value
        if (
            (selectedArray.length === 1 && (hasOther || hasUnknown)) ||
            (selectedArray.length === 2 && ((hasOther && otherIndex === 1) || (hasUnknown && unknownIndex === 1)))
        ) {
            setFieldValue(target.name, [hasOther ? "Other" : "Unknown"]);
            return;
        }

        // If "Other" or "Unknown" is present in a larger selection, prioritize it and set only ["Other"] or ["Unknown"]
        if ((hasOther && selectedArray.length > 2) || (hasUnknown && selectedArray.length > 2)) {
            setFieldValue(target.name, [hasOther ? "Other" : "Unknown"]);
        } else {
            // Filter out any "Other" or "Unknown" values and use the remaining selected items
            const filtered = selectedArray
                .filter((item) => item.value !== "Other" && item.value !== "Unknown")
                .map((item) => item.value);
            setFieldValue(target.name, filtered);

        }
    };

    let MedicationOption = [
        { value: "", label: "Select" },
        { value: "Antiretroviral therapy (ART)", label: "Antiretroviral therapy (ART)" },
        { value: "Immunosuppressive drugs", label: "Immunosuppressive drugs" },
        { value: "Other", label: "Other" },
    ]


    let Images = {
        "HIV": hiv,
        "AID": bloodSample,
        "Other": Other,
    }

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any HIV/AIDS or other Immune System Disorders ?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>
                {
                    values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center mt-4'>

                            <Divider orientation="center"
                                style={{
                                    color: '#36b446',
                                    fontWeight: "700",
                                    fontSize: "16px"
                                }} >Condition diagnosed</Divider>

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
                        </div>

                        {Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].includes("Other") && (
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
                                                            <CInput label={"Other Details"} name={`${Data.key}_Other`} type="textarea" rows={2} />
                                                        </div>
                                                    </DynamicCard>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}


                        {
                            Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].length > 0 &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Other") &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Unknown") && (
                                <div className='row justify-content-center'>
                                    <div className='col-md-6'>
                                        <div className='mt-4'>
                                            {Array.from({ length: values[`${Data.key}_diseaseAndConditions`].length || 0 }).map((elem, i) => {
                                                let diseaseAndConditions = values[`${Data.key}_diseaseAndConditions`];
                                                return (
                                                    <DynamicCard
                                                        iconSrc={Images[diseaseAndConditions[i]]}
                                                        Head={diseaseAndConditions[i]}
                                                        altText={diseaseAndConditions[i]}
                                                    >
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis${i}`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                                        </div>
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label="Medications or Treatment" name={Data.key + "_MedicationsTreatment" + i} type="Select" options={MedicationOption} className={"form-select"} />
                                                        </div>

                                                        {values[Data.key + "_MedicationsTreatment" + i] === "Other" &&
                                                            <div className='col-md-12 mt-2'>
                                                                <CInput label="Other" name={Data.key + "_MedicationsTreatmentOther" + i} type="textarea" rows={2} />
                                                            </div>
                                                        }
                                                    </DynamicCard>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                    </React.Fragment>
                }


            </div>
        </div>
    )
}

export default HIVAIDSOtherImmuneSystemDisorders
