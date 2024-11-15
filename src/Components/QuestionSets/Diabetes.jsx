import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import DiabetesIcon from "../../assets/Images/Diabetes.png";
import CInput from '../../assets/Custom/CInput';

const Diabetes = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let HbA1cReadingOption = [
        { value: "", label: "Select" },
        { value: "Less than 5.7% (Normal)", label: "Less than 5.7% (Normal)" },
        { value: "5.7% - 6.4% (Pre-Diabetes)", label: "5.7% - 6.4% (Pre-Diabetes)" },
        { value: "6.5% or higher (Diabetes)", label: "6.5% or higher (Diabetes)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let GlucoseReadingOption = [
        { value: "", label: "Select" },
        { value: "Less than 100 mg/dL (Normal)", label: "Less than 100 mg/dL (Normal)" },
        { value: "100 - 125 mg/dL (Pre-Diabetes)", label: "100 - 125 mg/dL (Pre-Diabetes)" },
        { value: "126 mg/dL or higher (Diabetes)", label: "126 mg/dL or higher (Diabetes)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let TreatmentOption = [
        { value: "", label: "Select" },
        { value: "Insulin", label: "Insulin" },
        { value: "Oral Medication", label: "Oral Medication" },
        { value: "Diet/Exercise Only", label: "Diet/Exercise Only" },
        { value: "Other", label: "Other" },
    ]

    let TypeDiabetesOption = [
        { value: "Type 1 Diabetes", label: "Type 1" },
        { value: "Type 2 Diabetes", label: "Type 2" },
    ]


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Diabetes (Type 1 or Type 2) ?
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
                                                iconSrc={DiabetesIcon}
                                                Head={"Diabetes"}
                                                altText="Medical History Icon"
                                            >
                                                <div className='col-md-12 mt-2'>
                                                    <CInput label="Type of Diabetes" name={Data.key + "_TypeDiabetes"} type="Select" options={TypeDiabetesOption} className={"form-select"} />
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={Data.key + "_DateOfDiagnosis"} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                                </div>
                                                <div className='col-md-12 mt-2'>
                                                    <CInput label="Treatment" name={Data.key + "_Treatment"} type="Select" options={TreatmentOption} className={"form-select"} />
                                                </div>

                                                {values[Data.key + "_Treatment"] === "Other" &&
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput name={Data.key + "_TreatmentOther"} type="textarea" placeholder="Other" rows={2} label="Other" />
                                                    </div>
                                                }

                                                <div className='col-md-12 mt-2'>
                                                    <CInput label="Latest HbA1c Reading (%)" name={Data.key + "_HbA1cReading"} type="Select" options={HbA1cReadingOption} className={"form-select"} />
                                                </div>

                                                <div className='col-md-12 mt-2'>
                                                    <CInput label="Latest Fasting Glucose Reading (mg/dL)" name={Data.key + "_GlucoseReading"} type="Select" options={GlucoseReadingOption} className={"form-select"} />
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

export default Diabetes
