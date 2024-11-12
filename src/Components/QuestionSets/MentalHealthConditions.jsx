import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import CInput from '../../assets/Custom/CInput'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'

const MentalHealthConditions = (props) => {
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
        { value: "Anxiety", label: "Anxiety" },
        { value: "Depression", label: "Depression" },
        { value: "Bipolar Disorder", label: "Bipolar Disorder" },
        { value: "Schizophrenia", label: "Schizophrenia" },
        { value: "Post - Traumatic Stress Disorder(PTSD)", label: "Post - Traumatic Stress Disorder(PTSD)" },
        { value: "Obsessive - Compulsive Disorder(OCD)", label: "Obsessive - Compulsive Disorder(OCD)" },
        { value: "Other", label: "Other" },
    ]

    let MedicationOption = [
        { value: "Medication 1 (e.g., Antidepressants)", label: "Medication 1 (e.g., Antidepressants)" },
        { value: "Medication 2 (e.g., Cognitive Behavioral Therapy)", label: "Medication 2 (e.g., Cognitive Behavioral Therapy)" },
        { value: "Other", label: "Other" },
    ]

    let PsychologistCareOption = [
        { value: "Yes, I have seen a psychologist", label: "Yes, I have seen a psychologist" },
        { value: "Yes, I am currently undertaking a mental health care plan", label: "Yes, I am currently undertaking a mental health care plan" },
        { value: "Yes, I have seen a psychologist and am currently on a mental health care plan", label: "Yes, I have seen a psychologist and am currently on a mental health care plan" },
        { value: "No, I have not seen a psychologist or undertaken a health care plan", label: "No, I have not seen a psychologist or undertaken a health care plan" },
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

    const [headings, setHeadings] = useState([
        { label: "Name", attribute: "StaticString" },
        { label: "Date of Diagnosis", attribute: Data.key + "_DateOfDiagnosis", onChange: TestChange, inputType: "date", showYearPicker: true, placeholder: "yyyy", dateFormat: "yyyy" },
        { label: "Medications or Treatment", attribute: Data.key + "_MedicationsTreatment", attribute2: Data.key + "_MedicationsTreatmentOther", onChange: TestChange, inputType: "select&textArea", options: MedicationOption, className: "form-select" },
        { label: "Hospitalizations", attribute: Data.key + "_Hospitalizations", attribute2: Data.key + "_HospitalizationsReason", onChange: TestChange, inputType: "YesNo&textArea", },
    ]);

    const [data, setData] = useState([
        {
            [`${Data.key}_TypeDiabetes`]: "",
            [`${Data.key}_DateOfDiagnosis`]: "",
            [`${Data.key}_Treatment`]: "",
            [`${Data.key}_TreatmentOther`]: "",
            [`${Data.key}_HbA1cReading`]: "",
            [`${Data.key}_GlucoseReading`]: "",
        }
    ]);

    const PsychologistHeadings = [
        { label: "No#", attribute: "renderIndex" },
        { label: "How many sessions have you completed?", attribute: Data.key + "_PsychologistSessions", inputType: "number" },
        { label: "Over what time period (e.g., months or years)?", attribute: Data.key + "_PsychologistTimePeriod", inputType: "number" },
        { label: "Are you undertaking this as part of your employer’s offering due to your occupation ?", attribute: Data.key + "_PsychologistEmployerOffering", onChange: TestChange, inputType: "YesNo", },
    ];

    const PsychologistData = [
        {
            [`${Data.key}_PsychologistSessions`]: "",
            [`${Data.key}_PsychologistSessions`]: "",
            [`${Data.key}_PsychologistEmployerOffering`]: "",
        }
    ];


    const handleMultiSelectChange = ({ target }) => {
        let selectedArray = target.value;

        console.log(selectedArray);

        // Check if "Other" or "Unknown" is selected
        const hasOther = selectedArray.some((item) => item.value === "Other");
        const hasUnknown = selectedArray.some((item) => item.value === "Unknown");

        const otherIndex = selectedArray.findIndex((item) => item.value === "Other");
        const unknownIndex = selectedArray.findIndex((item) => item.value === "Unknown");

        if (unknownIndex === 1 && otherIndex === 0) {
            setFieldValue(target.name, ["Unknown"]);
            return;
        }

        // If only "Other" or "Unknown" is selected, or if it is the last selection, set only that value
        if (
            (selectedArray.length === 1 && (hasOther || hasUnknown)) ||
            (selectedArray.length === 2 && ((hasOther && otherIndex === 1) || (hasUnknown && unknownIndex === 1)))
        ) {
            setFieldValue(target.name, [hasOther ? "Other" : "Unknown"]);
            return;
        }

        // If "Other" or "Unknown" is present in a larger selection, prioritize it and set only ["Other"] or ["Unknown"]
        if ((hasOther && selectedArray.length > 2) || (hasUnknown && selectedArray.length > 2)) {
            setFieldValue(target.name, [hasOther ? "Other" : "Unknown"]);
        } else {
            // Filter out any "Other" or "Unknown" values and use the remaining selected items
            const filtered = selectedArray
                .filter((item) => item.value !== "Other" && item.value !== "Unknown")
                .map((item) => item.value);
            setFieldValue(target.name, filtered);

            // Update the data rendering array with filtered values
            let DataRenderArray = [];

            filtered.forEach((element) => {
                let obj = {
                    StaticString: element,
                    [`${Data.key}_DateOfDiagnosis`]: "",
                    [`${Data.key}_MedicationsTreatment`]: "",
                    [`${Data.key}_Hospitalizations`]: "",
                };
                DataRenderArray.push(obj);
            });

            setData(DataRenderArray);
        }
    };

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Mental Health Conditions (e.g., anxiety, stress, depression, bipolar disorder)?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>
                {
                    values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>

                        <div className='row justify-content-center mt-4'>

                            <div className='col-md-2 pt-2'>
                                <label htmlFor={`${Data.key}_diseaseAndConditions`} className='fw-bold'>Condition diagnosed</label>
                            </div>
                            <div className='col-md-3'>
                                <Field
                                    name={`${Data.key}_diseaseAndConditions`}
                                    component={CreatableMultiSelectField}
                                    label="Multi Select Field"
                                    options={TreatmentOption}
                                    onChange={handleMultiSelectChange}
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center my-2'>

                            {Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                                values[`${Data.key}_diseaseAndConditions`].includes("Other") && (
                                    <React.Fragment>
                                        <div className='col-md-2'>
                                            <label htmlFor={`${Data.key}_diseaseAndConditions`} className='fw-bold'>Other Details</label>
                                        </div>
                                        <div className='col-md-3 '>
                                            <CInput name={`${Data.key}_Other`} type="textarea" rows={2} />
                                        </div>
                                    </React.Fragment>
                                )}

                        </div>

                        {
                            Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].length > 0 &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Other") &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Unknown") && (
                                <div className='row justify-content-center'>
                                    <div className='col-md-10'>
                                        <div className='mt-4'>
                                            <DynamicTableFields
                                                headings={headings}
                                                data={data}
                                                onChange={() => { console.log("what the") }}
                                                setFieldValue={setFieldValue}
                                                handleBlur={handleBlur}
                                                values={values}
                                                handleChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].length > 0 &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Other") &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Unknown") && (
                                <React.Fragment>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-5 pt-2'>
                                            <label htmlFor={`${Data.key}_PsychologistCare`} className='fw-bold'>
                                                Have you seen a Psychologist or undertaken a Mental Health Care Plan ?</label>
                                        </div>
                                        <div className='col-md-3'>
                                            <CInput type="select" className={"form-select"} name={`${Data.key}_PsychologistCare`} options={PsychologistCareOption} />
                                        </div>
                                    </div>

                                    {values[`${Data.key}_PsychologistCare`] !== "No, I have not seen a psychologist or undertaken a health care plan" &&
                                        <div className='row justify-content-center'>
                                            <div className='col-md-10'>
                                                <div className='mt-4'>
                                                    <DynamicTableFields
                                                        headings={PsychologistHeadings}
                                                        data={PsychologistData}
                                                        onChange={() => { console.log("what the") }}
                                                        setFieldValue={setFieldValue}
                                                        handleBlur={handleBlur}
                                                        values={values}
                                                        handleChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </React.Fragment>

                            )
                        }
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default MentalHealthConditions
