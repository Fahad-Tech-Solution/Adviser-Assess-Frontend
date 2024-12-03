import React from 'react'
import CInput from '../../assets/Custom/CInput'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import WorkHoure from '../../assets/Images/Occupational-Financial Information/Employement-Icon-4-WorkHoure.png'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'

const WeeklyWorkHours = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>

                <DynamicCard
                    iconSrc={WorkHoure}
                    Head={`Work Hours`}
                    altText="Medical History Icon"
                >
                    <div className='col-md-12 mt-2'>
                        <CInput label={"On average, how many hours do you work per week in your primary occupation?"} id={`${Data.key}_primaryWorkHours`} name={`${Data.key}_primaryWorkHours`} type="number" group={true} groupIcon={"Hours"} />
                    </div>

                    {values["SecondOccupation_DynamicYesNo"] === "Yes" &&
                        <div className='col-md-12 mt-2'>
                            <CInput label={"On average, how many hours do you work per week in your second occupation ?"} id={`${Data.key}_SecondWorkHours`} name={`${Data.key}_SecondWorkHours`} type="number" group={true} groupIcon={"Hours"} />
                        </div>
                    }

                    <div className='col-md-12 mt-2'>
                        <CInput label={"How many weeks do you work per year ?"} id={`${Data.key}_workPerYear`} name={`${Data.key}_workPerYear`} type="number" group={true} groupIcon={"Weeks"} />
                    </div>

                    <div className='col-md-12 my-2'>
                        <label className='fw-bold w-100 text-center mb-2'>If you work on a FIFO (Fly-In Fly-Out) basis, please specify your roster </label>
                        <DynamicYesNo name={`${Data.key}_FIFO`} values={values} handleChange={handleChange} />
                    </div>

                </DynamicCard>


            </div>
        </div>
    )
}

export default WeeklyWorkHours
