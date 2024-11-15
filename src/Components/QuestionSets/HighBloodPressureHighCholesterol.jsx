import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import health from "../../assets/Images/High_Blood_Pressure_or_High_Cholesterol.png";

const HighBloodPressureHighCholesterol = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let LatestBloodPressureOption = [
        { value: "", label: "Select" },
        { value: "Less than 120/80 (Normal)", label: "Less than 120/80 (Normal)" },
        { value: "120-129 / Less than 80 (Elevated)", label: "120-129 / Less than 80 (Elevated)" },
        { value: "130-139 / 80-89 (Hypertension Stage 1)", label: "130-139 / 80-89 (Hypertension Stage 1)" },
        { value: "140-159 / 90-99 (Hypertension Stage 2)", label: "140-159 / 90-99 (Hypertension Stage 2)" },
        { value: "160 or higher / 100 or higher (Hypertension Stage 2)", label: "160 or higher / 100 or higher (Hypertension Stage 2)" },
        { value: "Higher than 180/120 (Hypertensive Crisis)", label: "Higher than 180/120 (Hypertensive Crisis)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let LatestCholesterolOption = [
        { value: "", label: "Select" },
        { value: "Less than 200 (Normal)", label: "Less than 200 (Normal)" },
        { value: "200-239 (Borderline High)", label: "200-239 (Borderline High)" },
        { value: "240 or higher (High)", label: "240 or higher (High)" },
        { value: "Unknown", label: "Unknown" },
    ]

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any High Blood Pressure or High Cholesterol ?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-md-6 mt-5'>
                        {values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                            <React.Fragment>
                                <div className='row justify-content-center' >
                                    {Array.from({ length: 1 }).map((elem, i) => {
                                        return (
                                            <DynamicCard
                                                iconSrc={health}
                                                Head={"High Blood Pressure or High Cholesterol"}
                                                altText="Medical History Icon"
                                            >
                                                <div className='col-md-12 mt-2'>
                                                    <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={Data.key + "_DateOfDiagnosis"} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <CInput name={Data.key + "_LatestBloodPressure"} type="Select" options={LatestBloodPressureOption} className={"form-select"} label="Latest Blood Pressure Reading (mmHg)" />
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <CInput name={Data.key + "_LatestCholesterol"} type="Select" options={LatestCholesterolOption} className={"form-select"} label="Latest Cholesterol Reading (mg/dL)" />
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <CInput name={Data.key + "_MedicationsTreatment"} type="textarea" placeholder="Treatments or medications" rows={2} label="Medications or Treatment" />
                                                </div>
                                            </DynamicCard>
                                        )
                                    })}
                                </div>
                            </React.Fragment>}
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default HighBloodPressureHighCholesterol
