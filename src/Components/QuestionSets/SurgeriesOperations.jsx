import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'

const SurgeriesOperations = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let HbA1cReadingOption = [
        { value: "", label: "Select" },
        { value: "Less than 5.7% (Normal)", label: "Less than 5.7% (Normal)" },
        { value: "5.7% - 6.4% (Pre-Diabetes)", label: "5.7% - 6.4% (Pre-Diabetes)" },
        { value: "6.5% or higher (Diabetes)", label: "6.5% or higher (Diabetes)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let ElectiveRequiredSurgery = [
        { value: "", label: "Select" },
        { value: "Elective", label: "Elective" },
        { value: "Required", label: "Required" },
    ]

    let CurrentStatus = [
        { value: "", label: "Select" },
        { value: "Fully recovered", label: "Fully recovered" },
        { value: "Ongoing issues", label: "Ongoing issues" },
        { value: "Other", label: "Other" },
    ]

    let TypeOfSurgeryOperation = [
        { value: "", label: "Select" },
        { value: "Input field for surgery", label: "Input field for surgery" },
        { value: "Operation type", label: "operation type" },
    ]

    let TestChange = (e, rowIndex, heading) => {
        console.log(e, rowIndex, heading.attribute)

        switch (e.target.name) {
            case Data.key + "_TypeDiabetes-" + rowIndex:
                let ValueArray = e.target.value.map((item) => item.value)
                setFieldValue(e.target.name, ValueArray)
                break;
            default:
                setFieldValue(e.target.name, e.target.values)
                break;
        }
    }

    const headings = [
        { label: "No#", attribute: "renderIndex" },
        { label: "Type of surgery/operation", attribute: Data.key + "_TypeOfSurgeryOperation", onChange: TestChange, inputType: "select", options: TypeOfSurgeryOperation, styleSet: { minWidth: "13rem" } },
        { label: "Date of surgery/operation", attribute: Data.key + "_DateOfSurgeryOperation", onChange: TestChange, inputType: "date", showYearPicker: true, placeholder: "yyyy", dateFormat: "yyyy" },
        { label: "Was it elective or required surgery?", attribute: Data.key + "_ElectiveRequiredSurgery", onChange: TestChange, inputType: "select", options: ElectiveRequiredSurgery, className: "form-select" },
        { label: "Current status", attribute: Data.key + "_CurrentStatus", attribute2: Data.key + "_CurrentStatusOther", onChange: TestChange, inputType: "select&textArea", options: CurrentStatus, className: "form-select" },

    ];

    const data = [
        {
            [`${Data.key}_TypeDiabetes`]: "",
            [`${Data.key}_DateOfDiagnosis`]: "",
            [`${Data.key}_Treatment`]: "",
            [`${Data.key}_TreatmentOther`]: "",
            [`${Data.key}_HbA1cReading`]: "",
            [`${Data.key}_GlucoseReading`]: "",
        }
    ];


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Any surgeries or operations in the past 10 years ?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>
                {
                    values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center'>
                            <div className='col-md-10'>
                                <div className='mt-4'>
                                    <DynamicTableFields headings={headings} data={data} onChange={() => { console.log("what the") }} setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} />
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default SurgeriesOperations
