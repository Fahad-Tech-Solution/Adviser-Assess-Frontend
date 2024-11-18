import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import { CreatableMultiSelectField } from '../../assets/Custom/CreateableMultiSelect/CreatableMultiSelectField'
import { Field } from 'formik'
import CInput from '../../assets/Custom/CInput'

import { Divider } from 'antd'
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'

import Other from "../../assets/Images/Heart-Disease-Conditions/heartDiseaseConditions_icon_8_otherDisease.png";

import alpine from "../../assets/Images/alpine.png";
import travel from "../../assets/Images/travel-and-tourism.png";

import Australian from "../../assets/Images/Hazardous activities or sports/Australian Rules Football.png";
import Base from "../../assets/Images/Hazardous activities or sports/Base Jumping.png";
import bull from "../../assets/Images/Hazardous activities or sports/bull riding (2).png";
import Bungee from "../../assets/Images/Hazardous activities or sports/Bungee Jumping.png";
import Caving from "../../assets/Images/Hazardous activities or sports/Caving or Spelunking.png";
import Extreme from "../../assets/Images/Hazardous activities or sports/Extreme Hiking or Mountaineering.png";
import Hang from "../../assets/Images/Hazardous activities or sports/Hang Gliding.png";
import Jet from "../../assets/Images/Hazardous activities or sports/Jet Skiing.png";
import Mixed from "../../assets/Images/Hazardous activities or sports/Mixed Martial Arts.png";
import motor from "../../assets/Images/Hazardous activities or sports/motor racing .png";
import Mountain from "../../assets/Images/Hazardous activities or sports/Mountain Biking.png";
import Parkour from "../../assets/Images/Hazardous activities or sports/Parkour.png";
import Rock from "../../assets/Images/Hazardous activities or sports/Rock Climbing.png";
import Rugby from "../../assets/Images/Hazardous activities or sports/Rugby League.png";
import Scuba from "../../assets/Images/Hazardous activities or sports/Scuba Diving.png";
import skydiving from "../../assets/Images/Hazardous activities or sports/skydiving.png";
import Snowboarding from "../../assets/Images/Hazardous activities or sports/Snowboarding.png";
import SurfingBigWaves from "../../assets/Images/Hazardous activities or sports/Surfing in Big Waves.png";

import White from "../../assets/Images/Hazardous activities or sports/White Water Rafting.png";
import Wingsuit from "../../assets/Images/Hazardous activities or sports/Wingsuit Flying.png";

const HazardousActivitiesSports = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    let optionsMultiSelect = [

        { value: "Skydiving", label: "Skydiving" },
        { value: "Surfing", label: "Surfing" },
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
        }
    };

    let Images = {
        "Surfing": alpine,
        "Skydiving": skydiving,
        "Scuba Diving": Scuba,
        "Bungee Jumping": Bungee,
        "Motor Racing": motor,
        "Rock Climbing": Rock,
        "AFL (Australian Rules Football)": Australian,
        "Rugby League": Rugby,
        "Extreme Skiing or Snowboarding": Snowboarding,
        "Mountain Biking": Mountain,
        "Hang Gliding": Hang,
        "Base Jumping": Base,
        "Caving or Spelunking": Caving,
        "White Water Rafting": White,
        "Jet Skiing": Jet,
        "Wingsuit Flying": Wingsuit,
        "Surfing in Big Waves": SurfingBigWaves,
        "Bull Riding": bull,
        "Parkour": Parkour,
        "Extreme Hiking or Mountaineering": Extreme,
        "Mixed Martial Arts (MMA)": Mixed,
        "Other": Other,
    }

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
                <div className='row justify-content-center d-none'>
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

                {values[`${Data.key}_DynamicYesNo`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center mt-4'>

                            <Divider orientation="center"
                                style={{
                                    color: '#36b446',
                                    fontWeight: "700",
                                    fontSize: "16px"
                                }} >Select the type of heart disease or condition that applies to you ?</Divider>

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
                        </div>

                        {(Array.isArray(values[`${Data.key}_diseaseAndConditions`]) && values[`${Data.key}_diseaseAndConditions`].length > 0 && !values[`${Data.key}_diseaseAndConditions`].includes("Other")) &&
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
                                                        <CInput label={"Activity type"} name={Data.key + "_ActivityType" + i} type={"text"} />
                                                    </div>
                                                    <div className='col-md-12 mt-2'>
                                                        <CInput label={"Frequency"} name={Data.key + "_Frequency" + i} type={"text"} />
                                                    </div>
                                                    <div className='col-md-12 my-2'>
                                                        <label className='fw-bold w-100 text-center mb-2'>Are you insured for this activity?</label>
                                                        <DynamicYesNo name={`${Data.key}_insuredForThisActivity${i}`} values={values} handleChange={handleChange} />
                                                    </div>
                                                </DynamicCard>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </React.Fragment>
                }

                <div className='row justify-content-center mt-5 d-none'>
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
                    <div className='row justify-content-center'>
                        <Divider orientation="center"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }} > Have you traveled or do you plan to travel overseas to high-risk regions?</Divider>
                        <div className='col-md-6'>
                            <div className='mt-4'>
                                <DynamicCard
                                    iconSrc={travel}
                                    Head={"Travel overseas to high-risk regions"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            label={"Country/region traveled to"}
                                            name={Data.key + "_RegionTraveled"}
                                            type="text"
                                        />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            label={"Date of travel"}
                                            name={Data.key + "_DateTravel"}
                                            type="text"
                                        />
                                    </div>
                                </DynamicCard>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default HazardousActivitiesSports
