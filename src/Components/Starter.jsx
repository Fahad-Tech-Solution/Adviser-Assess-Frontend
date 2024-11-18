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
            const apiEndpoint = "http://192.168.2.12:7000/api/preAssessInsuranceEmail/";

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



    const generatePDF = async (values) => {
        try {
            const doc = new jsPDF("p", "pt", "letter");
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            const imageSrc = logo; // Fallback if the logo fails
            const img = new window.Image();
            img.src = imageSrc;

            // Wait for the image to load
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => reject(new Error("Failed to load image."));
            });

            const x = (pageWidth - 200) / 2; // Center horizontally
            const y = 25;

            // Add the logo image
            doc.addImage(img, "PNG", x, y, 200, 200); // x, y, width, height

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


            // Example conditions and tables
            renderTableIfCondition(
                values["heartDiseaseConditions_diseaseAndConditions"] &&
                values["heartDiseaseConditions_DynamicYesNo"] === "Yes",
                "Heart Disease or Conditions",
                "resultTable1"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["HighBloodPressureHighCholesterol_DynamicYesNo"] === "Yes",
                "High Blood Pressure or High Cholesterol",
                "resultTable2"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["RespiratoryConditions_diseaseAndConditions"] && values["RespiratoryConditions_DynamicYesNo"] === "Yes",
                "Respiratory Conditions",
                "resultTable3"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values?.["CancerTumorsCysts_diseaseAndConditions"] && values["CancerTumorsCysts_DynamicYesNo"] === "Yes",
                "Cancer, Tumors, or Cysts",
                "resultTable4"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["Diabetes_TypeDiabetes-0"] && values["Diabetes_DynamicYesNo"] === "Yes",
                "Diabetes (Type 1 or Type 2)",
                "resultTable5"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["MentalHealthConditions_diseaseAndConditions"] && values["MentalHealthConditions_DynamicYesNo"] === "Yes",
                "Mental Health Conditions",
                "resultTable6"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["BackNeckPain_diseaseAndConditions"] && values["BackNeckPains_DynamicYesNo"] === "Yes",
                "Back or Neck Pain",
                "resultTable7"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["StrokeNeurologicalConditions_diseaseAndConditions"] && values["StrokeNeurologicalConditions_DynamicYesNo"] === "Yes",
                "Stroke or Neurological Conditions",
                "resultTable8"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["LiverKidneyGastrointestinalConditions_diseaseAndConditions"] && values["LiverKidneyGastrointestinalConditions_DynamicYesNo"] === "Yes",
                "Liver, Kidney, or Gastrointestinal Conditions",
                "resultTable9"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["ArthritisJointDisorders_diseaseAndConditions"] && values["ArthritisJointDisorders_DynamicYesNo"] === "Yes",
                "Arthritis or Joint Disorders",
                "resultTable10"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values?.["HIVAIDSOtherImmuneSystemDisorders_diseaseAndConditions"] && values["HIVAIDSOtherImmuneSystemDisorders_DynamicYesNo"] === "Yes",
                "HIV/AIDS or Other Immune System Disorders",
                "resultTable11"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values?.["LifestyleInformation_Smoker"] === "Yes" || values?.["LifestyleInformation_Vape"] === "Yes",
                "Impact of Smoking on Insurance Premiums",
                "resultTable12"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values?.["LifestyleInformation_alcohol"] === "Yes",
                "Impact of Alcohol Consumption on Insurance Premiums",
                "resultTable13"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["LifestyleInformation_RecreationalDrugs"] === "Yes",
                "Impact of Drug Use on Insurance Premiums",
                "resultTable14"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values["hazardousActivitiesSports_diseaseAndConditions"] && values["hazardousActivitiesSports_DynamicYesNo"] === "Yes",
                "Impact of Individual Hazardous Activities on Insurance Premiums",
                "resultTable15"
            );

            // Example conditions and tables
            renderTableIfCondition(
                values?.["FamilyMedicalHistory_HeartDisease`"] === "Yes"
                || values?.["FamilyMedicalHistory_Cancer`"] === "Yes"
                || values?.["FamilyMedicalHistory_Diabetes`"] === "Yes"
                || values?.["FamilyMedicalHistory_MentalHealthConditions`"] === "Yes"
                || values?.["FamilyMedicalHistory_Vape"] === "Yes",
                "Impact of Family History on Specific Cancers and Conditions on Insurance Premiums",
                "resultTable16"
            );

            // Example conditions and tables
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
