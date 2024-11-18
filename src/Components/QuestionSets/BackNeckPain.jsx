import React from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Divider } from 'antd'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import Other from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_8_otherDisease.png";

import Cervical from "../../assets/Images/Back or Neck Pain/Cervical Spine Injury.png"
import Degenerative from "../../assets/Images/Back or Neck Pain/Degenerative Disc Disease.png"
import Herniated from "../../assets/Images/Back or Neck Pain/Herniated Disc.png"
import lower from "../../assets/Images/Back or Neck Pain/lower back pain .png"
import UpperBackPain from "../../assets/Images/Back or Neck Pain/shoulder.png"
import neck from "../../assets/Images/Back or Neck Pain/neck.png"
import Sciatica from "../../assets/Images/Back or Neck Pain/Sciatica.png"

const BackNeckPain = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "Lower Back Pain", label: "Lower Back Pain" },
        { value: "Upper Back Pain", label: "Upper Back Pain" },
        { value: "Neck Pain", label: "Neck Pain" },
        { value: "Sciatica", label: "Sciatica" },
        { value: "Herniated Disc", label: "Herniated Disc" },
        { value: "Degenerative Disc Disease", label: "Degenerative Disc Disease" },
        { value: "Cervical Spine Injury", label: "Cervical Spine Injury" },
        { value: "Other", label: "Other" },
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

    let ManagementOption = [
        { value: "", label: "Select" },
        { value: "Physiotherapy", label: "Physiotherapy" },
        { value: "Medication", label: "Medication" },
        { value: "Surgery", label: "Surgery" },
        { value: "Other", label: "Other" },
    ]

    let CurrentStatusOption = [
        { value: "", label: "Select" },
        { value: "Fully recovered", label: "Fully recovered" },
        { value: "Ongoing pain/issues", label: "Ongoing pain/issues" },
        { value: "Other", label: "Other" },
    ]

    let Images = {
        "Lower Back Pain": lower,
        "Upper Back Pain": UpperBackPain,
        "Neck Pain": neck,
        "Sciatica": Sciatica,
        "Herniated Disc": Herniated,
        "Degenerative Disc Disease": Degenerative,
        "Cervical Spine Injury": Cervical,
        "Other": Other,
    }

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Do you have any Back or Neck Pain ?
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
                                }} >Type of condition</Divider>

                            <div className='col-md-8'>
                                <div className='d-flex w-100 justify-content-center'>
                                    <div style={{ minWidth: "25%" }}>
                                        <Field
                                            name={`${Data.key}_diseaseAndConditions`}
                                            component={CreatableMultiSelectField}
                                            label="Multi Select Field"
                                            options={optionsMultiSelect}
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
                                                            <CInput setFieldValue={setFieldValue} handleBlur={handleBlur} values={values} name={`${Data.key}_DateOfDiagnosis${i}`} type="date" showYearPicker placeholder="yyyy" dateFormat="yyyy" label="Date of diagnosis/onset" />
                                                        </div>
                                                        <div className='col-md-12 my-2'>
                                                            <label className='fw-bold w-100 text-center mb-2'>Have you sought medical treatment?</label>
                                                            <DynamicYesNo name={`${Data.key}_Treatment${i}`} values={values} handleChange={handleChange} />
                                                        </div>
                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label="Current treatment or management" name={Data.key + "_CurrentTreatment" + i} type="Select" options={ManagementOption} className={"form-select"} />
                                                        </div>

                                                        {values[Data.key + "_CurrentTreatment" + i] === "Other" &&
                                                            <div className='col-md-12 mt-2'>
                                                                <CInput label="Current treatment or management Other" name={Data.key + "_CurrentTreatmentOther" + i} type="textarea" rows={2} />
                                                            </div>
                                                        }

                                                        <div className='col-md-12 mt-2'>
                                                            <CInput label="Current status" name={Data.key + "_CurrentStatus" + i} type="Select" options={CurrentStatusOption} className={"form-select"} />
                                                        </div>

                                                        {values[Data.key + "_CurrentStatus" + i] === "Other" &&
                                                            <div className='col-md-12 mt-2'>
                                                                <CInput label="Current status Other" name={Data.key + "_CurrentStatusOther" + i} type="textarea" rows={2} />
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



                    </React.Fragment>
                }


            </div>
        </div>
    )
}

export default BackNeckPain
