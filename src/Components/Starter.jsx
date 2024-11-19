import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Questions from './Questions';
import Content from '../assets/Content';
import * as Yup from "yup";
import Disclosure from './Disclosure';
import ResultsTables from './ResultsTables';
import jsPDF from "jspdf";
import "jspdf-autotable";

import logo from "../assets/Images/Logo-2.png";
import { PostAxios } from '../assets/Api/Api';

const validateDeclarationSignature = (value) => {
    if (!value || value.trim() === "") {
        return "Signature is required.";
    }
    const alphabetRegex = /^[A-Za-z\s]+$/;
    if (!alphabetRegex.test(value)) {
        return "Signature must contain only alphabets.";
    }
    return null; // No error
};

const validateForm = (values) => {

    const errors = {};

    try {

        // Basic validation for email
        if (!values.EmailAddress) {
            errors.EmailAddress = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EmailAddress)) {
            errors.EmailAddress = "Please! Enter a valid email";
        }
        // Dynamically build required fields based on conditions
        const requiredFields = [];

        if (values["EmploymentStatus_DynamicYesNo"] === "No") {
            requiredFields.push({ name: "EmploymentStatus_Situation", label: "Employment Status Situation" });
        } else {
            requiredFields.push(
                { name: "EmploymentStatus_OccupationJobTitle", label: "Occupation Job Title" },
                { name: "EmploymentStatus_EmploymentType", label: "Employment Type" }
            );

            if (values["EmploymentStatus_EmploymentType"] === "Other") {
                requiredFields.push({ name: "EmploymentStatus_Other", label: "Other" });
            } else if (values["EmploymentStatus_EmploymentType"] === "Self-employed") {
                requiredFields.push(
                    { name: "EmploymentStatus_BusinessName", label: "Business Name" },
                    { name: "EmploymentStatus_NatureOfBusiness", label: "Nature of Business" },
                    { name: "EmploymentStatus_StartDateOfBusiness", label: "Start Date of Business" },
                    { name: "EmploymentStatus_NetProfit", label: "Net Profit" }
                );
            }
        }

        if (values["SecondOccupation_DynamicYesNo"] === "Yes") {
            requiredFields.push(
                { name: "SecondOccupation_OccupationJobTitle", label: "Second Occupation Job Title" },
                { name: "SecondOccupation_EmploymentType", label: "Second Occupation Employment Type" }
            );

            if (values["SecondOccupation_EmploymentType"] === "Other") {
                requiredFields.push({ name: "SecondOccupation_Other", label: "Second Occupation Other" });
            }

            requiredFields.push(
                { name: "EmploymentStatus_SecondaryOccupation", label: "Secondary Occupation" },
                { name: "EmploymentStatus_SecondWorkHours", label: "Second Work Hours" }
            );
        }

        requiredFields.push(
            { name: "EmploymentStatus_primaryOccupation", label: "Primary Occupation" },
            { name: "EmploymentStatus_incomeStructured", label: "Income Structured" }
        );

        if (values["EmploymentStatus_incomeStructured"] === "Other") {
            requiredFields.push({ name: "EmploymentStatus_otherIncomeStructured", label: "Other Income Structured" });
        }

        if (values["EmploymentStatus_hazardousDuties"] === "Yes") {
            requiredFields.push({ name: "EmploymentStatus_Specify", label: "Specify" });

            if (values["EmploymentStatus_Specify"] === "Other") {
                requiredFields.push({ name: "EmploymentStatus_otherPleaseSpecify", label: "Other Income Structured" });
            }
        }

        requiredFields.push(
            { name: "EmploymentStatus_primaryWorkHours", label: "Primary Work Hours" },
            { name: "EmploymentStatus_workPerYear", label: "Work Per Year" },
            { name: "EmploymentStatus_FIFO", label: "FIFO" }
        );

        if (values["heartDiseaseConditions_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["heartDiseaseConditions_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "heartDiseaseConditions_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "heartDiseaseConditions_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "heartDiseaseConditions_ongoingResolved" + i, label: elem + " on going resolved" },
                        { name: "heartDiseaseConditions_treatmentsMedications" + i, label: elem + " Treatment Medication" }
                    );
                });
            }
        }

        if (values["HighBloodPressureHighCholesterol_DynamicYesNo"] === "Yes") {
            requiredFields.push(
                { name: "HighBloodPressureHighCholesterol_DateOfDiagnosis", label: "Date of Diagnosis" },
                { name: "HighBloodPressureHighCholesterol_LatestBloodPressure", label: "Latest Blood Pressure Reading (mmHg)" },
                { name: "HighBloodPressureHighCholesterol_LatestCholesterol", label: "Latest Cholesterol Reading (mg/dL)" },
                { name: "HighBloodPressureHighCholesterol_MedicationsTreatment", label: "Medications or Treatment" }
            );
        }

        if (values["RespiratoryConditions_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["RespiratoryConditions_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "RespiratoryConditions_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "RespiratoryConditions_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "RespiratoryConditions_MedicationsTreatment" + i, label: elem + " Medication Treatment" }
                    );
                });
            }
        }

        if (values["CancerTumorsCysts_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["CancerTumorsCysts_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "CancerTumorsCysts_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "CancerTumorsCysts_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "CancerTumorsCysts_Treatment" + i, label: elem + " Treatments or Surgery" },
                        { name: "CancerTumorsCysts_CurrentCondition" + i, label: elem + " Current Condition" }
                    );
                });
            }
        }

        if (values["Diabetes_DynamicYesNo"] === "Yes") {
            requiredFields.push(
                { name: "Diabetes_TypeDiabetes", label: "Type of Diabetes" },
                { name: "Diabetes_DateOfDiagnosis", label: "Date of Diagnosis" },
                { name: "Diabetes_Treatment", label: "Treatment" },
                { name: "Diabetes_HbA1cReading", label: "Latest HbA1c Reading (%)" },
                { name: "Diabetes_GlucoseReading", label: "Latest Fasting Glucose Reading (mg/dL)" },
            );

            if (values["Diabetes_Treatment"] === "Other") {
                requiredFields.push(
                    { name: "Diabetes_TreatmentOther", label: "Other" },
                );
            }

        }

        if (values["MentalHealthConditions_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["MentalHealthConditions_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && values[`MentalHealthConditions_diseaseAndConditions`].includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "MentalHealthConditions_Other", label: elem + " Details" },
                    );
                });
            }
            else {
                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "MentalHealthConditions_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "MentalHealthConditions_MedicationsTreatment" + i, label: elem + " Medications or Treatment" },
                    );
                    if (values["MentalHealthConditions_MedicationsTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "MentalHealthConditions_MedicationsTreatmentOther" + i, label: elem + " Medications or Treatment Other" },
                        );
                    }
                });
                requiredFields.push(
                    { name: "MentalHealthConditions_PsychologistCare", label: "Have you seen a Psychologist or undertaken a Mental Health Care Plan ?" },
                )
                if (values[`MentalHealthConditions_PsychologistCare`] !== "No, I have not seen a psychologist or undertaken a health care plan" && values[`MentalHealthConditions_PsychologistCare`] !== "") {
                    requiredFields.push(
                        { name: "MentalHealthConditions_PsychologistSessions", label: "How many sessions have you completed?" },
                        { name: "MentalHealthConditions_PsychologistTimePeriod", label: "Over what time period (e.g., months or years)?" },
                    );
                }
            }
        }

        if (values["BackNeckPain_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["BackNeckPain_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "BackNeckPain_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "BackNeckPain_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "BackNeckPain_CurrentTreatment" + i, label: elem + " Current treatment or management" },
                        { name: "BackNeckPain_CurrentStatus" + i, label: elem + " Current status" },
                    );

                    if (values["BackNeckPain_CurrentTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "BackNeckPain_CurrentTreatmentOther" + i, label: elem + " Current treatment or management Other" },
                        );
                    }
                    if (values["BackNeckPain_CurrentStatus" + i] === "Other") {
                        requiredFields.push(
                            { name: "BackNeckPain_CurrentStatusOther" + i, label: elem + " Current status Other" },
                        );
                    }
                });
            }
        }

        if (values["StrokeNeurologicalConditions_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["StrokeNeurologicalConditions_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "StrokeNeurologicalConditions_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "StrokeNeurologicalConditions_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "StrokeNeurologicalConditions_MedicationsTreatment" + i, label: elem + " Medications Treatment" },
                    );

                    if (values["StrokeNeurologicalConditions_MedicationsTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "StrokeNeurologicalConditions_MedicationsTreatmentOther" + i, label: elem + " Medications Treatment Other" },
                        );
                    }
                });
            }
        }

        if (values["LiverKidneyGastrointestinalConditions_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["LiverKidneyGastrointestinalConditions_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "LiverKidneyGastrointestinalConditions_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "LiverKidneyGastrointestinalConditions_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "LiverKidneyGastrointestinalConditions_MedicationsTreatment" + i, label: elem + " Medications Treatment" },
                    );

                    if (values["LiverKidneyGastrointestinalConditions_MedicationsTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "LiverKidneyGastrointestinalConditions_MedicationsTreatmentOther" + i, label: elem + " Medications Treatment Other" },
                        );
                    }
                });
            }
        }

        if (values["ArthritisJointDisorders_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["ArthritisJointDisorders_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "ArthritisJointDisorders_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "ArthritisJointDisorders_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        { name: "ArthritisJointDisorders_ImpactOnMobility" + i, label: elem + " Impact on mobility" },
                        { name: "ArthritisJointDisorders_MedicationsTreatment" + i, label: elem + " Medications Treatment" },
                    );

                    if (values["ArthritisJointDisorders_MedicationsTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "ArthritisJointDisorders_MedicationsTreatmentOther" + i, label: elem + " Medications Treatment Other" },
                        );
                    }
                });
            }
        }

        if (values["HIVAIDSOtherImmuneSystemDisorders_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["HIVAIDSOtherImmuneSystemDisorders_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "HIVAIDSOtherImmuneSystemDisorders_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "HIVAIDSOtherImmuneSystemDisorders_DateOfDiagnosis" + i, label: elem + " Date of Diagnosis" },
                        // { name: "HIVAIDSOtherImmuneSystemDisorders_ImpactOnMobility" + i, label: elem + " Impact on mobility" },
                        { name: "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatment" + i, label: elem + " Medications Treatment" },
                    );

                    if (values["HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatment" + i] === "Other") {
                        requiredFields.push(
                            { name: "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatmentOther" + i, label: elem + " Medications Treatment Other" },
                        );
                    }
                });
            }
        }


        if (values["SurgeriesOperations_DynamicYesNo"] === "Yes") {
            requiredFields.push(
                { name: "SurgeriesOperations_TypeOfSurgeryOperation", label: "Type of surgery/operation" },
                { name: "Diabetes_DateOfDiagnosis", label: "Date of Diagnosis" },
                { name: "SurgeriesOperations_ElectiveRequiredSurgery", label: "Was it elective or required surgery?" },
                { name: "SurgeriesOperations_CurrentStatus", label: "Current status" },
            );
            if (values[`SurgeriesOperations_CurrentStatus`] === "Other") {

                requiredFields.push(

                    { name: "SurgeriesOperations_CurrentStatusOther", label: "Current status Other" },
                )
            }
        }


        if (values[`LifestyleInformation_SmokerYesNo`] === "Yes") {
            requiredFields.push(
                { name: "LifestyleInformation_Smoker", label: "Do you smoke or have you ever smoked ?" },
            );
        }

        if (values[`LifestyleInformation_VapeYesNo`] === "Yes") {
            requiredFields.push(
                { name: "LifestyleInformation_Vape", label: "Do you vape or have you ever vaped ?" },
            );
        }


        if ((values?.["LifestyleInformation_Smoker"] === "Yes, I currently smoke" || values?.["LifestyleInformation_Smoker"] === "Yes, I used to smoke") ||
            (values?.["LifestyleInformation_Vape"] === "Yes, I currently vape" || values?.["LifestyleInformation_Vape"] === "Yes, I used to vape")) {
            requiredFields.push(
                { name: "LifestyleInformation_NumberOfCigarettes", label: " Number of cigarettes or vape units per day" },
                { name: "LifestyleInformation_YearQuit", label: "Year you quit (if applicable)" },
            );
        }

        if (values[`LifestyleInformation_alcohol`] === "Yes") {
            requiredFields.push(
                { name: "LifestyleInformation_drinksPerWeek", label: "Number of standard drinks per week" },
            );
        }

        if (values[`LifestyleInformation_RecreationalDrugs`] === "Yes") {
            requiredFields.push(
                { name: "LifestyleInformation_drugType", label: "Type of drug(s) used" },
                { name: "LifestyleInformation_Frequency", label: "Frequency of use" },
                // { name: "LifestyleInformation_yearQuit", label: "Year quit (if applicable)" },
            );
        }

        if (values["hazardousActivitiesSports_DynamicYesNo"] === "Yes") {
            let diseaseAndConditions = values["hazardousActivitiesSports_diseaseAndConditions"] || []

            if (diseaseAndConditions.length === 1 && diseaseAndConditions.includes("Other")) {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "hazardousActivitiesSports_Other", label: elem + " Details" },
                    );
                });
            }
            else {

                diseaseAndConditions.forEach((elem, i) => {
                    requiredFields.push(
                        { name: "hazardousActivitiesSports_ActivityType" + i, label: elem + " Activity type" },
                        { name: "hazardousActivitiesSports_Frequency" + i, label: elem + " Frequency" },
                    );
                });
            }
        }


        if (values[`hazardousActivitiesSports_travelOverseas`] === "Yes") {
            requiredFields.push(
                { name: "hazardousActivitiesSports_RegionTraveled", label: "Country/region traveled to" },
                { name: "hazardousActivitiesSports_DateTravel", label: "Date of travel" },
            );
        }


        if (values[`FamilyMedicalHistory_HeartDisease`] === "Yes") {
            requiredFields.push(
                { name: "FamilyMedicalHistory_FamilyMemberAffected", label: "Family member affected" },
                { name: "FamilyMedicalHistory_AgeDiagnosis", label: "Age of diagnosis" },
            );
        }

        if (values[`FamilyMedicalHistory_Cancer`] === "Yes") {
            requiredFields.push(
                { name: "FamilyMedicalHistory_CancerType", label: "Type of cancer" },
                { name: "FamilyMedicalHistory_FamilyMemberAffectedCancer", label: "Family member affected" },
                { name: "FamilyMedicalHistory_AgeDiagnosisCancer", label: "Age of diagnosis" },
            );
        }

        if (values[`FamilyMedicalHistory_Diabetes`] === "Yes") {
            requiredFields.push(
                { name: "FamilyMedicalHistory_DiabetesType", label: "Type of diabetes" },
                { name: "FamilyMedicalHistory_FamilyMemberAffectedDiabetes", label: "Family member affected" },
                { name: "FamilyMedicalHistory_AgeDiagnosisDiabetes", label: "Age of diagnosis" },
            );
        }

        if (values[`FamilyMedicalHistory_MentalHealthConditions`] === "Yes") {
            requiredFields.push(
                { name: "FamilyMedicalHistory_MentalHealthConditionsType", label: "Type of Mental Health Conditions" },
                { name: "FamilyMedicalHistory_FamilyMemberAffectedMentalHealthConditions", label: "Family member affected" },
                { name: "FamilyMedicalHistory_AgeDiagnosisMentalHealthConditions", label: "Age of diagnosis" },
            );
        }

        // requiredFields.push(
        //     { name: "Declaration_Signature", label: "Signature " },
        // );
        // Validate required fields
        requiredFields.forEach(({ name, label }) => {
            // if (!values[name] || values[name].trim() === "") {
            if (!values[name] || (typeof values[name] === "string" && values[name].trim() === "")) {
                // Assign the custom error message with the label
                errors[name] = `${label} is required.`;
            }
        });

        // Validate Declaration_Signature separately
        const signatureError = validateDeclarationSignature(values["Declaration_Signature"]);
        if (signatureError) {
            errors["Declaration_Signature"] = signatureError;
        }

        return {
            ...errors,
        };

    } catch (err) {
        console.log(err)
    }
};

