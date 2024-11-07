import React from 'react'
import CInput from '../../assets/Custom/CInput'
import { toCommaAndDollar, toNumericValue } from '../../assets/Api/Api'

const SelfEmploymentDetails = (props) => {

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <h4 className='fw-bold text-center'>Self Employment Details</h4>

                <div className='row justify-content-center gap-2 mt-4'>
                    <div className='col-md-4 pt-2 '>
                        <label htmlFor={`${Data.key}_BusinessName`} className=' w-100 fw-bold'>
                            Business Name
                        </label>
                    </div>
                    <div className='col-md-4'>
                        <CInput id={`${Data.key}_BusinessName`} name={`${Data.key}_BusinessName`} type="text" />
                    </div>
                    <div className='col-md-4 pt-2 '>
                        <label htmlFor={`${Data.key}_NatureOfBusiness`} className=' w-100 fw-bold'>
                            Nature of Business
                        </label>
                    </div>
                    <div className='col-md-4'>
                        <CInput id={`${Data.key}_NatureOfBusiness`} name={`${Data.key}_NatureOfBusiness`} type="text" />
                    </div>
                    <div className='col-md-4 pt-2 '>
                        <label htmlFor={`${Data.key}_StartDateOfBusiness`} className=' w-100 fw-bold'>
                            Start Date of Business
                        </label>
                    </div>
                    <div className='col-md-4'>
                        <CInput id={`${Data.key}_StartDateOfBusiness`} name={`${Data.key}_StartDateOfBusiness`} type="text" />
                    </div>
                    <div className='col-md-4 pt-2 '>
                        <label htmlFor={`${Data.key}_NetProfit`} className=' w-100 fw-bold'>
                            Net Profit
                        </label>
                    </div>
                    <div className='col-md-4'>
                        <CInput id={`${Data.key}_NetProfit`} name={`${Data.key}_NetProfit`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(toNumericValue(currentInput.value))) }} />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SelfEmploymentDetails
