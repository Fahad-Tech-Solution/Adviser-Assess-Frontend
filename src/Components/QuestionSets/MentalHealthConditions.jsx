import React, { useEffect, useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import CInput from '../../assets/Custom/CInput'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'
import { Divider } from 'antd'
import Other from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_8_otherDisease.png";

import anxiety from "../../assets/Images/Mental Health/anxiety.png";
import bipolar from "../../assets/Images/Mental Health/bipolar.png";
import loneliness from "../../assets/Images/Mental Health/loneliness.png";
import medical from "../../assets/Images/Mental Health/medical-report.png";
import narcissism from "../../assets/Images/Mental Health/narcissism.png";
import schizophrenia from "../../assets/Images/Mental Health/schizophrenia (1).png";
import stress from "../../assets/Images/Mental Health/stress.png";




const MentalHealthConditions = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let TreatmentOption = [
        { value: "Anxiety", label: "Anxiety" },
        { value: "Depression", label: "Depression" },
        { value: "Bipolar Disorder", label: "Bipolar Disorder" },
        { value: "Schizophrenia", label: "Schizophrenia" },
        { value: "Post - Traumatic Stress Disorder(PTSD)", label: "Post - Traumatic Stress Disorder(PTSD)" },
        { value: "Obsessive - Compulsive Disorder(OCD)", label: "Obsessive - Compulsive Disorder(OCD)" },
        { value: "Other", label: "Other" },
    ]

    let MedicationOption = [
        { value: "", label: "Select" },
        { value: "Medication 1 (e.g., Antidepressants)", label: "Medication 1 (e.g., Antidepressants)" },
        { value: "Medication 2 (e.g., Cognitive Behavioral Therapy)", label: "Medication 2 (e.g., Cognitive Behavioral Therapy)" },
        { value: "Other", label: "Other" },
    ]

    let PsychologistCareOption = [
        { value: "", label: "Select" },
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
            StaticString: "",
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
                };
                DataRenderArray.push(obj);
            });

            setData(DataRenderArray);
        }
    };


    useEffect(() => {
        if (values[Data.key + "_diseaseAndConditions"] && values[Data.key + "_diseaseAndConditions"].length > 0) {
            let DataRenderArray = [];

            values[Data.key + "_diseaseAndConditions"].forEach((element) => {
                let obj = {
                    StaticString: element
                };
                DataRenderArray.push(obj);
            });

            setData(DataRenderArray);
        }
    }, [values])


    let Images = {
        "Anxiety": anxiety,
        "Depression": loneliness,
        "Bipolar Disorder": bipolar,
        "Schizophrenia": schizophrenia,
        "Post - Traumatic Stress Disorder(PTSD)": stress,
        "Obsessive - Compulsive Disorder(OCD)": narcissism,
        "Other": Other,
    }
    // medical


    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Mental Health Conditions (e.g., anxiety, stress, depression, bipolar disorder)?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_DynamicYesNo`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>

                        <div className='row justify-content-center mt-4'>
                            <Divider orientation="center"
                                style={{
                                    color: '#36b446',
                                    fontWeight: "700",
                                    fontSize: "16px"
                                }} >Condition diagnosed</Divider>

                            <div className='col-md-8'>
                                <div className='d-flex w-100 justify-content-center'>
                                    <div style={{ minWidth: "25%" }}>
                                        <Field
                                            name={`${Data.key}_diseaseAndConditions`}
                                            component={CreatableMultiSelectField}
                                            label="Multi Select Field"
                                            options={TreatmentOption}
                                            onChange={handleMultiSelectChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].includes("Other") && (
                                <div className='row justify-content-center'>
                                    <div className='col-md-6'>
                                        <div className='mt-4'>
                                            {Array.from({ length: values[`${Data.key}_diseaseAndConditions`].length || 0 }).map((elem, i) => {
                                                let diseaseAndConditions = values[`${Data.key}_diseaseAndConditions`];
                                                return (
                                                    <DynamicCard
                                                        iconSrc={Images[diseaseAndConditions[i]]}
                                                        Head={diseaseAndConditions[i]}
                                                        altText="Medical History Icon"
                                                    >
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label={"Other Details"} name={`${Data.key}_Other`} type="textarea" rows={2} />
                                                        </div>
                                                    </DynamicCard>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}


                        {
                            Array.isArray(values[`${Data.key}_diseaseAndConditions`]) &&
                            values[`${Data.key}_diseaseAndConditions`].length > 0 &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Other") &&
                            !values[`${Data.key}_diseaseAndConditions`].includes("Unknown") && (
                                <div className='row justify-content-center'>
                                    <div className='col-md-6'>
                                        <div className='mt-4'>
                                            {Array.from({ length: values[`${Data.key}_diseaseAndConditions`].length || 0 }).map((elem, i) => {
                                                let diseaseAndConditions = values[`${Data.key}_diseaseAndConditions`];
                                                return (
                                                    <DynamicCard
                                                        iconSrc={Images[diseaseAndConditions[i]]}
                                                        Head={diseaseAndConditions[i]}
                                                        altText={diseaseAndConditions[i]}
                                                    >
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis${i}`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of Diagnosis" />
                                                        </div>
                                                        <div className='col-md-12 my-2'>
                                                            <label className='fw-bold w-100 text-center mb-2'>Hospitalizations</label>
                                                            <DynamicYesNo name={`${Data.key}_Hospitalizations${i}`} values={values} handleChange={handleChange} />
                                                        </div>
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label="Medications or Treatment" name={Data.key + "_MedicationsTreatment" + i} type="Select" options={MedicationOption} className={"form-select"} />
                                                        </div>

                                                        {values[Data.key + "_MedicationsTreatment" + i] === "Other" &&
                                                            <div className='col-md-12 mt-2'>
                                                                <CInput label="Other" name={Data.key + "_MedicationsTreatmentOther" + i} type="textarea" rows={2} />
                                                            </div>
                                                        }

                                                    </DynamicCard>
                                                )
                                            })}
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

                                    {values[`${Data.key}_PsychologistCare`] !== "No, I have not seen a psychologist or undertaken a health care plan" && values[`${Data.key}_PsychologistCare`] !== "" &&
                                        <div className='row justify-content-center'>
                                            <div className='col-md-6'>
                                                <div className='mt-4'>

                                                    <DynamicCard
                                                        iconSrc={medical}
                                                        Head={"Mental Health Care Plan"}
                                                        altText={"kuch karo"}
                                                    >
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label={"How many sessions have you completed?"} name={Data.key + "_PsychologistSessions"} type={"number"} />
                                                        </div>
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label={"Over what time period (e.g., months or years)?"} name={Data.key + "_PsychologistTimePeriod"} type={"number"} />
                                                        </div>
                                                        <div className='col-md-12 my-2'>
                                                            <label className='fw-bold w-100 text-center mb-2'>Are you undertaking this as part of your employer’s offering due to your occupation ?</label>
                                                            <DynamicYesNo name={`${Data.key}_PsychologistEmployerOffering`} values={values} handleChange={handleChange} />
                                                        </div>
                                                    </DynamicCard>
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
