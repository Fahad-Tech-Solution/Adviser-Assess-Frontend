import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo';
import CInput from '../../assets/Custom/CInput';
import { toCommaAndDollar, toNumericValue } from '../../assets/Api/Api';
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard';

import IncomeInformationIcon from "../../assets/Images/Occupational-Financial Information/Employement-Icon-1-information.png"

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
                <div className='row justify-content-center'>
                    <div className='col-md-6 mt-5'>
                        <DynamicCard
                            iconSrc={IncomeInformationIcon}
                            Head={`Income Information`}
                            altText="Medical History Icon"
                        >
                            <div className='col-md-12 mt-2'>
                                <CInput label={"Annual Pre-tax Income (excluding super) for primary occupation"} id={`${Data.key}_primaryOccupation`} name={`${Data.key}_primaryOccupation`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))) }} />
                            </div>
                            {values["SecondOccupation_DynamicYesNo"] === "Yes" &&
                                <div className='col-md-12 mt-2'>
                                    <CInput label={"Annual Pre-tax Income (excluding super) for Secondary occupation"} id={`${Data.key}_SecondaryOccupation`} name={`${Data.key}_SecondaryOccupation`} type="text" onChangeCallback={(v, setFieldValue, currentInput) => { setFieldValue(currentInput.name, toCommaAndDollar(currentInput.value.replace(/[^0-9.-]+/g, ""))) }} />
                                </div>
                            }
                            <div className='col-md-12 mt-2'>
                                <CInput label="How is your income structured ?" name={`${Data.key}_incomeStructured`} id={`${Data.key}_incomeStructured`} className={"form-select"} type="select" options={options} />
                            </div>
                            {values[`${Data.key}_incomeStructured`] === "Other" &&
                                <div className='col-md-12 mt-2'>
                                    <CInput label={"Other income structured"} id={`${Data.key}_otherIncomeStructured`} name={`${Data.key}_otherIncomeStructured`} type="textarea" rows={2} />
                                </div>
                            }
                        </DynamicCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IncomeInformation
