import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import { Divider } from 'antd'

const FamilyMedicalHistory = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [
        { value: "HIV", label: "HIV" },
        { value: "AID", label: "AID" },
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


    let TestChange = (e, rowIndex, heading) => {
        console.log(e, rowIndex, heading.attribute)
        setFieldValue(e.target.name, e.target.values)

    }


    let SmokingOption = [
        { value: "Yes, I currently smoke", label: "Yes, I currently smoke" },
        { value: "Yes, I used to smoke", label: "Yes, I used to smoke" },
        { value: "No, I have never smoked", label: "No, I have never smoked" },
    ]

    let VapingOption = [
        { value: "Yes, I currently vape ", label: "Yes, I currently vape " },
        { value: "Yes, I used to vape ", label: "Yes, I used to vape " },
        { value: "No, I have never vaped", label: "No, I have never vaped " },
    ]



    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Heart Disease or Stroke?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_HeartDisease`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_HeartDisease`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >If they had Heart disease or Stroke, Please specify:</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Family member affected</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_FamilyMemberAffected"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Age of diagnosis</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_AgeDiagnosis"}
                                    type="number"
                                />
                            </div>
                        </div>
                        <Divider></Divider>
                    </React.Fragment>
                }

                <div className='row justify-content-center mt-3'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Cancer?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_Cancer`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_Cancer`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >If they had Cancer, Please specify:</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Type of cancer</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_CancerType"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Family member affected</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_FamilyMemberAffectedCancer"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Age of diagnosis</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_AgeDiagnosisCancer"}
                                    type="number"
                                />
                            </div>
                        </div>
                        <Divider></Divider>
                    </React.Fragment>
                }

                <div className='row justify-content-center  mt-3'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Diabetes?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_Diabetes`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_Diabetes`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >If they had Diabetes, Please specify:</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Type of diabetes</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_DiabetesType"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Family member affected</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_FamilyMemberAffectedDiabetes"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Age of diagnosis</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_AgeDiagnosisDiabetes"}
                                    type="number"
                                />
                            </div>
                        </div>
                        <Divider></Divider>
                    </React.Fragment>
                }

                <div className='row justify-content-center  mt-3'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Mental Health Conditions?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_MentalHealthConditions`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_MentalHealthConditions`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >If they had Mental Health Conditions, Please specify:</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Type of Mental Health Conditions</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_MentalHealthConditionsType"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Family member affected</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_FamilyMemberAffectedMentalHealthConditions"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Age of diagnosis</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_AgeDiagnosisMentalHealthConditions"}
                                    type="number"
                                />
                            </div>
                        </div>
                        <Divider></Divider>
                    </React.Fragment>
                }


            </div>
        </div>
    )
}

export default FamilyMedicalHistory
