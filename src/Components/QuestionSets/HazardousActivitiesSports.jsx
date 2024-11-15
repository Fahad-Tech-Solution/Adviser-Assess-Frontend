import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'
import { Table } from 'react-bootstrap'
import DynamicTableFields from '../../assets/Custom/DynamicTableFields'

const HazardousActivitiesSports = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [

        { value: "Skydiving", label: "Skydiving" },
        { value: "Surfing ", label: "Surfing " },
        { value: "Scuba Diving", label: "Scuba Diving" },
        { value: "Bungee Jumping", label: "Bungee Jumping" },
        { value: "Motor Racing", label: "Motor Racing" },
        { value: "Rock Climbing", label: "Rock Climbing" },
        { value: "AFL (Australian Rules Football)", label: "AFL (Australian Rules Football)" },
        { value: "Rugby League", label: "Rugby League" },
        { value: "Extreme Skiing or Snowboarding", label: "Extreme Skiing or Snowboarding" },
        { value: "Mountain Biking", label: "Mountain Biking" },
        { value: "Hang Gliding", label: "Hang Gliding" },
        { value: "Base Jumping", label: "Base Jumping" },
        { value: "Caving or Spelunking", label: "Caving or Spelunking" },
        { value: "White Water Rafting", label: "White Water Rafting" },
        { value: "Jet Skiing", label: "Jet Skiing" },
        { value: "Wingsuit Flying", label: "Wingsuit Flying" },
        { value: "Surfing in Big Waves", label: "Surfing in Big Waves" },
        { value: "Bull Riding", label: "Bull Riding" },
        { value: "Parkour", label: "Parkour" },
        { value: "Extreme Hiking or Mountaineering", label: "Extreme Hiking or Mountaineering" },
        { value: "Mixed Martial Arts (MMA)", label: "Mixed Martial Arts (MMA)" },
        { value: "Other", label: "Other" }
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

    const [headings, setHeadings] = useState([
        { label: "Name", attribute: "StaticString" },
        { label: "Activity type", attribute: Data.key + "_ActivityType", inputType: "text", },
        { label: "Frequency", attribute: Data.key + "_Frequency", inputType: "text", },
        { label: "Are you insured for this activity?", attribute: Data.key + "_insuredForThisActivity", inputType: "YesNo", },
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
                            Do you participate in any hazardous activities or sports?
                            <br />
                            <span className='fw-normal'>(e.g., skydiving, scuba diving, motor racing, rock climbing)</span>
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
                                <div className='col-md-8'>
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
                        }


                    </React.Fragment>
                }

                <div className='row justify-content-center mt-5'>
                    <div className='col-md-12'>
                        <label htmlFor='yesNo' className='text-center w-100 fw-bold'>
                            Have you traveled or do you plan to travel overseas to high-risk regions?
                        </label>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <DynamicYesNo name={`${Data.key}_travelOverseas`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_travelOverseas`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center mt-4'>
                            <div className='col-md-2 pt-2'>
                                <label className='fw-bold' htmlFor="">Country/region traveled to</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_RegionTraveled"}
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className='row justify-content-center mt-2'>
                            <div className='col-md-2 pt-2'>
                                <label className='fw-bold' htmlFor="">Date of travel</label>
                            </div>
                            <div className='col-md-3'>
                                <CInput
                                    name={Data.key + "_DateTravel"}
                                    type="text"
                                />
                            </div>
                        </div>

                    </React.Fragment>
                }

            </div>
        </div>
    )
}

export default HazardousActivitiesSports
