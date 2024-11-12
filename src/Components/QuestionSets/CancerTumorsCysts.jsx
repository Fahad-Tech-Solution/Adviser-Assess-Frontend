import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'

const CancerTumorsCysts = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "Breast Cancer", label: "Breast Cancer" },
        { value: "Lung Cancer", label: "Lung Cancer" },
        { value: "Prostate Cancer", label: "Prostate Cancer" },
        { value: "Colorectal Cancer", label: "Colorectal Cancer" },
        { value: "Skin Cancer (e.g., Melanoma)", label: "Skin Cancer (e.g., Melanoma)" },
        { value: "Lymphoma", label: "Lymphoma" },
        { value: "Brain Tumor", label: "Brain Tumor" },
        { value: "Ovarian Cancer", label: "Ovarian Cancer" },
        { value: "Benign Tumor", label: "Benign Tumor" },
        { value: "Cyst (e.g., Ovarian Cyst, Kidney Cyst)", label: "Cyst (e.g., Ovarian Cyst, Kidney Cyst)" },
        { value: "Other", label: "Other" },
        { value: "Unknown", label: "Unknown" }
    ]

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


    let TestChange = (e, rowIndex, heading) => {
        console.log(e, rowIndex, heading.attribute)
        setFieldValue(e.target.name, e.target.values)

    }


    const [headings, setHeadings] = useState([
        { label: "Name", attribute: "StaticString" },
        { label: "Date of Diagnosis", attribute: Data.key + "_DateOfDiagnosis", onChange: TestChange, inputType: "date", showYearPicker: true, placeholder: "yyyy", dateFormat: "yyyy" },
        { label: "Treatments or Surgery", attribute: Data.key + "_Treatment", onChange: TestChange, inputType: "textarea", rows: "1" },
        { label: "Current Condition", attribute: Data.key + "_CurrentCondition", onChange: TestChange, inputType: "textarea", rows: "1" },
    ]);

    const [data, setData] = useState([
        {
            StaticString: "",
            [`${Data.key}_DateOfDiagnosis`]: "",
            [`${Data.key}_MedicationsTreatment`]: "",
            [`${Data.key}_Hospitalizations`]: "",
        }
    ]);


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Cancer, Tumors, or Cysts ?
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

                            <div className='col-md-5 pt-2'>
                                <label htmlFor={`${Data.key}_diseaseAndConditions`} className='fw-bold'>Select the type of heart disease or condition that applies to you ?</label>
                            </div>
                            <div className='col-md-3'>
                                <Field
                                    name={`${Data.key}_diseaseAndConditions`}
                                    component={CreatableMultiSelectField}
                                    label="Multi Select Field"
                                    options={optionsMultiSelect}
                                    onChange={handleMultiSelectChange}
                                />
                            </div>
                            {Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                                values[`${Data.key}_diseaseAndConditions`].includes("Other") && (
                                    <React.Fragment>
                                        <div className='col-md-5 pt-2 mt-2'>
                                            <label htmlFor={`${Data.key}_diseaseAndConditions`} className='fw-bold'>Other Details</label>
                                        </div>
                                        <div className='col-md-3 mt-2'>
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



                    </React.Fragment>
                }


            </div>
        </div >
    )
}

export default CancerTumorsCysts
