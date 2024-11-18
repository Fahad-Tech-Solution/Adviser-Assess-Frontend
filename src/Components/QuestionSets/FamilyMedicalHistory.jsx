import React, { useState } from 'react'
import DynamicYesNo from '../../assets/Custom/DynamicYesNo/DynamicYesNo'
import CInput from '../../assets/Custom/CInput'

import heart from "../../assets/Images/Family-Q1-heart.png";
import lung_cancer from "../../assets/Images/Family-Q2-lung-cancer.png";
import Diabetes from "../../assets/Images/Diabetes.png";
import psychology from "../../assets/Images/psychology.png";
import DynamicCard from '../../assets/Custom/DynamicCards/DynamicCard'


const FamilyMedicalHistory = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data

    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1 mt-5'>
                <div className='row justify-content-center d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Heart Disease or Stroke?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_HeartDisease`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_HeartDisease`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center mt-5'>
                            <div className='col-md-6'>
                                <DynamicCard
                                    iconSrc={heart}
                                    Head={"History of Heart disease or Stroke in Family"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            name={Data.key + "_FamilyMemberAffected"}
                                            type="text"
                                            label={"Family member affected"}
                                        />
                                    </div>
                                    <div className='col-md-12 mt-2'>
                                        <CInput
                                            name={Data.key + "_AgeDiagnosis"}
                                            type="number"
                                            label={"Age of diagnosis"}
                                        />
                                    </div>

                                </DynamicCard>
                            </div>
                        </div>
                    </React.Fragment>
                }

                <div className='row justify-content-center mt-3 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Cancer?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_Cancer`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {/*
                
                {values[`${Data.key}_Cancer`] === "Yes" &&
                    <React.Fragment>
                        <Divider orientation="left"
                            style={{
                                color: '#36b446',
                                fontWeight: "700",
                                fontSize: "16px"
                            }}
                        >If they had Cancer:</Divider>
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
                        
                    </React.Fragment>
                }     
                    */}

                {values[`${Data.key}_Cancer`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center'>
                            <div className='col-md-6'>

                                <DynamicCard
                                    iconSrc={lung_cancer}
                                    Head={"If they had Cancer"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_CancerType"}
                                            type="text"
                                            label={"Type of cancer"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_FamilyMemberAffectedCancer"}
                                            type="text"
                                            label={"Family member affected"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_AgeDiagnosisCancer"}
                                            type="number"
                                            label={"Age of diagnosis"}
                                        />
                                    </div>
                                </DynamicCard>
                            </div>
                        </div>

                    </React.Fragment>
                }


                <div className='row justify-content-center  mt-3 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Diabetes?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_Diabetes`} values={values} handleChange={handleChange} />
                    </div>
                </div>


                {values[`${Data.key}_Diabetes`] === "Yes" &&
                    <React.Fragment>
                        <div className='row justify-content-center'>
                            <div className='col-md-6'>
                                <DynamicCard
                                    iconSrc={Diabetes}
                                    Head={"If they had Diabetes"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_DiabetesType"}
                                            type="text"
                                            label={"Type of diabetes"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_FamilyMemberAffectedDiabetes"}
                                            type="text"
                                            label={"Family member affected"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_AgeDiagnosisDiabetes"}
                                            type="number"
                                            label={"Age of diagnosis"}
                                        />
                                    </div>
                                </DynamicCard>
                            </div>
                        </div>

                    </React.Fragment>
                }


                <div className='row justify-content-center  mt-3 d-none'>
                    <div className='col-md-4 pt-2'>
                        <label className='fw-bold' htmlFor="">Do anyone had Mental Health Conditions?</label>
                    </div>
                    <div className='col-md-3'>
                        <DynamicYesNo name={`${Data.key}_MentalHealthConditions`} values={values} handleChange={handleChange} />
                    </div>
                </div>

                {values[`${Data.key}_MentalHealthConditions`] === "Yes" &&
                    <React.Fragment>

                        <div className='row justify-content-center'>
                            <div className='col-md-6'>
                                <DynamicCard
                                    iconSrc={psychology}
                                    Head={"If they had Mental Health Conditions"}
                                    altText={"kuch karo"}
                                >
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_MentalHealthConditionsType"}
                                            type="text"
                                            label={"Type of Mental Health Conditions"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_FamilyMemberAffectedMentalHealthConditions"}
                                            type="text"
                                            label={"Family member affected"}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <CInput
                                            name={Data.key + "_AgeDiagnosisMentalHealthConditions"}
                                            type="number"
                                            label={"Age of diagnosis"}
                                        />
                                    </div>
                                </DynamicCard>
                            </div>
                        </div>

                    </React.Fragment>
                }



            </div>
        </div>
    )
}

export default FamilyMedicalHistory
