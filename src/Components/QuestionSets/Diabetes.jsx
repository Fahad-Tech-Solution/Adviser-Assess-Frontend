import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'

const Diabetes = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let HbA1cReadingOption = [
        { value: "", label: "Select" },
        { value: "Less than 5.7% (Normal)", label: "Less than 5.7% (Normal)" },
        { value: "5.7% - 6.4% (Pre-Diabetes)", label: "5.7% - 6.4% (Pre-Diabetes)" },
        { value: "6.5% or higher (Diabetes)", label: "6.5% or higher (Diabetes)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let GlucoseReadingOption = [
        { value: "", label: "Select" },
        { value: "Less than 100 mg/dL (Normal)", label: "Less than 100 mg/dL (Normal)" },
        { value: "100 - 125 mg/dL (Pre-Diabetes)", label: "100 - 125 mg/dL (Pre-Diabetes)" },
        { value: "126 mg/dL or higher (Diabetes)", label: "126 mg/dL or higher (Diabetes)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let TreatmentOption = [
        { value: "", label: "Select" },
        { value: "Insulin", label: "Insulin" },
        { value: "Oral Medication", label: "Oral Medication" },
        { value: "Diet/Exercise Only", label: "Diet/Exercise Only" },
        { value: "Other", label: "Other" },
    ]

    let TypeDiabetesOption = [
        { value: "Type 1 Diabetes", label: "Type 1" },
        { value: "Type 2 Diabetes", label: "Type 2" },
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
        { label: "Type of Diabetes", attribute: Data.key + "_TypeDiabetes", onChange: TestChange, inputType: "multiSelect", options: TypeDiabetesOption, styleSet: { minWidth: "13rem" } },
        { label: "Date of Diagnosis", attribute: Data.key + "_DateOfDiagnosis", onChange: TestChange, inputType: "date", showYearPicker: true, placeholder: "yyyy", dateFormat: "yyyy" },
        { label: "Treatment", attribute: Data.key + "_Treatment", attribute2: Data.key + "_TreatmentOther", onChange: TestChange, inputType: "select&textArea", options: TreatmentOption, className: "form-select" },
        { label: "Latest HbA1c Reading (%)", attribute: Data.key + "_HbA1cReading", onChange: TestChange, inputType: "select", options: HbA1cReadingOption, className: "form-select" },
        { label: "Latest Fasting Glucose Reading (mg/dL)", attribute: Data.key + "_GlucoseReading", onChange: TestChange, inputType: "select", options: GlucoseReadingOption, className: "form-select" },
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
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Diabetes (Type 1 or Type 2) ?
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

export default Diabetes