const Starter = () => {

    let { Pages } = Content;

    let [initialValues, setInitialValues] = useState({
        disclosureAccept: false,
        DateBirth: "",
        "Declaration_FinalDate": ""
    })

    useEffect(() => {
        if (localStorage.getItem("AdviserAssess")) {
            setInitialValues(JSON.parse(localStorage.getItem("AdviserAssess")))
        }
    }, [])

    let onSubmit = async (values) => {
        try {
            console.log("Form Values:", values);

            // Generate the PDF
            const pdfBlob = await generatePDF(values);

            // Convert Blob to Base64 (optional, if needed elsewhere)
            const base64PDF = await convertBlobToBase64(pdfBlob);
            console.log("Base64 PDF:", base64PDF);

            // Prepare FormData
            const formData = new FormData();
            formData.append("name", values.Full_Name || "Usama"); // Add Name
            formData.append("email", values.EmailAddress || "usamafaheem80@gmail.com"); // Add Email
            formData.append("pdfFile", new File([pdfBlob], "Adviser_Report.pdf", { type: "application/pdf" })); // Add PDF as File

            // API Endpoint (replace with your actual endpoint)
            const apiEndpoint = "http://ec2-3-25-227-176.ap-southeast-2.compute.amazonaws.com:7000/api/preAssessInsuranceEmail/";

            // Send FormData via PostAxios
            const response = await PostAxios(apiEndpoint, formData);
            console.log("Response from API:", response);

            // alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error in onSubmit:", error);
            // alert("Failed to submit form. Please try again.");
        }
    };


    var convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const convertToBase64 = (imgSrc) => {
        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = imgSrc;
            img.crossOrigin = "Anonymous"; // Handle cross-origin issues
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const base64String = canvas.toDataURL("image/png");
                resolve(base64String);
            };
            img.onerror = () => reject(new Error("Failed to convert image to Base64."));
        });
    };

    const addLogoToPDF = async (doc, logoSrc) => {
        try {
            // Convert the logo to Base64
            const base64Image = await convertToBase64(logoSrc);

            // Define image position and size
            const x = (doc.internal.pageSize.width - 200) / 2; // Center horizontally
            const y = 100; // Top margin

            // Add the Base64 logo to the PDF
            doc.addImage(base64Image, "PNG", x, y, 200, 200); // x, y, width, height
        } catch (error) {
            console.error("Error adding the logo to the PDF:", error.message);
        }
    };

    const generatePDF = async (values) => {
        try {
            const doc = new jsPDF("p", "pt", "letter");
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            await addLogoToPDF(doc, logo); // Add the logo

            // Add report title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(35);
            doc.setTextColor("#36b446");
            doc.text("Adviser Assess Report", pageWidth / 2, 320, { align: "center" });

            // Add subtitle
            doc.setFontSize(13);
            doc.setTextColor("#000");
            doc.text(
                `Prepared for ${values.Full_Name || "Usama"}`,
                pageWidth / 2,
                370,
                { align: "center" }
            );

            // Add footer
            doc.setFontSize(8);
            doc.text("www.denarowealth.com.au", pageWidth / 2, pageHeight - 60, {
                align: "center",
            });
            doc.text(
                "Denaro Wealth Pty Ltd. All Rights Reserved",
                pageWidth / 2,
                pageHeight - 50,
                { align: "center" }
            );
            doc.text(
                "Denaro Wealth Pty Ltd is an authorised representative of Lifespan Financial Planning Pty Ltd ASFL 229892",
                pageWidth / 2,
                pageHeight - 40,
                { align: "center", maxWidth: 400 }
            );

            // Add new page and table
            doc.addPage();
            doc.setFontSize(18);
            doc.setTextColor("#28a745");
            doc.text(
                55,
                70,
                "Insurance Assessment Matrix for Various Medical Conditions",
                { align: "left", maxWidth: 600 }
            );

            doc.setFillColor(54, 180, 70);
            doc.rect(55, 80, 530, 2, "F");

            // Function to check if a new page is needed
            const checkAndAddPage = () => {
                if (currentY + 200 > pageHeight) {
                    doc.addPage(); // Add a new page
                    currentY = 60; // Reset Y-coordinate for new page
                }
            };

            // Set initial Y-coordinate for table rendering
            let currentY = 150; // Starting Y position for tables

            const renderTableIfCondition = (condition, title, tableId) => {
                if (condition) {

                    checkAndAddPage(); // Check if a new page is needed before rendering


                    doc.setFontSize(14);
                    doc.text(55, currentY - 10, title); // Adjust title placement above the table

                    doc.autoTable({
                        html: `#${tableId}`, // Table ID
                        margin: { left: 55 },
                        startY: currentY,
                        theme: "grid",
                        headStyles: {
                            fillColor: "#28a745",
                            fontSize: 12,
                        },
                        styles: {
                            minCellHeight: 40,
                        },
                    });

                    // Update Y-coordinate for the next table
                    currentY = doc.lastAutoTable.finalY + 50; // Add padding below the table
                }
            };

            // Table 1
            renderTableIfCondition(
                values["heartDiseaseConditions_diseaseAndConditions"] &&
                values["heartDiseaseConditions_DynamicYesNo"] === "Yes",
                "Heart Disease or Conditions",
                "resultTable1"
            );

            // Table 2
            renderTableIfCondition(
                values["HighBloodPressureHighCholesterol_DynamicYesNo"] === "Yes",
                "High Blood Pressure or High Cholesterol",
                "resultTable2"
            );

            // Table 3
            renderTableIfCondition(
                values["RespiratoryConditions_diseaseAndConditions"] && values["RespiratoryConditions_DynamicYesNo"] === "Yes",
                "Respiratory Conditions",
                "resultTable3"
            );

            // Table 4
            renderTableIfCondition(
                values?.["CancerTumorsCysts_diseaseAndConditions"] && values["CancerTumorsCysts_DynamicYesNo"] === "Yes",
                "Cancer, Tumors, or Cysts",
                "resultTable4"
            );

            // Table 5
            renderTableIfCondition(
                values["Diabetes_TypeDiabetes-0"] && values["Diabetes_DynamicYesNo"] === "Yes",
                "Diabetes (Type 1 or Type 2)",
                "resultTable5"
            );

            // Table 6
            renderTableIfCondition(
                values["MentalHealthConditions_diseaseAndConditions"] && values["MentalHealthConditions_DynamicYesNo"] === "Yes",
                "Mental Health Conditions",
                "resultTable6"
            );

            // Table 7
            renderTableIfCondition(
                values["BackNeckPain_diseaseAndConditions"] && values["BackNeckPains_DynamicYesNo"] === "Yes",
                "Back or Neck Pain",
                "resultTable7"
            );

            // Table 8
            renderTableIfCondition(
                values["StrokeNeurologicalConditions_diseaseAndConditions"] && values["StrokeNeurologicalConditions_DynamicYesNo"] === "Yes",
                "Stroke or Neurological Conditions",
                "resultTable8"
            );

            // Table 9
            renderTableIfCondition(
                values["LiverKidneyGastrointestinalConditions_diseaseAndConditions"] && values["LiverKidneyGastrointestinalConditions_DynamicYesNo"] === "Yes",
                "Liver, Kidney, or Gastrointestinal Conditions",
                "resultTable9"
            );

            // Table 10
            renderTableIfCondition(
                values["ArthritisJointDisorders_diseaseAndConditions"] && values["ArthritisJointDisorders_DynamicYesNo"] === "Yes",
                "Arthritis or Joint Disorders",
                "resultTable10"
            );

            // Table 11
            renderTableIfCondition(
                values?.["HIVAIDSOtherImmuneSystemDisorders_diseaseAndConditions"] && values["HIVAIDSOtherImmuneSystemDisorders_DynamicYesNo"] === "Yes",
                "HIV/AIDS or Other Immune System Disorders",
                "resultTable11"
            );

            // Table 12
            renderTableIfCondition(
                values?.["LifestyleInformation_Smoker"] === "Yes" || values?.["LifestyleInformation_Vape"] === "Yes",
                "Impact of Smoking on Insurance Premiums",
                "resultTable12"
            );

            // Table 13
            renderTableIfCondition(
                values?.["LifestyleInformation_alcohol"] === "Yes",
                "Impact of Alcohol Consumption on Insurance Premiums",
                "resultTable13"
            );

            // Table 14
            renderTableIfCondition(
                values["LifestyleInformation_RecreationalDrugs"] === "Yes",
                "Impact of Drug Use on Insurance Premiums",
                "resultTable14"
            );

            // Table 15
            renderTableIfCondition(
                values["hazardousActivitiesSports_diseaseAndConditions"] && values["hazardousActivitiesSports_DynamicYesNo"] === "Yes",
                "Impact of Individual Hazardous Activities on Insurance Premiums",
                "resultTable15"
            );

            // Table 16
            renderTableIfCondition(
                values?.["FamilyMedicalHistory_HeartDisease`"] === "Yes"
                || values?.["FamilyMedicalHistory_Cancer`"] === "Yes"
                || values?.["FamilyMedicalHistory_Diabetes`"] === "Yes"
                || values?.["FamilyMedicalHistory_MentalHealthConditions`"] === "Yes"
                || values?.["FamilyMedicalHistory_Vape"] === "Yes",
                "Impact of Family History on Specific Cancers and Conditions on Insurance Premiums",
                "resultTable16"
            );

            // Table 17
            renderTableIfCondition(
                values["BMI"],
                "Insurance Outcomes Based on BMI (Australian Standards)",
                "resultTable17"
            );

            // Output the PDF
            const pdfData = doc.output("blob");
            window.open(URL.createObjectURL(pdfData));
            console.log("PDF generated successfully.");
            // return pdfData;
        } catch (error) {
            console.error("Error generating PDF:", error.message);
            alert("An error occurred while generating the PDF. Please try again.");
        }
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
