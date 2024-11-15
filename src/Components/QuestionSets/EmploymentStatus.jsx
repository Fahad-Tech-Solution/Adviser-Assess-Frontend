import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import employed from "../../assets/Images/Occupational-Financial Information/Emplyment-Icon-1.png"
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'
import { Divider } from 'antd'


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
                    <div className='col-md-6 mt-5'>
                        <DynamicCard
                            iconSrc={employed}
                            Head={`${Data.key === "SecondOccupation" ? "Second " : "Current "} Employment Details`}
                            altText="Medical History Icon"
                        >
                            <div className='col-md-12 my-2'>
                                <label className='fw-bold w-100 text-center mb-2'>{Data.key === "SecondOccupation" ? "Do you have a second occupation ?" : "Are you currently employed ?"} </label>
                                <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                            </div>
                            {values[`${Data.key}_DynamicYesNo`] === "No" ? Data.key !== "SecondOccupation" &&
                                <div className='col-md-12 mt-2'>
                                    <CInput name={`${Data.key}_Situation`} type="textarea" rows={4} label="*Please explain your current situation" />
                                </div> :
                                <React.Fragment>
                                    <div className='col-md-12 mt-2'>
                                        <CInput name={`${Data.key}_OccupationJobTitle`} type="text" label="Occupation/Job Title" />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput name={`${Data.key}_EmploymentType`} options={optionsMultiSelect} className={"form-select"} type="select" label="Employment Type" />
                                    </div>
                                    {
                                        values[`${Data.key}_EmploymentType`] === "Other" &&
                                        <div className='col-md-12 mt-2'>
                                            <CInput name={`${Data.key}_Other`} type="textarea" rows={2} label="Other" />
                                        </div>

                                    }
                                </React.Fragment>
                            }
                        </DynamicCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmploymentStatus
