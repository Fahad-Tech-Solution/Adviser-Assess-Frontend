import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import partTime from "../../assets/Images/part-time.png"
import employed from "../../assets/Images/Occupational-Financial Information/Emplyment-Icon-1.png"
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'
import { Divider } from 'antd'
import IncomeInformation from './IncomeInformation'
import WorkEnvironment from './WorkEnvironment'
import WeeklyWorkHours from './WeeklyWorkHours'
import SelfEmploymentDetails from './SelfEmploymentDetails'


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



                        <DynamicCard
                            iconSrc={partTime}
                            Head={`Second Employment Details`}
                            altText="Medical History Icon"
                        >
                            <div className='col-md-12 my-2'>
                                <label className='fw-bold w-100 text-center mb-2'>Do you have a second occupation ?</label>
                                <DynamicYesNo name={`SecondOccupation_DynamicYesNo`} values={values} handleChange={handleChange} />
                            </div>
                            {values[`SecondOccupation_DynamicYesNo`] === "Yes" &&
                                <React.Fragment>
                                    <div className='col-md-12 mt-2'>
                                        <CInput name={`SecondOccupation_OccupationJobTitle`} type="text" label="Occupation/Job Title" />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput name={`SecondOccupation_EmploymentType`} options={optionsMultiSelect} className={"form-select"} type="select" label="Employment Type" />
                                    </div>
                                    {
                                        values[`SecondOccupation_EmploymentType`] === "Other" &&
                                        <div className='col-md-12 mt-2'>
                                            <CInput name={`SecondOccupation_Other`} type="textarea" rows={2} label="Other" />
                                        </div>
                                    }
                                </React.Fragment>
                            }
                        </DynamicCard>


                        <IncomeInformation
                            FormickOBj={props.FormickOBj}
                            Data={props.Data} />

                        <WorkEnvironment
                            FormickOBj={props.FormickOBj}
                            Data={props.Data} />

                        <WeeklyWorkHours
                            FormickOBj={props.FormickOBj}
                            Data={props.Data} />
                        
                        {values[`${Data.key}_EmploymentType`] === "Self-employed" &&

                            <SelfEmploymentDetails
                                FormickOBj={props.FormickOBj}
                                Data={props.Data} />

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmploymentStatus
