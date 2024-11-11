import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'

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
                <h4 className='fw-bold text-center'>Work Environment</h4>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='hazardousDuties' className='text-center w-100 fw-bold'>
                            Do you perform any hazardous duties?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_hazardousDuties`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_hazardousDuties`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center align-item-center mt-4' style={{ rowGap: "10px" }}>
                            <div className='col-md-3 pt-2'>
                                <label htmlFor={`${Data.key}_Specify`} className='fw-bold'>Please Specify</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput name={`${Data.key}_Specify`} options={optionsMultiSelect} className={"form-select"} type="select" />
                            </div>
                        </div>
                        {
                            values[`${Data.key}_Specify`] === "Other" &&
                            <div className='row justify-content-center align-item-center mt-4' style={{ rowGap: "10px" }}>


                                <React.Fragment>
                                    <div className='col-md-3 pt-2'>
                                        <label htmlFor={`${Data.key}_OtherSpecify`} className='fw-bold'>Other</label>
                                    </div>
                                    <div className='col-md-3'>
                                        <CInput name={`${Data.key}_OtherSpecify`} type="textarea" rows={2} />
                                    </div>
                                </React.Fragment>
                            </div>}

                    </React.Fragment>}
            </div>
        </div>
    )
}

export default WorkEnvironment
