import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'

const HighBloodPressureHighCholesterol = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "", label: "Select" },
        { value: "Coronary Artery Disease (CAD)", label: "Coronary Artery Disease (CAD)" },
        { value: "Heart Attack (Myocardial Infarction)", label: "Heart Attack (Myocardial Infarction)" },
        { value: "Arrhythmia (e.g., Atrial Fibrillation)", label: "Arrhythmia (e.g., Atrial Fibrillation)" },
        { value: "Heart Failure (Congestive Heart Failure)", label: "Heart Failure (Congestive Heart Failure)" },
        { value: "Angina", label: "Angina" },
        { value: "Hypertensive Heart Disease", label: "Hypertensive Heart Disease" },
        { value: "Heart Valve Disease", label: "Heart Valve Disease" },
        { value: "Other", label: "Other" }
    ]

    const handleMultiSelectChange = ({ target }) => {

        let selectedArray = target.value;

        // console.log(selectedArray);

        // Check if "No" is selected
        const hasNoValue = selectedArray.some((item) => item.value === "Other");
        const noIndex = selectedArray.findIndex((item) => item.value === "Other");

        // If only "No" is selected or if "No" is the last selection, set only ["No"]
        if (
            (selectedArray.length === 1 && hasNoValue) ||
            (selectedArray.length === 2 && hasNoValue && noIndex === 1)
        ) {
            setFieldValue(target.name, ["Other"]);
            return;
        }

        if (hasNoValue && selectedArray.length > 2) {
            // If "No" is present in a larger selection, prioritize it and set only ["No"]
            setFieldValue(target.name, ["Other"]);
        } else {
            // Filter out any "No" values and use the remaining selected items
            const filtered = selectedArray
                .filter((item) => item.value !== "Other")
                .map((item) => item.value);
            setFieldValue(target.name, filtered);
        }
    };

    let LatestBloodPressureOption = [
        { value: "", label: "Select" },
        { value: "Less than 120/80 (Normal)", label: "Less than 120/80 (Normal)" },
        { value: "120-129 / Less than 80 (Elevated)", label: "120-129 / Less than 80 (Elevated)" },
        { value: "130-139 / 80-89 (Hypertension Stage 1)", label: "130-139 / 80-89 (Hypertension Stage 1)" },
        { value: "140-159 / 90-99 (Hypertension Stage 2)", label: "140-159 / 90-99 (Hypertension Stage 2)" },
        { value: "160 or higher / 100 or higher (Hypertension Stage 2)", label: "160 or higher / 100 or higher (Hypertension Stage 2)" },
        { value: "Higher than 180/120 (Hypertensive Crisis)", label: "Higher than 180/120 (Hypertensive Crisis)" },
        { value: "Unknown", label: "Unknown" },
    ]
    let LatestCholesterolOption = [
        { value: "", label: "Select" },
        { value: "Less than 200 (Normal)", label: "Less than 200 (Normal)" },
        { value: "200-239 (Borderline High)", label: "200-239 (Borderline High)" },
        { value: "240 or higher (High)", label: "240 or higher (High)" },
        { value: "Unknown", label: "Unknown" },
    ]

    let TestChange = (e, rowIndex, heading) => {
        console.log(e, rowIndex, heading.attribute)
        setFieldValue(e.target.name, e.target.values)

    }
    const headings = [
        { label: "No#", attribute: "renderIndex" },
        { label: "Date of Diagnosis", attribute: Data.key + "_DateOfDiagnosis", onChange: TestChange, inputType: "date", showYearPicker: true, placeholder: "yyyy", dateFormat: "yyyy" },
        { label: "Medications or Treatment", attribute: Data.key + "_MedicationsTreatment", onChange: TestChange, inputType: "textarea", rows: "1" },
        { label: "Latest Blood Pressure Reading (mmHg)", attribute: Data.key + "_LatestBloodPressure", onChange: TestChange, inputType: "select", options: LatestBloodPressureOption, className: "form-select" },
        { label: "Latest Cholesterol Reading (mg/dL)", attribute: Data.key + "_LatestCholesterol", onChange: TestChange, inputType: "select", options: LatestCholesterolOption, className: "form-select" },
    ];

    const data = [
        {
            [`${Data.key}_DateOfDiagnosis`]: "",
            [`${Data.key}_MedicationsTreatment`]: "",
            [`${Data.key}_LatestBloodPressure`]: "",
            [`${Data.key}_LatestCholesterol`]: "",
        }
    ];


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any High Blood Pressure or High Cholesterol ?
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

export default HighBloodPressureHighCholesterol
