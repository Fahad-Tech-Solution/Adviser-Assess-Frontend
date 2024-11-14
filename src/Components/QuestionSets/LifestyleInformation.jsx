import React, { useEffect, useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'
import { Divider } from 'antd'

const LifestyleInformation = (props) => {
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
        { value: "", label: "Select" },
        { value: "Yes, I currently smoke", label: "Yes, I currently smoke" },
        { value: "Yes, I used to smoke", label: "Yes, I used to smoke" },
        { value: "No, I have never smoked", label: "No, I have never smoked" },
    ]

    let VapingOption = [
        { value: "", label: "Select" },
        { value: "Yes, I currently vape", label: "Yes, I currently vape " },
        { value: "Yes, I used to vape", label: "Yes, I used to vape " },
        { value: "No, I have never vaped", label: "No, I have never vaped " },
    ]

    useEffect(() => {
        // alert(values["LifestyleInformation_SmokerYesNo"] + values["LifestyleInformation_VapeYesNo"]);
        if (values["LifestyleInformation_SmokerYesNo"] === "No") {
            setFieldValue(Data.key + "_Smoker", "")
        }
        if (values["LifestyleInformation_VapeYesNo"] === "No") {
            setFieldValue(Data.key + "_Vape", "")
        }

    }, [values])




    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>

                {values["LifestyleInformation_SmokerYesNo"] === "Yes" &&
                    <div className='row justify-content-center'>
                        <div className='col-md-4 pt-2'>
                            <label className='fw-bold' htmlFor="">Do you smoke or have you ever smoked?</label>
                        </div>
                        <div className='col-md-3'>
                            <CInput name={Data.key + "_Smoker"} type="select" options={SmokingOption} className={"form-select"} />
                        </div>
                    </div>
                }
                {values["LifestyleInformation_VapeYesNo"] === "Yes" &&
                    <div className='row justify-content-center mt-2'>
                        <div className='col-md-4 pt-2'>
                            <label className='fw-bold' htmlFor="">Do you vape or have you ever vaped?</label>
                        </div>
                        <div className='col-md-3'>
                            <CInput name={Data.key + "_Vape"} type="select" options={VapingOption} className={"form-select"} />
                        </div>
                    </div>}
                {(
                    (values?.[Data.key + "_Smoker"] === "Yes, I currently smoke" || values?.[Data.key + "_Smoker"] === "Yes, I used to smoke") ||
                    (values?.[Data.key + "_Vape"] === "Yes, I currently vape" || values?.[Data.key + "_Vape"] === "Yes, I used to vape")
                ) && (
                        <React.Fragment>
                            <Divider
                                orientation="left"
                                style={{
                                    color: '#36b446',
                                    fontWeight: "700",
                                    fontSize: "16px"
                                }}
                            >
                                If you smoke or vape, Please specify
                            </Divider>
                            <div className="row justify-content-center mt-2">
                                <div className="col-md-4 pt-2">
                                    <label className="fw-bold" htmlFor="">
                                        Number of cigarettes or vape units per day
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <CInput
                                        name={Data.key + "_NumberOfCigarettes"}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center mt-2">
                                <div className="col-md-4 pt-2">
                                    <label className="fw-bold" htmlFor="">
                                        Year you quit (if applicable)
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <CInput
                                        name={Data.key + "_YearQuit"}
                                        type="date"
                                        showYearPicker
                                        placeholder="yyyy"
                                        dateFormat="yyyy"
                                        setFieldValue={setFieldValue}
                                        handleBlur={handleBlur}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <Divider />
                        </React.Fragment>
                    )}



                <div className='row justify-content-center mt-2 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do you consume alcohol?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_alcohol`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_alcohol`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >Please indicate your average consumption per week:</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Number of standard drinks per week</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_drinksPerWeek"}
                                    type="number"
                                />
                            </div>
                        </div>
                        <Divider></Divider>
                    </React.Fragment>
                }


                <div className='row justify-content-center mt-2 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do you use recreational drugs or have you used them in the past ?</label>
                    </div>
                    <div className='col-md-3 pt-3'>
                        <DynamicYesNo name={`${Data.key}_RecreationalDrugs`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_RecreationalDrugs`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >Please specify</Divider>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Type of drug(s) used</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_drugType"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Frequency of use</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_Frequency"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-4 pt-2'>
                                <label className='fw-bold' htmlFor="">Year quit (if applicable): </label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_yearQuit"}
                                    type="text"
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

export default LifestyleInformation
