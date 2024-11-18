import React, { useEffect, useState } from 'react'
import PersonalDetails from './PersonalDetails'
import { Form, Formik } from 'formik'
import { Button, Image } from 'react-bootstrap'

import logo from "../assets/Images/Logo.png"
import Content from '../assets/Content'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckValidation, validateDynamicFields } from '../assets/Api/Api'

const QuestionsSet = (props) => {
    const { Pages } = Content;

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let location = useLocation();
    let Nev = useNavigate();

    const handleBack = () => {
        const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);
        const MainPageIndex = Pages.findIndex(item => item.route === `/${currentPath}`);

        if (MainPageIndex === -1) return; // Exit if main page not found

        const innerPages = Pages[MainPageIndex].InnerPages.filter(page => page.condition(values));
        const CurrentPageIndex = innerPages.findIndex(item => item.route === `/${cLocation}`);

        if (innerPages.length > 1 && CurrentPageIndex > 0) {
            // Navigate to previous inner page in the same main page
            Nev(Pages[MainPageIndex].route + innerPages[CurrentPageIndex - 1].route);
        } else if (MainPageIndex > 0) {
            // Navigate to the last filtered inner page of the previous main page
            const previousMainPage = Pages[MainPageIndex - 1];
            const previousInnerPages = previousMainPage.InnerPages.filter(page => page.condition(values));

            if (previousInnerPages.length > 0) {
                const previousLastPage = previousInnerPages[previousInnerPages.length - 1].route;
                Nev(previousMainPage.route + previousLastPage);
            }
        }
    };

    const handleNext = async () => {
        localStorage.setItem("AdviserAssess", JSON.stringify(props.FormickOBj.values));

        const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);



        const MainPageIndex = Pages.findIndex(item => item.route === `/${currentPath}`);

        if (MainPageIndex === -1) return; // Exit if main page not found

        const innerPages = Pages[MainPageIndex].InnerPages.filter(page => page.condition(values));
        const CurrentPageIndex = innerPages.findIndex(item => item.route === `/${cLocation}`);

        // let Validate = await CheckLocationBasedField(currentPath, cLocation, innerPages, CurrentPageIndex)
        // if (!Validate) {
        //     return false;
        // }

        if (innerPages.length > 1 && CurrentPageIndex < innerPages.length - 1) {
            // Navigate to the next inner page in the same main page
            Nev(Pages[MainPageIndex].route + innerPages[CurrentPageIndex + 1].route);
        } else if (MainPageIndex < Pages.length - 1) {
            // Navigate to the first filtered inner page of the next main page
            const nextMainPage = Pages[MainPageIndex + 1];

            const nextInnerPages = nextMainPage.InnerPages.filter(page => page.condition(values));

            if (nextInnerPages.length > 0) {
                const nextFirstPage = nextInnerPages[0].route;
                Nev(nextMainPage.route + nextFirstPage);
            }
        }
    };

    let CheckLocationBasedField = async (currentPath, cLocation, innerPages, CurrentPageIndex) => {

        let fullCorse = currentPath + "/" + cLocation;
        let dynamicFields = [];
        let switchValidationFunction = false;


        // Dynamically pushing fields based on the selected conditions
        switch (fullCorse) {
            case "LifestyleInformation/Q2":
                dynamicFields.push({ name: "ActivityType" });
                dynamicFields.push({ name: "Frequency" });
                break;
            case "FamilyMedicalHistory/Q1":
                switchValidationFunction = true;
                let key = innerPages[CurrentPageIndex].key;

                // Validate based on Heart Disease condition
                if (values[key + "_HeartDisease"] === "Yes") {
                    dynamicFields.push({ name: "FamilyMemberAffected" });
                    dynamicFields.push({ name: "AgeDiagnosis" });
                }

                // Validate based on Cancer condition
                if (values[key + "_Cancer"] === "Yes") {
                    dynamicFields.push({ name: "CancerType" });
                    dynamicFields.push({ name: "FamilyMemberAffectedCancer" });
                    dynamicFields.push({ name: "AgeDiagnosisCancer" });
                }

                // Validate based on Diabetes condition
                if (values[key + "_Diabetes"] === "Yes") {
                    dynamicFields.push({ name: "DiabetesType" });
                    dynamicFields.push({ name: "FamilyMemberAffectedDiabetes" });
                    dynamicFields.push({ name: "AgeDiagnosisDiabetes" });
                }

                // Validate based on Mental Health Conditions
                if (values[key + "_MentalHealthConditions"] === "Yes") {
                    dynamicFields.push({ name: "MentalHealthConditionsType" });
                    dynamicFields.push({ name: "FamilyMemberAffectedMentalHealthConditions" });
                    dynamicFields.push({ name: "AgeDiagnosisMentalHealthConditions" });
                }
                break;

            default:
                break;
        }

        // If dynamic fields are present, call CheckValidation
        if (dynamicFields.length > 0) {
            let Validate

            if (switchValidationFunction) {
                Validate = await validateDynamicFields(
                    innerPages[CurrentPageIndex],
                    values,
                    dynamicFields,
                    setFieldTouched,
                    validateField,
                    validateForm // Pass the dynamic fields to the validation function
                );
            }
            else {

                Validate = await CheckValidation(
                    currentPath,
                    cLocation,
                    validateForm,
                    validateField,
                    setFieldTouched,
                    innerPages[CurrentPageIndex],
                    values,
                    dynamicFields // Pass the dynamic fields to the validation function
                );

            }

            console.log(Validate)


            if (!Validate) {
                return false;
            }
            return false;
        } else {
            return false; // No dynamic fields to validate
        }
    }




    if (props.Data.Title === "Personal Details") {
        return (
            <PersonalDetails FormickOBj={props.FormickOBj} Data={props.Data} />)
    } else {
        return (
            <div className='container-fluid'>

                <div className='d-flex flex-column justify-content-start ps-4 mt-5 align-items-center d-none '>
                    <div className=' d-none' style={{ width: "7%" }}>
                        <Image src={props.parentElem.imgUrl || logo} fluid />
                    </div>
                    <div className=''>
                        <h3 className="my-3">
                            <b>{props.parentElem.Title || 'No Question Added'}</b>
                        </h3>
                    </div>
                </div>
                {props.Data.components ? (
                    React.cloneElement(props.Data.components, { Data: props.Data, FormickOBj: props.FormickOBj })
                ) : "no components exist"}

                <div className='row justify-content-center align-item-center gap-2 mb-4'>

                    <div className='col-md-3 mt-4'>
                        <Button className='w-100 backBtn'
                            onClick={handleBack}
                        >Back </Button>
                    </div>
                    <div className='col-md-3 mt-4'>
                        <Button type='button' className='btn submitBtn w-100' onClick={handleNext} >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsSet
