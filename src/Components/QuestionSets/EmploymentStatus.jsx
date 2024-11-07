import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const EmploymentStatus = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data



    let optionsMultiSelect = [
        { value: "", label: "Select" },
        { value: "Full-time", label: "Full-time" },
        { value: "Part-time", label: "Part-time" },
        { value: "Casual", label: "Casual" },
        { value: "Self-employed", label: "Self-employed" },
        { value: "Contract", label: "Contract" },
        { value: "Other", label: "Other" }
    ]

    let Nev = useNavigate()

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>

                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            {Data.key === "SecondOccupation" ? "Do you have a second occupation?" : "Are you currently employed?"}
                        </label>
                    </div>
                    <div className='col-md-4 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_DynamicYesNo`] === "No" ? Data.key !== "SecondOccupation" &&
                    <div className='row justify-content-center mt-4'>
                        <div className='col-md-7 mb-2'>
                            <label htmlFor={`${Data.key}_Situation`} className='fw-bold'>*Please explain your current situation</label>
                        </div>
                        <div className='col-md-7'>
                            <CInput name={`${Data.key}_Situation`} type="textarea" rows={4} />
                        </div>
                    </div>
                    :
                    <div className='row justify-content-center mt-4'>
                        <div className='col-md-12 mb-2'>
                            <h4 className='fw-bold text-center'>
                                {Data.key === "SecondOccupation" ? "Second " : "Current "}
                                Employment Details
                            </h4>
                        </div>
                        <div className='col-md-12 mt-4'>
                            <div className='row justify-content-center align-item-center gap-2'>
                                <div className='col-md-4 pt-2'>
                                    <label htmlFor={`${Data.key}_OccupationJobTitle`} className='fw-bold'>Occupation/Job Title</label>
                                </div>
                                <div className='col-md-4'>
                                    <CInput name={`${Data.key}_OccupationJobTitle`} type="text" />
                                </div>
                                <div className='col-md-4 pt-2'>
                                    <label htmlFor={`${Data.key}_EmploymentType`} className='fw-bold'>Employment Type</label>
                                </div>
                                <div className='col-md-4'>
                                    <CInput name={`${Data.key}_EmploymentType`} options={optionsMultiSelect} className={"form-select"} type="select" />
                                </div>
                                {
                                    values[`${Data.key}_EmploymentType`] === "Other" &&
                                    <React.Fragment>

                                        <div className='col-md-4 pt-2'>
                                            <label htmlFor={`${Data.key}_Other`} className='fw-bold'>Other</label>
                                        </div>
                                        <div className='col-md-4'>
                                            <CInput name={`${Data.key}_Other`} type="textarea" rows={2} />
                                        </div>
                                    </React.Fragment>}

                            </div>
                        </div>
                    </div>
                }


            </div>
        </div>
    )
}

export default EmploymentStatus
