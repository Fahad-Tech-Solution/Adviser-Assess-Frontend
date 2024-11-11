import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'

const HeartDiseaseConditions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
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

    let ongoingResolvedOption = [
        { value: "", label: "Select" },
        { value: "Ongoing", label: "Ongoing" },
        { value: "Resolved", label: "Resolved" },
    ]


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Heart disease or conditions ?
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
                        {(Array.isArray(values[`${Data.key}_diseaseAndConditions`]) && values[`${Data.key}_diseaseAndConditions`].length > 0 && !values[`${Data.key}_diseaseAndConditions`].includes("Other")) &&

                            <div className='row justify-content-center'>
                                <div className='col-md-10'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date of diagnosis</th>
                                                    <th>Treatments or medications</th>
                                                    <th>Is the condition ongoing or resolved?</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: values[`${Data.key}_diseaseAndConditions`].length || 0 }).map((elem, i) => {
                                                    let diseaseAndConditions = values[`${Data.key}_diseaseAndConditions`];
                                                    return (
                                                        <tr>
                                                            <td>{diseaseAndConditions[i]}</td>
                                                            <td style={{ width: "6rem" }}><CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis${i}`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" /></td>
                                                            <td> <CInput name={Data.key + "treatmentsMedications" + i} type="textarea" placeholder="Treatments or medications" rows={1} /></td>
                                                            <td> <CInput name={Data.key + "ongoingResolved" + i} type="Select" options={ongoingResolvedOption} className={"form-select"} /></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        }


                    </React.Fragment>
                }


            </div>
        </div>
    )
}

export default HeartDiseaseConditions
