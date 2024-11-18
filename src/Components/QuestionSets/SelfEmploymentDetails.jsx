import React from 'react'
import CInput from '../../assets/Custom/CInput'
import { toCommaAndDollar, toNumericValue } from '../../assets/Api/Api'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import WorkFromHome from '../../assets/Images/Occupational-Financial Information/Employement-Icon-5-work-from-home.png'

const SelfEmploymentDetails = (props) => {

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>


                        <DynamicCard
                            iconSrc={WorkFromHome}
                            Head={`Self Employment Details`}
                            altText="Medical History Icon"
                        >
                            {/*
                             label={"Business Name"} 
                                 */}
                            <div className='col-md-12 mt-2'>
                                <CInput label={"Business Name"} id={`${Data.key}_BusinessName`} name={`${Data.key}_BusinessName`} type="text" />
                            </div>

                            <div className='col-md-12 mt-2'>
                                <CInput label={"Nature of Business"} id={`${Data.key}_NatureOfBusiness`} name={`${Data.key}_NatureOfBusiness`} type="text" />
                            </div>

                            <div className='col-md-12 mt-2'>
                                <CInput label={"Start Date of Business"} id={`${Data.key}_StartDateOfBusiness`} name={`${Data.key}_StartDateOfBusiness`} type="text" />
                            </div>

                            <div className='col-md-12 mt-2'>
                                <CInput label={"Net Profit"} id={`${Data.key}_NetProfit`} name={`${Data.key}_NetProfit`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))) }} />
                            </div>
                        </DynamicCard>

            </div>
        </div>
    )
}

export default SelfEmploymentDetails
