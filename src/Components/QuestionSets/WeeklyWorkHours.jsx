import React from 'react'
import CInput from '../../assets/Custom/CInput'

const WeeklyWorkHours = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <h4 className='fw-bold text-center'>Weekly Work Hours</h4>
                <div className='row justify-content-center gap-2 mt-4'>
                    <div className='col-md-5'>
                        <label htmlFor={`${Data.key}_primaryWorkHours`} className=' w-100 fw-bold'>
                            On average, how many hours do you work per week in your primary occupation?
                        </label>
                    </div>
                    <div className='col-md-3'>
                        <CInput id={`${Data.key}_primaryWorkHours`} name={`${Data.key}_primaryWorkHours`} type="text"
                            group={true}
                            groupIcon={"Hours"} />
                    </div>
                    {values["SecondOccupation_DynamicYesNo"] === "Yes" &&
                        <React.Fragment>
                            <div className='col-md-5'>
                                <label htmlFor={`${Data.key}_SecondWorkHours`} className=' w-100 fw-bold'>
                                    On average, how many hours do you work per week in your second occupation?
                                </label>
                            </div>
                            <div className='col-md-3'>
                                <CInput id={`${Data.key}_SecondWorkHours`} name={`${Data.key}_SecondWorkHours`} type="text"
                                    group={true}
                                    groupIcon={"Hours"} />
                            </div>
                        </React.Fragment>}

                    <div className='col-md-5 pt-2'>
                        <label htmlFor={`${Data.key}_workPerYear`} className=' w-100 fw-bold'>
                            How many weeks do you work per year?
                        </label>
                    </div>
                    <div className='col-md-3'>
                        <CInput id={`${Data.key}_workPerYear`} name={`${Data.key}_workPerYear`} type="text"
                            group={true}
                            groupIcon={"Weeks"} />
                    </div>

                    <div className='col-md-5'>
                        <label htmlFor={`${Data.key}_FIFO`} className=' w-100 fw-bold'>
                            If you work on a FIFO (Fly-In Fly-Out) basis, please specify your roster:
                        </label>
                    </div>
                    <div className='col-md-3'>
                        <CInput name={`${Data.key}_FIFO`} type="textarea" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeeklyWorkHours
