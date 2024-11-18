import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Questions from './Questions';
import Content from '../assets/Content';
import * as Yup from "yup";
import Disclosure from './Disclosure';
import ResultsTables from './ResultsTables';


// const generateDynamicValidation = (key, values, diseaseAndConditions) => {
//     return diseaseAndConditions.reduce((errors, condition, index) => {
//         const activityTypeKey = `${key}_ActivityType${index}`;
//         const frequencyKey = `${key}_Frequency${index}`;

//         // Check if ActivityType field is empty
//         if (!values[activityTypeKey] || values[activityTypeKey].trim() === "") {
//             errors[activityTypeKey] = `Activity type is required for ${condition}`;
//         }

//         // Check if Frequency field is empty
//         if (!values[frequencyKey] || values[frequencyKey].trim() === "") {
//             errors[frequencyKey] = `Frequency is required for ${condition}`;
//         }

//         return errors;
//     }, {});
// };

// // Validation for Heart Disease
// const validateHeartDisease = (key, values) => {
//     const errors = {};
//     if (values[`${key}_HeartDisease`] === "Yes") {
//         if (!values[`${key}_FamilyMemberAffected`]?.trim()) {
//             errors[`${key}_FamilyMemberAffected`] = "Family member affected is required.";
//         }
//         else {
//             errors[`${key}_FamilyMemberAffected`] = "Family member affected is required.";
//         }
//         if (!values[`${key}_AgeDiagnosis`]?.trim()) {
//             errors[`${key}_AgeDiagnosis`] = "Age of diagnosis is required.";
//         }
//     }

//     return errors;
// };

// // Validation for Cancer
// const validateCancer = (key, values) => {
//     const errors = {};
//     if (values[`${key}_Cancer`] === "Yes") {
//         if (!values[`${key}_CancerType`]?.trim()) {
//             errors[`${key}_CancerType`] = "Type of cancer is required.";
//         }
//         if (!values[`${key}_FamilyMemberAffectedCancer`]?.trim()) {
//             errors[`${key}_FamilyMemberAffectedCancer`] = "Family member affected is required.";
//         }
//         if (!values[`${key}_AgeDiagnosisCancer`]?.trim()) {
//             errors[`${key}_AgeDiagnosisCancer`] = "Age of diagnosis is required.";
//         }
//     }
//     return errors;
// };

// // Validation for Diabetes
// const validateDiabetes = (key, values) => {
//     const errors = {};
//     if (values[`${key}_Diabetes`] === "Yes") {
//         if (!values[`${key}_DiabetesType`]?.trim()) {
//             errors[`${key}_DiabetesType`] = "Type of diabetes is required.";
//         }
//         if (!values[`${key}_FamilyMemberAffectedDiabetes`]?.trim()) {
//             errors[`${key}_FamilyMemberAffectedDiabetes`] = "Family member affected is required.";
//         }
//         if (!values[`${key}_AgeDiagnosisDiabetes`]?.trim()) {
//             errors[`${key}_AgeDiagnosisDiabetes`] = "Age of diagnosis is required.";
//         }
//     }
//     return errors;
// };

// // Validation for Mental Health Conditions
// const validateMentalHealthConditions = (key, values) => {
//     const errors = {};
//     if (values[`${key}_MentalHealthConditions`] === "Yes") {
//         if (!values[`${key}_MentalHealthConditionsType`]?.trim()) {
//             errors[`${key}_MentalHealthConditionsType`] = "Type of mental health condition is required.";
//         }
//         if (!values[`${key}_FamilyMemberAffectedMentalHealthConditions`]?.trim()) {
//             errors[`${key}_FamilyMemberAffectedMentalHealthConditions`] = "Family member affected is required.";
//         }
//         if (!values[`${key}_AgeDiagnosisMentalHealthConditions`]?.trim()) {
//             errors[`${key}_AgeDiagnosisMentalHealthConditions`] = "Age of diagnosis is required.";
//         }
//     }
//     return errors;
// };


const validateForm = (values) => {
    const errors = {};



    // Basic validation for email
    if (!values.EmailAddress) {
        errors.EmailAddress = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EmailAddress)) {
        errors.EmailAddress = "Please! Enter a valid email";
    }


    // const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);



    // const MainPageIndex = Pages.findIndex(item => item.route === `/${currentPath}`);

    // if (MainPageIndex === -1) return; // Exit if main page not found

    // const innerPages = Pages[MainPageIndex].InnerPages.filter(page => page.condition(values));
    // const CurrentPageIndex = innerPages.findIndex(item => item.route === `/${cLocation}`);

    // // Dynamic validation for hazardous activities
    // const key = "hazardousActivitiesSports";
    // const diseaseAndConditions = values[`${key}_diseaseAndConditions`] || [];

    // if (diseaseAndConditions.length === 0) {
    //     errors[`${key}_diseaseAndConditions`] = "Please select at least one condition.";
    // }

    return {
        ...errors,
        // ...generateDynamicValidation(key, values, diseaseAndConditions),
        // ...validateHeartDisease(key, values),
        // ...validateCancer(key, values),
        // ...validateDiabetes(key, values),
        // ...validateMentalHealthConditions(key, values),
    };
};



const Starter = () => {

    let { Pages } = Content;

    let [initialValues, setInitialValues] = useState({
        disclosureAccept: false,
        DateBirth: ""
    })

    useEffect(() => {
        if (localStorage.getItem("AdviserAssess")) {
            setInitialValues(JSON.parse(localStorage.getItem("AdviserAssess")))
        }
    }, [])

    let onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            validate={validateForm}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue, handleChange, handleBlur, validateForm, validateField, setFieldTouched }) => (
                <Form className="">

                    <Routes>
                        {Pages.map((elem, index) => {
                            if (index === 0) {
                                return (<Route key={index} path="/" element={<LandingPage elem={elem} />} />)
                            }
                            if (index === 1) {
                                return (<Route key={index} path="/Disclosure" element={<Disclosure values={values} elem={elem} />} />)
                            }
                            else {
                                return (<Route key={index} path={elem.route + "/*"} element={<Questions elem={elem} FormickOBj={{
                                    isSubmitting,
                                    values,
                                    setFieldValue,
                                    handleChange,
                                    handleBlur,
                                    validateForm,
                                    validateField,
                                    setFieldTouched
                                }} />} />)
                            }
                        })}
                    </Routes>

                    <ResultsTables
                        FormickOBj={{
                            isSubmitting,
                            values,
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            validateForm,
                            validateField,
                            setFieldTouched
                        }}
                    />

                </Form>)}
        </Formik>
    )
}


export default Starter
