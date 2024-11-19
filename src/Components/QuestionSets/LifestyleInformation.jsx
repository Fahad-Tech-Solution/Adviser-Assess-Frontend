import React, { useEffect } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'


import smoke from "../../assets/Images/life-Q1-smoke.png";
import alcohal from "../../assets/Images/life-Q3-alcohal.png";
import drugs from "../../assets/Images/life-Q4-drugs.png";
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'


const LifestyleInformation = (props) => {
    let { setFieldValue, handleBlur, values, handleChange } = props.FormickOBj

    let Data = props.Data

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


                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='mt-4'>
                            <DynamicCard
                                iconSrc={smoke}
                                Head={"Smoke or Vape"}
                                altText={"kuch karo"}
                            >

                                {values["LifestyleInformation_SmokerYesNo"] === "Yes" &&
                                    <div className='col-md-12 mt-2'>
                                        <CInput label={"Do you smoke or have you ever smoked ?"} name={Data.key + "_Smoker"} type="select" options={SmokingOption} className={"form-select"} />
                                    </div>
                                }
                                {values["LifestyleInformation_VapeYesNo"] === "Yes" && <div className='col-md-12 mt-2'>
                                    <CInput label={"Do you vape or have you ever vaped ?"} name={Data.key + "_Vape"} type="select" options={VapingOption} className={"form-select"} />
                                </div>}

                                {(
                                    (values?.[Data.key + "_Smoker"] === "Yes, I currently smoke" || values?.[Data.key + "_Smoker"] === "Yes, I used to smoke") ||
                                    (values?.[Data.key + "_Vape"] === "Yes, I currently vape" || values?.[Data.key + "_Vape"] === "Yes, I used to vape")
                                ) && (
                                        <React.Fragment>
                                            <div className="col-md-12 mt-2">
                                                <CInput
                                                    label={" Number of cigarettes or vape units per day"}
                                                    name={Data.key + "_NumberOfCigarettes"}
                                                    type="number"
                                                />
                                            </div>

                                            <div className="col-md-12 mt-2">
                                                <CInput
                                                    label={"Year you quit (if applicable)"}
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
                                        </React.Fragment>
                                    )}
                            </DynamicCard>
                        </div>
                    </div>
                </div>


                <div className='row justify-content-center mt-2 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do you consume alcohol?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_alcohol`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_alcohol`] === "Yes" &&
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='mt-4'>
                                <DynamicCard
                                    iconSrc={alcohal}
                                    Head={"Alcohol"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            label={"Number of standard drinks per week"}
                                            name={Data.key + "_drinksPerWeek"}
                                            type="number"
                                        />
                                    </div>
                                </DynamicCard>
                            </div>
                        </div>
                    </div>
                }





                {values[`${Data.key}_RecreationalDrugs`] === "Yes" &&
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div className='mt-4'>
                                <DynamicCard
                                    iconSrc={drugs}
                                    Head={"Drugs"}
                                    altText={"Drugs"}
                                >
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            name={Data.key + "_drugType"}
                                            label={"Number of standard drinks per week"}
                                            type="text"
                                        />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            label={"Frequency of use"}
                                            name={Data.key + "_Frequency"}
                                            type="text"
                                        />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            label={"Year quit (if applicable)"}
                                            name={Data.key + "_yearQuit"}
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

export default LifestyleInformation
