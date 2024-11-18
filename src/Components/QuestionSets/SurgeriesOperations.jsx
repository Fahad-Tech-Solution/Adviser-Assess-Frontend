import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'
import CInput from '../../assets/Custom/CInput'

import surgery from "../../assets/Images/surgery (1).png";

const SurgeriesOperations = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data


    let ElectiveRequiredSurgery = [
        { value: "", label: "Select" },
        { value: "Elective", label: "Elective" },
        { value: "Required", label: "Required" },
    ]

    let CurrentStatus = [
        { value: "", label: "Select" },
        { value: "Fully recovered", label: "Fully recovered" },
        { value: "Ongoing issues", label: "Ongoing issues" },
        { value: "Other", label: "Other" },
    ]

    let TypeOfSurgeryOperation = [
        { value: "", label: "Select" },
        { value: "Input field for surgery", label: "Input field for surgery" },
        { value: "Operation type", label: "operation type" },
    ]



    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1 mt-5'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Any surgeries or operations in the past 10 years ?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>
                {
                    values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='mt-4'>

                                <DynamicCard
                                    iconSrc={surgery}
                                    Head={"Surgeries or Operations"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12 mt-2'>
                                        <CInput label="Type of surgery/operation" name={Data.key + "_TypeOfSurgeryOperation"} type="Select" options={TypeOfSurgeryOperation} className={"form-select"} />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput label="Was it elective or required surgery?" name={Data.key + "_ElectiveRequiredSurgery"} type="Select" options={ElectiveRequiredSurgery} className={"form-select"} />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput label="Current status" name={Data.key + "_CurrentStatus"} type="Select" options={CurrentStatus} className={"form-select"} />
                                    </div>

                                    {values[Data.key + "_CurrentStatus"] === "Other" &&
                                        <div className='col-md-12 mt-2'>
                                            <CInput label="Current status Other" name={Data.key + "_CurrentStatus"} type="textarea" rows={2} />
                                        </div>
                                    }

                                </DynamicCard>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SurgeriesOperations
