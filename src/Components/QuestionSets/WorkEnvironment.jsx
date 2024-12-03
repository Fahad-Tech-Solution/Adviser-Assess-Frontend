import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'



import WorkEnvironmentIcon from '../../assets/Images/Occupational-Financial Information/Employement-Icon-3-environment.png'

const WorkEnvironment = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "", label: "Select" },
        { value: "Using or handling explosives", label: "Using or handling explosives" },
        { value: "Working offshore, underground, at heights above 10 metres, or underwater", label: "Working offshore, underground, at heights above 10 metres, or underwater" },
        { value: "Using or handling needles, medical sharps, or biohazardous materials", label: "Using or handling needles, medical sharps, or biohazardous materials" },
        { value: "Other", label: "Other" }
    ]

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>


                <DynamicCard
                    iconSrc={WorkEnvironmentIcon}
                    Head={`Work Environment`}
                    altText="Work Environment Icon"
                >
                    <div className='col-md-12 my-2'>
                        <label className='fw-bold w-100 text-center mb-2'> Do you perform any hazardous duties ?</label>
                        <DynamicYesNo name={`${Data.key}_hazardousDuties`} values={values} handleChange={handleChange} />
                    </div>
                    {values[`${Data.key}_hazardousDuties`] === "Yes" &&
                        <React.Fragment>
                            <div className='col-md-12 mt-2'>
                                <CInput label={"Please Specify"} name={`${Data.key}_Specify`} options={optionsMultiSelect} className={"form-select"} type="select" />
                            </div>
                            {
                                values[`${Data.key}_Specify`] === "Other" &&
                                <div className='col-md-12 mt-2'>
                                    <CInput label={"Please Specify Others"} id={`${Data.key}_otherPleaseSpecify`} name={`${Data.key}_otherPleaseSpecify`} type="textarea" rows={2} />
                                </div>
                            }

                        </React.Fragment>}
                </DynamicCard>

            </div>
        </div>
    )
}

export default WorkEnvironment
