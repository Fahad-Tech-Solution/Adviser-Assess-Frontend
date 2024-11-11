import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo';
import CInput from '../../assets/Custom/CInput';
import { toCommaAndDollar, toNumericValue } from '../../assets/Api/Api';

const IncomeInformation = (props) => {

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data;

    let options = [
        { value: "", label: "Select" },
        { value: "Salary", label: "Salary" },
        { value: "Hourly Wage", label: "Hourly Wage" },
        { value: "Commission", label: "Commission" },
        { value: "Bonuses", label: "Bonuses" },
        { value: "Other", label: "Other" }
    ]


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <h4 className='fw-bold text-center'>Income Information</h4>
                <div className='row justify-content-center mt-4' style={{ rowGap: "10px" }}>
                    <div className='col-md-5 pt-2 '>
                        <label htmlFor={`${Data.key}_primaryOccupation`} className='text-center w-100 fw-bold'>
                            Annual Pre-tax Income (excluding super) for primary occupation
                        </label>
                    </div>
                    <div className='col-md-3 '>
                        <CInput id={`${Data.key}_primaryOccupation`} name={`${Data.key}_primaryOccupation`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(toNumericValue(currentInput.value))) }} />
                    </div>

                    {values["SecondOccupation_DynamicYesNo"] === "Yes" &&

                        <React.Fragment>
                            <div className='col-md-5 pt-2 '>
                                <label htmlFor={`${Data.key}_SecondaryOccupation`} className='text-center w-100 fw-bold'>
                                    Annual Pre-tax Income (excluding super) for Secondary occupation
                                </label>
                            </div>
                            <div className='col-md-3 '>
                                <CInput id={`${Data.key}_SecondaryOccupation`} name={`${Data.key}_SecondaryOccupation`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(toNumericValue(currentInput.value))) }} />
                            </div>
                        </React.Fragment>
                    }

                    <div className='col-md-5 pt-2 '>
                        <label htmlFor={`${Data.key}_incomeStructured`} className='text-center w-100 fw-bold'>
                            How is your income structured?
                        </label>
                    </div>
                    <div className='col-md-3 '>
                        <CInput name={`${Data.key}_incomeStructured`} id={`${Data.key}_incomeStructured`} className={"form-select"} type="select" options={options} />
                    </div>
                    {values[`${Data.key}_incomeStructured`] === "Other" &&
                        <React.Fragment>
                            <div className='col-md-5 pt-2  '>
                                <label htmlFor={`${Data.key}_otherIncomeStructured`} className='text-center w-100 fw-bold'>
                                    Other income structured
                                </label>
                            </div>
                            <div className='col-md-3 '>
                                <CInput id={`${Data.key}_otherIncomeStructured`} name={`${Data.key}_otherIncomeStructured`} type="textarea" rows={2} />
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}

export default IncomeInformation
