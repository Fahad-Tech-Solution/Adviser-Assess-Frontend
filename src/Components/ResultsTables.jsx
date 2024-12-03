import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { DateHandler } from '../assets/Api/Api'

const ResultsTables = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data


    const [selectedConditions, setSelectedConditions] = useState([]);
    const [renderHighBloodPressureCholesterolTable, setrenderHighBloodPressureCholesterolTable] = useState(false);
    const [selectedPulmonaryConditions, setSelectedPulmonaryConditions] = useState([]);
    const [selectedCancerConditions, setSelectedCancerConditions] = useState([]);
    const [selectedDiabetesConditions, setSelectedDiabetesConditions] = useState([]);
    const [selectedMentalHealthConditions, setSelectedMentalHealthConditions] = useState([]);
    const [selectedSpineAndBackConditions, setSelectedSpineAndBackConditions] = useState([]);
    const [selectedNeurologicalConditions, setSelectedNeurologicalConditions] = useState([]);
    const [selectedOrganConditions, setSelectedOrganConditions] = useState([]);
    const [selectedArthritisConditions, setSelectedArthritisConditions] = useState([]);
    const [selectedHIVAIDSConditionCondition, setrenderselectedHIVAIDSConditionCondition] = useState(false);
    const [selectedSmokingInsuranceImpact, setselectedSmokingInsuranceImpact] = useState(false);
    const [FamilyMedicalHistory_HeartDisease, setFamilyMedicalHistory_HeartDisease] = useState(false);
    const [selectedAlcoholConsumptionInsuranceImpact, setselectedAlcoholConsumptionInsuranceImpact] = useState(false);
    const [selectedDrugUseInsuranceImpact, setselectedDrugUseInsuranceImpact] = useState(false);
    const [selectedHighRiskActivityInsuranceImpact, setSelectedHighRiskActivityInsuranceImpact] = useState([]);
    const [selectedBmiInsuranceImpact, setSelectedBmiInsuranceImpact] = useState([]);

    const HighBloodPressureCholesterolConditions = {
        "High Blood Pressure": {
            "lifeInsurance": "Loadings or exclusions if unmanaged. Well-managed cases may be accepted.",
            "tpdInsurance": "Exclusions for complications (e.g., stroke).",
            "incomeProtection": "Exclusions for claims arising from unmanaged hypertension.",
            "traumaInsurance": "Exclusions for trauma events like stroke related to high blood pressure."
        },
        "High Cholesterol": {
            "lifeInsurance": "Loadings if unmanaged.",
            "tpdInsurance": "Exclusions for related disabilities (e.g., heart disease).",
            "incomeProtection": "Exclusions for heart-related claims.",
            "traumaInsurance": "Exclusions for heart attacks or strokes related to high cholesterol."
        }
    };


    const HIVAIDSCondition = {
        "HIV/AIDS": {
            "lifeInsurance": "Declined or exclusions for both HIV and AIDS.",
            "tpdInsurance": "Declined for disabilities related to immune system failure.",
            "incomeProtection": "Declined for income protection claims related to HIV/AIDS.",
            "traumaInsurance": "Declined or excluded for trauma events related to HIV/AIDS."
        }
    };

    const SmokingInsuranceImpact = {
        "Assessment Process": {
            "lifeInsurance": "Underwriters evaluate smoking habits (frequency, duration) and may require medical records.",
            "tpdInsurance": "Assessment includes the likelihood of disability from smoking-related conditions.",
            "incomeProtection": "Underwriters analyze the risk of incapacitation due to smoking-related health issues.",
            "traumaInsurance": "Evaluation of risk for trauma events linked to smoking (e.g., heart disease, cancer)."
        },
        "Impact on Premiums": {
            "lifeInsurance": "Higher premiums for smokers due to increased health risks associated with smoking-related illnesses.",
            "tpdInsurance": "Higher premiums reflecting the increased risk of permanent disabilities.",
            "incomeProtection": "Higher premiums due to increased likelihood of claims.",
            "traumaInsurance": "Increased premiums due to higher risk factors associated with trauma conditions."
        },
        "Estimated Premium Increase": {
            "lifeInsurance": "20% - 50% higher than non-smokers",
            "tpdInsurance": "25% - 60% higher than non-smokers",
            "incomeProtection": "15% - 30% higher than non-smokers",
            "traumaInsurance": "20% - 40% higher than non-smokers"
        },
        "Additional Notes": {
            "lifeInsurance": "Smokers may face classifications based on their smoking behavior, affecting rates.",
            "tpdInsurance": "Exclusions may apply for claims related to smoking-related disabilities.",
            "incomeProtection": "Additional medical examinations may be required for applicants with smoking-related health issues.",
            "traumaInsurance": "Specific exclusions may be placed on claims related to smoking-induced trauma."
        }
    };


    const AlcoholConsumptionInsuranceImpact = {
        "Drinks Per Week Impact": {
            "lifeInsurance": "Consumption of more than 14 standard drinks per week significantly increases premiums.",
            "tpdInsurance": "Drinking more than 10 standard drinks per week may affect premiums and coverage options.",
            "incomeProtection": "Regular consumption of 15 or more drinks per week can lead to higher premiums and potential exclusions.",
            "traumaInsurance": "More than 10 drinks per week can influence risk assessments and premium rates."
        },
        "Assessment Process": {
            "lifeInsurance": "Underwriters assess alcohol consumption habits, including frequency and quantity, and may require medical records.",
            "tpdInsurance": "Assessment includes the likelihood of disability due to alcohol-related conditions.",
            "incomeProtection": "Underwriters evaluate the risk of incapacitation from alcohol-related health issues.",
            "traumaInsurance": "Evaluation of risk for trauma events linked to alcohol consumption (e.g., liver disease, accidents)."
        },
        "Impact on Premiums": {
            "lifeInsurance": "Higher premiums for individuals with high alcohol consumption due to associated health risks.",
            "tpdInsurance": "Increased premiums reflecting the higher risk of permanent disabilities related to alcohol use.",
            "incomeProtection": "Higher premiums due to the likelihood of claims related to alcohol-related incapacitation.",
            "traumaInsurance": "Increased premiums due to the higher risk of trauma-related claims associated with alcohol consumption."
        },
        "Estimated Premium Increase": {
            "lifeInsurance": "15% - 30% higher than non-drinkers, depending on consumption levels.",
            "tpdInsurance": "20% - 40% higher than non-drinkers, especially for those with a history of alcohol-related issues.",
            "incomeProtection": "10% - 25% higher than non-drinkers, based on health evaluations.",
            "traumaInsurance": "15% - 35% higher than non-drinkers, influenced by health history."
        },
        "Additional Notes": {
            "lifeInsurance": "Individuals with a history of alcohol abuse or related health issues may face significantly higher premiums or exclusions.",
            "tpdInsurance": "Exclusions may apply for claims related to disabilities caused by alcohol consumption.",
            "incomeProtection": "Additional medical examinations may be required for applicants with alcohol-related health issues.",
            "traumaInsurance": "Specific exclusions may be placed on claims related to trauma induced by alcohol consumption."
        }
    };

    const DrugUseInsuranceImpact = {
        "Overall Frequency Impact": {
            "lifeInsurance": "Regular use of illicit drugs or abuse of prescription drugs can lead to significantly higher premiums or exclusions.",
            "tpdInsurance": "Increased risk of disability related to drug use can affect coverage options.",
            "incomeProtection": "Frequent drug use may lead to higher premiums due to the increased likelihood of claims related to incapacity.",
            "traumaInsurance": "Higher premiums or exclusions for trauma events linked to drug use, such as overdose or accidents."
        },
        "Assessment Process": {
            "lifeInsurance": "Underwriters assess drug use history, including frequency and types of drugs used, and may require medical records.",
            "tpdInsurance": "Assessment includes evaluating the likelihood of disability due to drug-related health issues.",
            "incomeProtection": "Underwriters analyze the risk of incapacitation from drug-related health problems.",
            "traumaInsurance": "Evaluation of risk for trauma events linked to drug use (e.g., accidents, health complications)."
        },
        "Impact on Premiums": {
            "lifeInsurance": "Higher premiums for individuals with a history of drug use due to associated health risks.",
            "tpdInsurance": "Increased premiums reflecting the higher risk of permanent disabilities related to drug use.",
            "incomeProtection": "Higher premiums due to the likelihood of claims related to incapacity from drug use.",
            "traumaInsurance": "Increased premiums due to the higher risk of trauma-related claims associated with drug use."
        },
        "Estimated Premium Increase": {
            "lifeInsurance": "20% - 50% higher than non-drug users, depending on the type and frequency of drug use.",
            "tpdInsurance": "25% - 60% higher than non-drug users, especially for those with a history of drug-related issues.",
            "incomeProtection": "15% - 35% higher than non-drug users, based on health evaluations.",
            "traumaInsurance": "20% - 40% higher than non-drug users, influenced by health history."
        },
        "Additional Notes": {
            "lifeInsurance": "Individuals with a history of substance abuse may face significantly higher premiums or exclusions.",
            "tpdInsurance": "Exclusions may apply for claims related to disabilities caused by drug use.",
            "incomeProtection": "Additional medical examinations may be required for applicants with drug-related health issues.",
            "traumaInsurance": "Specific exclusions may be placed on claims related to trauma induced by drug use."
        }
    };

    const FamilyHistoryInsuranceImpact = {
        "Breast Cancer": {
            "lifeInsurance": "Family history of breast cancer can lead to significantly higher premiums due to perceived increased risk.",
            "tpdInsurance": "Higher premiums reflecting the increased likelihood of permanent disabilities related to treatment effects.",
            "incomeProtection": "Increased risk of claims due to potential incapacitation from cancer-related illnesses.",
            "traumaInsurance": "Higher premiums for trauma claims related to breast cancer treatment or events."
        },
        "Colon Cancer": {
            "lifeInsurance": "Family history of colon cancer may result in increased premiums due to the association with genetic factors.",
            "tpdInsurance": "Increased premiums reflecting the risk of permanent disabilities due to treatment complications.",
            "incomeProtection": "Higher premiums due to potential claims related to incapacity from colon cancer.",
            "traumaInsurance": "Increased premiums for trauma claims associated with colon cancer events."
        },
        "Prostate Cancer": {
            "lifeInsurance": "Family history of prostate cancer can lead to higher premiums due to increased risk perception.",
            "tpdInsurance": "Increased premiums reflecting the likelihood of permanent disabilities from treatment effects.",
            "incomeProtection": "Higher premiums based on the risk of incapacity due to prostate cancer.",
            "traumaInsurance": "Increased premiums for trauma claims related to prostate cancer treatment."
        },
        "Lung Cancer": {
            "lifeInsurance": "Family history of lung cancer can lead to significantly higher premiums, especially for smokers.",
            "tpdInsurance": "Increased premiums reflecting the higher risk of permanent disabilities associated with treatment.",
            "incomeProtection": "Higher premiums due to increased likelihood of claims related to lung cancer.",
            "traumaInsurance": "Higher premiums for trauma claims associated with lung cancer events."
        },
        "Skin Cancer (Melanoma)": {
            "lifeInsurance": "Family history of skin cancer, particularly melanoma, can lead to increased premiums due to risk factors.",
            "tpdInsurance": "Higher premiums reflecting the risk of disabilities related to aggressive treatments or recurrences.",
            "incomeProtection": "Increased premiums due to potential claims related to incapacity from skin cancer.",
            "traumaInsurance": "Higher premiums for trauma claims linked to skin cancer treatment outcomes."
        },
        "Ovarian Cancer": {
            "lifeInsurance": "Family history of ovarian cancer may lead to higher premiums due to increased genetic risks.",
            "tpdInsurance": "Increased premiums reflecting the likelihood of disabilities from treatment complications.",
            "incomeProtection": "Higher premiums based on potential claims related to incapacity from ovarian cancer.",
            "traumaInsurance": "Increased premiums for trauma claims linked to ovarian cancer treatment."
        },
        "Pancreatic Cancer": {
            "lifeInsurance": "Family history of pancreatic cancer can result in significantly higher premiums due to aggressive nature.",
            "tpdInsurance": "Higher premiums reflecting increased risk of permanent disability from aggressive treatments.",
            "incomeProtection": "Increased premiums due to the likelihood of incapacity related to pancreatic cancer.",
            "traumaInsurance": "Higher premiums for trauma claims related to pancreatic cancer events."
        },
        "Other Cancers (e.g., bladder, kidney)": {
            "lifeInsurance": "Family history of other cancers may lead to increased premiums based on risk assessments.",
            "tpdInsurance": "Higher premiums reflecting the likelihood of permanent disabilities due to aggressive treatments.",
            "incomeProtection": "Higher premiums based on potential claims related to incapacity from cancer treatment.",
            "traumaInsurance": "Increased premiums for trauma claims linked to other cancer treatments."
        },
        "Diabetes": {
            "lifeInsurance": "Family history of diabetes can lead to higher premiums due to associated health risks.",
            "tpdInsurance": "Increased premiums reflecting the likelihood of permanent disabilities linked to diabetes complications.",
            "incomeProtection": "Higher premiums due to potential claims related to incapacity from diabetes-related health issues.",
            "traumaInsurance": "Increased premiums for trauma claims related to complications from diabetes."
        },
        "Mental Health Conditions": {
            "lifeInsurance": "Family history of mental health issues can result in higher premiums due to associated risks.",
            "tpdInsurance": "Higher premiums reflecting the likelihood of permanent disabilities related to mental health conditions.",
            "incomeProtection": "Increased risk of claims due to incapacitation from mental health issues may lead to higher premiums.",
            "traumaInsurance": "Increased premiums for trauma claims associated with mental health conditions."
        },
        "Hypertension (High Blood Pressure)": {
            "lifeInsurance": "Family history of hypertension can lead to increased premiums due to health risks.",
            "tpdInsurance": "Higher premiums reflecting the potential for disability from hypertension-related complications.",
            "incomeProtection": "Increased premiums based on the risk of incapacity due to hypertension-related issues.",
            "traumaInsurance": "Higher premiums for trauma claims related to hypertension-related conditions."
        },
        "Autoimmune Disorders (e.g., lupus, rheumatoid arthritis)": {
            "lifeInsurance": "Family history of autoimmune disorders can lead to increased premiums due to perceived health risks.",
            "tpdInsurance": "Higher premiums reflecting the likelihood of permanent disabilities related to these conditions.",
            "incomeProtection": "Increased premiums due to potential claims related to incapacity from autoimmune disorders.",
            "traumaInsurance": "Increased premiums for trauma claims associated with autoimmune conditions."
        },
        "Multiple Sclerosis": {
            "lifeInsurance": "Family history of multiple sclerosis can result in higher premiums due to the hereditary nature of the condition.",
            "tpdInsurance": "Increased premiums reflecting the likelihood of permanent disabilities from MS.",
            "incomeProtection": "Higher premiums based on the risk of incapacity due to multiple sclerosis.",
            "traumaInsurance": "Increased premiums for trauma claims related to MS-related complications."
        }
    };

    useEffect(() => {
        if (values["heartDiseaseConditions_diseaseAndConditions"] && values["heartDiseaseConditions_DynamicYesNo"] === "Yes") {

            const HeartDiseaseConditions = {
                "Coronary Artery Disease (CAD)": {
                    "lifeInsurance": "Loadings or exclusions based on severity. Recent CAD may lead to decline.",
                    "tpdInsurance": "Exclusions or higher premiums for CAD-related disabilities.",
                    "incomeProtection": "Exclusions for CAD-related claims. Higher premiums if well-managed.",
                    "traumaInsurance": "Exclusions for CAD-related trauma (e.g., heart attack)."
                },
                "Heart Attack (Myocardial Infarction)": {
                    "lifeInsurance": "Loadings depending on recovery. Recent heart attack may be declined.",
                    "tpdInsurance": "Exclusions or decline for heart-related disability.",
                    "incomeProtection": "Exclusions for heart attack-related claims. Declined if recent.",
                    "traumaInsurance": "Exclusions for heart attack recurrence."
                },
                "Arrhythmia (e.g., Atrial Fibrillation)": {
                    "lifeInsurance": "Loadings or exclusions depending on frequency and management.",
                    "tpdInsurance": "Exclusions for arrhythmia-related disabilities.",
                    "incomeProtection": "Exclusions for arrhythmia-related claims. Higher premiums if well-controlled.",
                    "traumaInsurance": "Exclusions for arrhythmia-related trauma."
                },
                "Heart Failure (Congestive Heart Failure)": {
                    "lifeInsurance": "Likely declined or exclusions due to high risk of death.",
                    "tpdInsurance": "Declined for TPD due to likelihood of permanent disability.",
                    "incomeProtection": "Declined due to inability to work.",
                    "traumaInsurance": "Declined for trauma cover."
                },
                "Angina": {
                    "lifeInsurance": "Loadings or exclusions based on severity.",
                    "tpdInsurance": "Exclusions for disability related to angina.",
                    "incomeProtection": "Exclusions for claims related to angina.",
                    "traumaInsurance": "Exclusions for angina-related trauma events."
                },
                "Hypertensive Heart Disease": {
                    "lifeInsurance": "Loadings or exclusions for untreated or poorly managed cases.",
                    "tpdInsurance": "Exclusions for heart-related disabilities.",
                    "incomeProtection": "Exclusions for claims related to hypertension.",
                    "traumaInsurance": "Exclusions for trauma events related to hypertensive heart disease."
                },
                "Heart Valve Disease": {
                    "lifeInsurance": "Loadings or exclusions depending on surgical history.",
                    "tpdInsurance": "Exclusions for disability related to valve disease.",
                    "incomeProtection": "Exclusions for heart valve-related claims.",
                    "traumaInsurance": "Exclusions for heart valve-related trauma."
                }
            };

            // Filter the HeartDiseaseConditions object based on conditions present in the values array

            try {
                let HeartDiseaseConditionsArray = values?.["heartDiseaseConditions_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (HeartDiseaseConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: HeartDiseaseConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries

                setSelectedConditions(HeartDiseaseConditionsArray)

            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        }
        else {
            setSelectedConditions([])
        }

        if (values["HighBloodPressureHighCholesterol_DynamicYesNo"]) {
            // Check if the user selected "Yes" for High Blood Pressure and High Cholesterol
            setrenderHighBloodPressureCholesterolTable(values?.["HighBloodPressureHighCholesterol_DynamicYesNo"] === "Yes");
        }

        if (values["RespiratoryConditions_diseaseAndConditions"] && values["RespiratoryConditions_DynamicYesNo"] === "Yes") {
            //Table block 3

            const PulmonaryConditions = {
                "Asthma": {
                    "lifeInsurance": "Mild cases accepted, severe cases with loadings or exclusions.",
                    "tpdInsurance": "Exclusions for disability related to severe asthma.",
                    "incomeProtection": "Exclusions for severe asthma-related claims.",
                    "traumaInsurance": "Exclusions for asthma-related trauma events."
                },
                "Chronic Obstructive Pulmonary Disease(COPD)": {
                    "lifeInsurance": "Likely exclusions or declined for severe cases.",
                    "tpdInsurance": "Declined due to high disability risk.",
                    "incomeProtection": "Exclusions for COPD-related claims.",
                    "traumaInsurance": "Exclusions for COPD-related trauma."
                },
                "Bronchitis": {
                    "lifeInsurance": "Mild cases accepted, chronic cases may face loadings.",
                    "tpdInsurance": "Exclusions for disability from chronic bronchitis.",
                    "incomeProtection": "Exclusions for bronchitis-related claims.",
                    "traumaInsurance": "Exclusions for bronchitis-related trauma."
                },
                "Emphysema": {
                    "lifeInsurance": "Declined or exclusions for advanced cases.",
                    "tpdInsurance": "Declined due to high risk of permanent disability.",
                    "incomeProtection": "Exclusions for emphysema-related claims.",
                    "traumaInsurance": "Exclusions for emphysema-related trauma events."
                },
                "Pulmonary Fibrosis": {
                    "lifeInsurance": "High risk of declined coverage.",
                    "tpdInsurance": "Declined due to severe disability risk.",
                    "incomeProtection": "Exclusions for work incapacity from pulmonary fibrosis.",
                    "traumaInsurance": "Exclusions for trauma related to pulmonary fibrosis."
                },
                "Sleep Apnea": {
                    "lifeInsurance": "Mild cases accepted with loadings, severe cases face exclusions.",
                    "tpdInsurance": "Exclusions for disability related to sleep apnea.",
                    "incomeProtection": "Exclusions for sleep apnea-related claims.",
                    "traumaInsurance": "Exclusions for sleep apnea-related trauma events."
                },
                "Tuberculosis": {
                    "lifeInsurance": "Mild cases accepted with loadings, severe cases face exclusions.",
                    "tpdInsurance": "Exclusions for disability related to sleep apnea.",
                    "incomeProtection": "Exclusions for sleep apnea-related claims.",
                    "traumaInsurance": "Exclusions for sleep apnea-related trauma events."
                }
            };


            try {
                let RespiratoryConditions_diseaseAndConditions = values?.["RespiratoryConditions_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (PulmonaryConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: PulmonaryConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries

                setSelectedPulmonaryConditions(RespiratoryConditions_diseaseAndConditions);

            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedPulmonaryConditions([])
        }


        if (values?.["CancerTumorsCysts_diseaseAndConditions"] && values["CancerTumorsCysts_DynamicYesNo"] === "Yes") {

            //table Block 4

            const CancerConditions = {
                "Breast Cancer": {
                    "lifeInsurance": "Loadings or exclusions for recent cases. Accepted in remission for over 5 years.",
                    "tpdInsurance": "Exclusions for cancer-related disabilities.",
                    "incomeProtection": "Exclusions for claims related to breast cancer.",
                    "traumaInsurance": "Exclusions for breast cancer recurrence."
                },
                "Lung Cancer": {
                    "lifeInsurance": "Likely declined for advanced or recent cases.",
                    "tpdInsurance": "Declined due to high disability risk.",
                    "incomeProtection": "Declined if recent or aggressive.",
                    "traumaInsurance": "Declined for trauma coverage."
                },
                "Prostate Cancer": {
                    "lifeInsurance": "Loadings or exclusions depending on severity and treatment.",
                    "tpdInsurance": "Exclusions for prostate cancer-related disabilities.",
                    "incomeProtection": "Exclusions for prostate cancer-related claims.",
                    "traumaInsurance": "Exclusions for recurrence of prostate cancer."
                },
                "Colorectal Cancer": {
                    "lifeInsurance": "Loadings or exclusions, particularly for advanced cases.",
                    "tpdInsurance": "Exclusions for colorectal cancer-related disability.",
                    "incomeProtection": "Exclusions for cancer-related claims.",
                    "traumaInsurance": "Exclusions for colorectal cancer recurrence."
                },
                "Skin Cancer (e.g., Melanoma)": {
                    "lifeInsurance": "Loadings or exclusions for melanoma. Non-invasive types are more favorable.",
                    "tpdInsurance": "Exclusions for melanoma-related disability.",
                    "incomeProtection": "Exclusions for melanoma-related claims.",
                    "traumaInsurance": "Exclusions for melanoma-related trauma."
                },
                "Benign Tumor": {
                    "lifeInsurance": "Loadings depending on severity and location.",
                    "tpdInsurance": "Exclusions for disabilities related to tumor.",
                    "incomeProtection": "Exclusions for tumor-related claims.",
                    "traumaInsurance": "Exclusions if the tumor poses a risk of trauma."
                },
                "Cyst (e.g., Ovarian Cyst, Kidney Cyst)": {
                    "lifeInsurance": "Mild cases are accepted, severe cases face loadings or exclusions.",
                    "tpdInsurance": "Exclusions for disability from complications.",
                    "incomeProtection": "Exclusions for cyst-related claims.",
                    "traumaInsurance": "Exclusions if complications from cyst arise."
                }
            };

            try {
                let CancerConditionsArray = values?.["CancerTumorsCysts_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (CancerConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: CancerConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries

                setSelectedCancerConditions(CancerConditionsArray);
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedCancerConditions([])
        }

        if (values["Diabetes_DynamicYesNo"] === "Yes") {

            //Table 5

            const DiabetesConditions = {
                "Type 1 Diabetes": {
                    "lifeInsurance": "Loadings or exclusions for complications like kidney disease.",
                    "tpdInsurance": "Exclusions for disabilities related to diabetes complications.",
                    "incomeProtection": "Exclusions for diabetes-related claims.",
                    "traumaInsurance": "Exclusions for trauma related to diabetic complications (e.g., kidney failure)."
                },
                "Type 2 Diabetes": {
                    "lifeInsurance": "Loadings or exclusions for poorly managed cases.",
                    "tpdInsurance": "Exclusions for disability if poorly controlled.",
                    "incomeProtection": "Exclusions for diabetes-related claims if unmanaged.",
                    "traumaInsurance": "Exclusions for trauma caused by diabetes complications."
                }
            };

            try {

                // let DiabetesConditionsArray = values?.["Diabetes_TypeDiabetes"].map(condition => {
                //     // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                //     if (DiabetesConditions.hasOwnProperty(condition)) {
                //         return {
                //             name: condition,
                //             details: DiabetesConditions[condition]
                //         };
                //     }
                //     return null; // Return null if the condition does not exist
                // }).filter(condition => condition !== null); // Remove null entries
                let DiabetesConditionsArray = []

                if (values?.["Diabetes_TypeDiabetes"] !== "") {

                    if (DiabetesConditions.hasOwnProperty(values?.["Diabetes_TypeDiabetes"])) {
                        DiabetesConditionsArray = [{
                            name: values?.["Diabetes_TypeDiabetes"],
                            details: DiabetesConditions[values?.["Diabetes_TypeDiabetes"]]
                        }];
                    }
                    // return null;
                }

                setSelectedDiabetesConditions(DiabetesConditionsArray)
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedDiabetesConditions([])
        }


        if (values["MentalHealthConditions_diseaseAndConditions"] && values["MentalHealthConditions_DynamicYesNo"] === "Yes") {

            //Table 6

            const MentalHealthConditions = {
                "Anxiety": {
                    "lifeInsurance": "Loadings or exclusions depending on severity and treatment history.",
                    "tpdInsurance": "Exclusions for anxiety-related disability.",
                    "incomeProtection": "Exclusions for anxiety-related claims.",
                    "traumaInsurance": "Not typically covered under trauma insurance."
                },
                "Depression": {
                    "lifeInsurance": "Loadings or exclusions depending on severity. Recent severe episodes may lead to decline.",
                    "tpdInsurance": "Exclusions for depression-related disability.",
                    "incomeProtection": "Exclusions for depression-related claims.",
                    "traumaInsurance": "Generally not covered under trauma insurance."
                },
                "Bipolar Disorder": {
                    "lifeInsurance": "Exclusions or loadings for severe cases.",
                    "tpdInsurance": "Exclusions for disability related to bipolar disorder.",
                    "incomeProtection": "Exclusions for bipolar-related claims.",
                    "traumaInsurance": "Not covered under trauma insurance."
                },
                "Schizophrenia": {
                    "lifeInsurance": "Likely declined or exclusions due to severity.",
                    "tpdInsurance": "Declined due to high risk of permanent disability.",
                    "incomeProtection": "Declined due to high risk of claim.",
                    "traumaInsurance": "Not covered under trauma insurance."
                }
            };


            try {
                let MentalHealthConditions_diseaseAndConditions = values?.["MentalHealthConditions_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (MentalHealthConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: MentalHealthConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries

                setSelectedMentalHealthConditions(MentalHealthConditions_diseaseAndConditions);
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedMentalHealthConditions([])
        }

        if (values["BackNeckPain_diseaseAndConditions"] && values["BackNeckPain_DynamicYesNo"] === "Yes") {


            //Table 7
            const SpineAndBackConditions = {
                "Lower Back Pain": {
                    "lifeInsurance": "Loadings for chronic pain or history of surgery. Mild cases often accepted.",
                    "tpdInsurance": "Exclusions for back-related disabilities, especially if surgery is required.",
                    "incomeProtection": "Exclusions for claims related to chronic back pain or surgeries.",
                    "traumaInsurance": "Not typically covered unless trauma directly affects the back."
                },
                "Upper Back Pain": {
                    "lifeInsurance": "Loadings or exclusions if severe or recurrent.",
                    "tpdInsurance": "Exclusions for disabilities due to chronic back issues.",
                    "incomeProtection": "Exclusions for upper back-related claims.",
                    "traumaInsurance": "Generally not covered under trauma insurance."
                },
                "Neck Pain": {
                    "lifeInsurance": "Mild cases accepted, severe cases may face loadings or exclusions.",
                    "tpdInsurance": "Exclusions for neck-related disability or spinal surgery.",
                    "incomeProtection": "Exclusions for neck pain-related claims.",
                    "traumaInsurance": "Neck-related trauma typically excluded."
                },
                "Sciatica": {
                    "lifeInsurance": "Loadings for severe cases. Mild sciatica may be accepted.",
                    "tpdInsurance": "Exclusions for disability if sciatica is chronic or severe.",
                    "incomeProtection": "Exclusions for sciatica-related claims.",
                    "traumaInsurance": "Sciatica-related trauma generally excluded."
                },
                "Herniated Disc": {
                    "lifeInsurance": "Loadings for surgically treated cases, otherwise exclusions.",
                    "tpdInsurance": "Exclusions for disabilities related to disc issues.",
                    "incomeProtection": "Exclusions for herniated disc-related claims.",
                    "traumaInsurance": "Herniated disc-related trauma events are typically excluded."
                },
                "Degenerative Disc Disease": {
                    "lifeInsurance": "Loadings or exclusions depending on the stage of the condition.",
                    "tpdInsurance": "Exclusions for disabilities from degenerative disc disease.",
                    "incomeProtection": "Exclusions for degenerative disc-related claims.",
                    "traumaInsurance": "Degenerative disc-related trauma not covered."
                },
                "Cervical Spine Injury": {
                    "lifeInsurance": "Loadings or exclusions based on severity. Likely declined if severe.",
                    "tpdInsurance": "Exclusions for disabilities due to cervical spine injury.",
                    "incomeProtection": "Exclusions for cervical spine-related claims.",
                    "traumaInsurance": "Cervical spine injury trauma is generally excluded."
                }
            };

            try {
                let BackNeckPain_diseaseAndConditions = values?.["BackNeckPain_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (SpineAndBackConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: SpineAndBackConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries
                setSelectedSpineAndBackConditions(BackNeckPain_diseaseAndConditions)
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedSpineAndBackConditions([])
        }

        if (values["StrokeNeurologicalConditions_diseaseAndConditions"] && values["StrokeNeurologicalConditions_DynamicYesNo"] === "Yes") {

            //Table 8

            const NeurologicalConditions = {
                "Stroke": {
                    "lifeInsurance": "Loadings for mild cases, severe strokes likely declined.",
                    "tpdInsurance": "Exclusions for stroke-related disabilities or declined if severe.",
                    "incomeProtection": "Exclusions for stroke-related claims.",
                    "traumaInsurance": "Exclusions for stroke-related trauma events."
                },
                "Epilepsy": {
                    "lifeInsurance": "Loadings or exclusions for frequent seizures. Mild cases may be accepted.",
                    "tpdInsurance": "Exclusions for epilepsy-related disability.",
                    "incomeProtection": "Exclusions for claims related to epilepsy.",
                    "traumaInsurance": "Epilepsy-related trauma generally excluded."
                },
                "Multiple Sclerosis": {
                    "lifeInsurance": "Likely declined for severe or progressive MS.",
                    "tpdInsurance": "Declined for TPD due to high disability risk.",
                    "incomeProtection": "Declined due to inability to work with MS progression.",
                    "traumaInsurance": "Declined for trauma coverage related to MS."
                }
            };

            try {
                let StrokeNeurologicalConditions_diseaseAndConditions = values?.["StrokeNeurologicalConditions_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (NeurologicalConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: NeurologicalConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries
                setSelectedNeurologicalConditions(StrokeNeurologicalConditions_diseaseAndConditions)
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }

        }
        else {
            setSelectedNeurologicalConditions([])
        }

        if (values["LiverKidneyGastrointestinalConditions_diseaseAndConditions"] && values["LiverKidneyGastrointestinalConditions_DynamicYesNo"] === "Yes") {

            //Table 9

            const OrganConditions = {
                "Liver Condition": {
                    "condition": "Liver Condition (e.g., Cirrhosis)",
                    "lifeInsurance": "Loadings or exclusions for liver-related conditions. Severe cases may be declined.",
                    "tpdInsurance": "Exclusions or decline for liver-related disabilities.",
                    "incomeProtection": "Exclusions for claims related to liver disease.",
                    "traumaInsurance": "Exclusions for liver-related trauma (e.g., liver failure)."
                },
                "Kidney Condition": {
                    "condition": "Kidney Condition (e.g., Kidney Failure)",
                    "lifeInsurance": "Loadings or exclusions based on severity. Severe cases are likely declined.",
                    "tpdInsurance": "Exclusions for disability related to kidney failure or decline if advanced.",
                    "incomeProtection": "Exclusions for kidney-related claims.",
                    "traumaInsurance": "Exclusions for kidney failure-related trauma events."
                },
                "Gastrointestinal Condition": {
                    "condition": "Gastrointestinal Condition (e.g., Crohn’s)",
                    "lifeInsurance": "Loadings or exclusions based on severity and surgical history.",
                    "tpdInsurance": "Exclusions for gastrointestinal-related disabilities.",
                    "incomeProtection": "Exclusions for gastrointestinal-related claims.",
                    "traumaInsurance": "Exclusions for gastrointestinal-related trauma (e.g., bowel surgery)."
                }
            };


            try {
                let LiverKidneyGastrointestinalConditions_diseaseAndConditions = values?.["LiverKidneyGastrointestinalConditions_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (OrganConditions.hasOwnProperty(condition)) {
                        return {
                            name: OrganConditions[condition].condition,
                            details: OrganConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries
                setSelectedOrganConditions(LiverKidneyGastrointestinalConditions_diseaseAndConditions)
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedOrganConditions([])
        }

        if (values["ArthritisJointDisorders_diseaseAndConditions"] && values["ArthritisJointDisorders_DynamicYesNo"] === "Yes") {
            //Table 10

            const ArthritisConditions = {
                "Rheumatoid Arthritis": {
                    "lifeInsurance": "Loadings or exclusions for severe or chronic cases.",
                    "tpdInsurance": "Exclusions for disability related to rheumatoid arthritis.",
                    "incomeProtection": "Exclusions for rheumatoid arthritis-related claims.",
                    "traumaInsurance": "Exclusions for trauma-related events linked to rheumatoid arthritis."
                },
                "Osteoarthritis": {
                    "lifeInsurance": "Mild cases accepted, severe cases may face loadings.",
                    "tpdInsurance": "Exclusions for osteoarthritis-related disabilities.",
                    "incomeProtection": "Exclusions for osteoarthritis-related claims.",
                    "traumaInsurance": "Generally excluded unless linked to trauma."
                },
                "Gout": {
                    "lifeInsurance": "Loadings for recurrent or severe gout.",
                    "tpdInsurance": "Exclusions for disabilities caused by gout.",
                    "incomeProtection": "Exclusions for gout-related claims.",
                    "traumaInsurance": "Gout-related trauma not typically covered."
                }
            };


            try {
                let ArthritisJointDisorders_diseaseAndConditions = values?.["ArthritisJointDisorders_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (ArthritisConditions.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: ArthritisConditions[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries
                setSelectedArthritisConditions(ArthritisJointDisorders_diseaseAndConditions);
            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedArthritisConditions([])
        }

        //Table 11
        if (values?.["HIVAIDSOtherImmuneSystemDisorders_diseaseAndConditions"] && values["HIVAIDSOtherImmuneSystemDisorders_DynamicYesNo"] === "Yes") {

            setrenderselectedHIVAIDSConditionCondition(values?.["HIVAIDSOtherImmuneSystemDisorders_diseaseAndConditions"].includes("HIV" || "AIDS"));
        }
        else {
            setrenderselectedHIVAIDSConditionCondition(false);
        }
        //Table 12



        if (values?.["LifestyleInformation_SmokerYesNo"] || values?.["LifestyleInformation_VapeYesNo"]) {
            setselectedSmokingInsuranceImpact(((values?.["LifestyleInformation_Smoker"] !== "No, I have never smoked") || (values?.["LifestyleInformation_Vape"] !== "No, I have never vaped")));

        }
        //Table 13

        if (values?.["LifestyleInformation_alcohol"]) {
            setselectedAlcoholConsumptionInsuranceImpact(values?.["LifestyleInformation_alcohol"] === "Yes");
        }

        //Table 14

        if (values["LifestyleInformation_RecreationalDrugs"]) {
            setselectedDrugUseInsuranceImpact(values?.["LifestyleInformation_RecreationalDrugs"] === "Yes");
        }
        //Table 15

        const HighRiskActivityInsuranceImpact = {
            "Skydiving": {
                "lifeInsurance": "Higher premiums due to increased risk of injury or death.",
                "tpdInsurance": "Increased premiums reflecting the higher risk of permanent disabilities.",
                "incomeProtection": "Higher likelihood of claims related to incapacitation.",
                "traumaInsurance": "Increased premiums for trauma events linked to skydiving accidents."
            },
            "Scuba Diving": {
                "lifeInsurance": "Higher premiums due to potential health risks and underwater hazards.",
                "tpdInsurance": "Increased risk of permanent disability due to diving accidents.",
                "incomeProtection": "Higher premiums due to risks associated with diving-related injuries.",
                "traumaInsurance": "Increased risk of claims related to trauma from diving incidents."
            },
            "Bungee Jumping": {
                "lifeInsurance": "Significantly higher premiums due to extreme risk factors involved.",
                "tpdInsurance": "Increased premiums reflecting the higher likelihood of serious injury.",
                "incomeProtection": "Higher premiums based on the risk of incapacitation from accidents.",
                "traumaInsurance": "Increased premiums for claims related to bungee jumping accidents."
            },
            "Motor Racing": {
                "lifeInsurance": "Substantially higher premiums due to the high-risk nature of the sport.",
                "tpdInsurance": "Increased premiums for higher risk of disability from racing incidents.",
                "incomeProtection": "Higher premiums due to increased risk of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims related to motor racing accidents."
            },
            "Rock Climbing": {
                "lifeInsurance": "Higher premiums due to risks associated with climbing injuries.",
                "tpdInsurance": "Increased risk of permanent disability can lead to higher premiums.",
                "incomeProtection": "Higher premiums reflecting the likelihood of incapacitation from falls or injuries.",
                "traumaInsurance": "Increased premiums for trauma events related to rock climbing accidents."
            },
            "AFL (Australian Rules Football)": {
                "lifeInsurance": "Higher premiums due to injury risks associated with contact sports.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent injuries.",
                "incomeProtection": "Higher premiums due to the likelihood of claims from football-related injuries.",
                "traumaInsurance": "Increased risk of claims related to trauma from playing AFL."
            },
            "Rugby League": {
                "lifeInsurance": "Significantly higher premiums due to the physical nature of the sport.",
                "tpdInsurance": "Increased premiums for risks associated with serious injuries.",
                "incomeProtection": "Higher premiums reflecting potential incapacity from injuries.",
                "traumaInsurance": "Increased premiums for trauma claims linked to rugby league injuries."
            },
            "Extreme Skiing or Snowboarding": {
                "lifeInsurance": "Higher premiums due to the risk of severe injuries and accidents.",
                "tpdInsurance": "Increased premiums reflecting the likelihood of permanent disability.",
                "incomeProtection": "Higher premiums due to risks associated with skiing accidents.",
                "traumaInsurance": "Increased premiums for trauma claims related to skiing or snowboarding incidents."
            },
            "Mountain Biking": {
                "lifeInsurance": "Higher premiums due to injury risks associated with biking accidents.",
                "tpdInsurance": "Increased premiums for higher likelihood of serious injuries.",
                "incomeProtection": "Higher premiums reflecting the risk of incapacitating accidents.",
                "traumaInsurance": "Increased premiums for trauma claims related to mountain biking accidents."
            },
            "Hang Gliding": {
                "lifeInsurance": "Substantially higher premiums due to the high-risk nature of the activity.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent disabilities.",
                "incomeProtection": "Higher premiums due to the likelihood of incapacitation from accidents.",
                "traumaInsurance": "Increased premiums for claims related to hang gliding incidents."
            },
            "Base Jumping": {
                "lifeInsurance": "Significantly higher premiums due to extreme risk factors involved.",
                "tpdInsurance": "Increased risk of permanent disability can lead to higher premiums.",
                "incomeProtection": "Higher premiums reflecting the likelihood of incapacity from jumps.",
                "traumaInsurance": "Increased premiums for claims related to base jumping accidents."
            },
            "Caving or Spelunking": {
                "lifeInsurance": "Higher premiums due to risks associated with cave exploration.",
                "tpdInsurance": "Increased premiums reflecting the risk of serious injury.",
                "incomeProtection": "Higher premiums based on the risk of incapacitating accidents.",
                "traumaInsurance": "Increased premiums for trauma claims related to caving incidents."
            },
            "White Water Rafting": {
                "lifeInsurance": "Higher premiums due to the risk of drowning and other injuries.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent disability from rafting accidents.",
                "incomeProtection": "Higher premiums due to the likelihood of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims linked to rafting incidents."
            },
            "Jet Skiing": {
                "lifeInsurance": "Higher premiums due to risks associated with watercraft injuries.",
                "tpdInsurance": "Increased risk of disability from accidents on the water.",
                "incomeProtection": "Higher premiums based on the likelihood of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims related to jet skiing incidents."
            },
            "Wingsuit Flying": {
                "lifeInsurance": "Significantly higher premiums due to extreme risk factors involved.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent disabilities.",
                "incomeProtection": "Higher premiums reflecting the likelihood of incapacity from jumps.",
                "traumaInsurance": "Increased premiums for claims related to wingsuit flying accidents."
            },
            "Surfing in Big Waves": {
                "lifeInsurance": "Higher premiums due to risks associated with big wave surfing.",
                "tpdInsurance": "Increased premiums reflecting the likelihood of serious injury.",
                "incomeProtection": "Higher premiums based on the risk of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims linked to surfing accidents."
            },
            "Bull Riding": {
                "lifeInsurance": "Substantially higher premiums due to the high-risk nature of the activity.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent disabilities.",
                "incomeProtection": "Higher premiums reflecting the likelihood of incapacity from injuries.",
                "traumaInsurance": "Increased premiums for claims related to bull riding accidents."
            },
            "Parkour": {
                "lifeInsurance": "Higher premiums due to risks associated with falls and injuries.",
                "tpdInsurance": "Increased premiums reflecting the likelihood of serious injury.",
                "incomeProtection": "Higher premiums based on the risk of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims linked to parkour incidents."
            },
            "Extreme Hiking or Mountaineering": {
                "lifeInsurance": "Higher premiums due to risks associated with severe injuries.",
                "tpdInsurance": "Increased premiums reflecting the risk of permanent disabilities.",
                "incomeProtection": "Higher premiums based on the likelihood of incapacitating injuries.",
                "traumaInsurance": "Increased premiums for trauma claims related to hiking accidents."
            },
            "Mixed Martial Arts (MMA)": {
                "lifeInsurance": "Higher premiums due to the risk of injuries associated with contact sports.",
                "tpdInsurance": "Increased premiums reflecting the likelihood of serious injuries.",
                "incomeProtection": "Higher premiums based on the risk of incapacitation from fighting-related injuries.",
                "traumaInsurance": "Increased premiums for claims related to injuries sustained in MMA."
            },
            "Other": {
                "lifeInsurance": "Risk assessment based on specific activities, may lead to higher premiums or exclusions.",
                "tpdInsurance": "Increased premiums reflecting the risk of injuries from the specified activity.",
                "incomeProtection": "Higher premiums based on the likelihood of incapacitation from the activity.",
                "traumaInsurance": "Increased premiums for trauma claims linked to the specified activity."
            }
        };


        if (values["hazardousActivitiesSports_diseaseAndConditions"] && values["hazardousActivitiesSports_DynamicYesNo"] === "Yes") {
            try {
                let hazardousActivitiesSports_diseaseAndConditions = values?.["hazardousActivitiesSports_diseaseAndConditions"].map(condition => {
                    // Check if the condition exists in HeartDiseaseConditions to avoid undefined values
                    if (HighRiskActivityInsuranceImpact.hasOwnProperty(condition)) {
                        return {
                            name: condition,
                            details: HighRiskActivityInsuranceImpact[condition]
                        };
                    }
                    return null; // Return null if the condition does not exist
                }).filter(condition => condition !== null); // Remove null entries
                setSelectedHighRiskActivityInsuranceImpact(hazardousActivitiesSports_diseaseAndConditions)

            } catch (error) {
                console.error("Error processing conditions:", error);
                // Optionally handle the error by logging or displaying a user-friendly message
            }
        } else {
            setSelectedHighRiskActivityInsuranceImpact([])
        }

        // alert(values?.["FamilyMedicalHistory_HeartDisease"] === "Yes")
        if (values?.["FamilyMedicalHistory_HeartDisease"] === "Yes"
            || values?.["FamilyMedicalHistory_Cancer"] === "Yes"
            || values?.["FamilyMedicalHistory_Diabetes"] === "Yes"
            || values?.["FamilyMedicalHistory_MentalHealthConditions"] === "Yes"
        ) {

            setFamilyMedicalHistory_HeartDisease(true);
        }


        if (values["BMI"]) {
            const BmiInsuranceImpact = {
                "Underweight (BMI < 18.5)": {
                    "lifeInsurance": "May include loadings or exclusions due to health risks associated with low BMI, such as nutritional deficiencies.",
                    "tpdInsurance": "Potential loadings or exclusions due to increased risk of disability and complications from low body weight.",
                    "incomeProtection": "Loadings likely due to heightened risk factors; exclusion for conditions related to low BMI may apply.",
                    "traumaInsurance": "Exclusions or loadings possible for trauma events exacerbated by low body weight (e.g., certain injuries)."
                },
                "Healthy Weight (BMI 18.5 - 24.9)": {
                    "lifeInsurance": "Standard cover with typical premiums; no loadings or exclusions are generally applied.",
                    "tpdInsurance": "Standard cover with usual terms; minimal impact on premium or policy conditions.",
                    "incomeProtection": "Generally standard cover, assuming no other health issues are present; no loadings or exclusions applied.",
                    "traumaInsurance": "Standard cover with typical terms; no loadings or exclusions related to BMI."
                },
                "Overweight (BMI 25 - 29.9)": {
                    "lifeInsurance": "Potential minor loadings depending on overall health and additional risk factors, such as hypertension.",
                    "tpdInsurance": "Possible minor loadings; standard cover likely if no other health complications exist.",
                    "incomeProtection": "Loadings may be applied, particularly if other health conditions (e.g., high blood pressure) are present.",
                    "traumaInsurance": "Standard cover may be possible; loadings or exclusions applied only if combined with other risk factors."
                },
                "Obese (BMI 30 - 34.9)": {
                    "lifeInsurance": "Loadings are common due to increased risk for conditions like heart disease and diabetes.",
                    "tpdInsurance": "Higher loadings or exclusions depending on associated health issues and medical history.",
                    "incomeProtection": "Likely to include higher premiums or exclusions for obesity-related claims (e.g., cardiovascular issues).",
                    "traumaInsurance": "Exclusions or loadings related to trauma events from obesity-related health conditions, like stroke."
                },
                "Severely Obese (BMI 35 - 39.9)": {
                    "lifeInsurance": "Significant loadings or exclusions may apply, or possible decline due to heightened health risks.",
                    "tpdInsurance": "Higher chance of exclusions or decline; any coverage will likely include significant loadings.",
                    "incomeProtection": "Premiums are likely higher, with exclusions for obesity-related claims; may result in a decline in coverage.",
                    "traumaInsurance": "Exclusions for conditions related to obesity, such as heart attack, are likely, with higher premiums if offered."
                },
                "Morbidly Obese (BMI 40+)": {
                    "lifeInsurance": "High likelihood of decline or extensive exclusions due to substantial health risks, including heart disease and diabetes.",
                    "tpdInsurance": "Typically declined, or exclusions for obesity-related disabilities if coverage is offered.",
                    "incomeProtection": "Very high premiums, substantial exclusions, or likely decline due to severe risk factors associated with high BMI.",
                    "traumaInsurance": "High probability of decline or major exclusions; cover unlikely for trauma associated with obesity complications."
                }
            };

            const bmiValue = values["BMI"];
            let bmiCategory;


            // Determine BMI category based on the value of bmiValue
            if (bmiValue < 18.5) {
                bmiCategory = "Underweight (BMI < 18.5)";
            } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
                bmiCategory = "Healthy Weight (BMI 18.5 - 24.9)";
            } else if (bmiValue >= 25 && bmiValue <= 29.9) {
                bmiCategory = "Overweight (BMI 25 - 29.9)";
            } else if (bmiValue >= 30 && bmiValue <= 34.9) {
                bmiCategory = "Obese (BMI 30 - 34.9)";
            } else if (bmiValue >= 35 && bmiValue <= 39.9) {
                bmiCategory = "Severely Obese (BMI 35 - 39.9)";
            } else if (bmiValue >= 40) {
                bmiCategory = "Morbidly Obese (BMI 40+)";
            }

            // Retrieve the insurance impact details for the determined category
            const insuranceImpact = BmiInsuranceImpact[bmiCategory];

            // console.log(insuranceImpact, bmiCategory)
            // Use the insuranceImpact data as needed
            setSelectedBmiInsuranceImpact([{
                name: bmiCategory,
                details: insuranceImpact
            }]);
        } else {
            console.error("BMI value is not available.");
        }

    }, [values]); // Runs when `values` change

    let ConvertDate = (date) => {
        let d = new Date(date);
        let day = d.getDate().toString().padStart(2, '0');
        let month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <div className='container'>
            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable1">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedConditions.length > 0 ? (
                            selectedConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>


            {/* Render Table 2 */}

            <div
                className='d-none'
            >
                {/* Render Table for High Blood Pressure and High Cholesterol if "Yes" */}
                {renderHighBloodPressureCholesterolTable && (
                    <Table striped bordered responsive hover id="resultTable2">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(HighBloodPressureCholesterolConditions).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{HighBloodPressureCholesterolConditions[condition].lifeInsurance}</td>
                                    <td>{HighBloodPressureCholesterolConditions[condition].tpdInsurance}</td>
                                    <td>{HighBloodPressureCholesterolConditions[condition].incomeProtection}</td>
                                    <td>{HighBloodPressureCholesterolConditions[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Render Table 3 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable3">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedPulmonaryConditions.length > 0 ? (
                            selectedPulmonaryConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 4 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable4">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedCancerConditions.length > 0 ? (
                            selectedCancerConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 5 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable5">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedDiabetesConditions.length > 0 ? (
                            selectedDiabetesConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 6 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable6">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedMentalHealthConditions.length > 0 ? (
                            selectedMentalHealthConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>


            {/* Render Table 7 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable7">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedSpineAndBackConditions.length > 0 ? (
                            selectedSpineAndBackConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 8 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable8">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedNeurologicalConditions.length > 0 ? (
                            selectedNeurologicalConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 9 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable9">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOrganConditions.length > 0 ? (
                            selectedOrganConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>


            {/* Render Table 10 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable10">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedArthritisConditions.length > 0 ? (
                            selectedArthritisConditions.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 11 */}

            <div
                className='d-none'
            >
                {selectedHIVAIDSConditionCondition && (
                    <Table striped bordered responsive hover id="resultTable11">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(HIVAIDSCondition).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{HIVAIDSCondition[condition].lifeInsurance}</td>
                                    <td>{HIVAIDSCondition[condition].tpdInsurance}</td>
                                    <td>{HIVAIDSCondition[condition].incomeProtection}</td>
                                    <td>{HIVAIDSCondition[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>


            {/* Render Table 12 */}

            <div
                className='d-none'
            >
                {selectedSmokingInsuranceImpact && (
                    <Table striped bordered responsive hover id="resultTable12">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(SmokingInsuranceImpact).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{SmokingInsuranceImpact[condition].lifeInsurance}</td>
                                    <td>{SmokingInsuranceImpact[condition].tpdInsurance}</td>
                                    <td>{SmokingInsuranceImpact[condition].incomeProtection}</td>
                                    <td>{SmokingInsuranceImpact[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Render Table 13 */}

            <div
                className='d-none'
            >
                {selectedAlcoholConsumptionInsuranceImpact && (
                    <Table striped bordered responsive hover id="resultTable13">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(AlcoholConsumptionInsuranceImpact).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{AlcoholConsumptionInsuranceImpact[condition].lifeInsurance}</td>
                                    <td>{AlcoholConsumptionInsuranceImpact[condition].tpdInsurance}</td>
                                    <td>{AlcoholConsumptionInsuranceImpact[condition].incomeProtection}</td>
                                    <td>{AlcoholConsumptionInsuranceImpact[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Render Table 14 */}

            <div
                className='d-none'
            >
                {selectedDrugUseInsuranceImpact && (
                    <Table striped bordered responsive hover id="resultTable14">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(DrugUseInsuranceImpact).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{DrugUseInsuranceImpact[condition].lifeInsurance}</td>
                                    <td>{DrugUseInsuranceImpact[condition].tpdInsurance}</td>
                                    <td>{DrugUseInsuranceImpact[condition].incomeProtection}</td>
                                    <td>{DrugUseInsuranceImpact[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>


            {/* Render Table 15 */}

            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable15">
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedHighRiskActivityInsuranceImpact.length > 0 ? (
                            selectedHighRiskActivityInsuranceImpact.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 16 */}
            <div
                className='d-none'
            >
                {FamilyMedicalHistory_HeartDisease && (
                    <Table striped bordered responsive hover id="resultTable16">
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>Life Insurance</th>
                                <th>TPD Insurance</th>
                                <th>Income Protection</th>
                                <th>Trauma Insurance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(FamilyHistoryInsuranceImpact).map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition}</td>
                                    <td>{FamilyHistoryInsuranceImpact[condition].lifeInsurance}</td>
                                    <td>{FamilyHistoryInsuranceImpact[condition].tpdInsurance}</td>
                                    <td>{FamilyHistoryInsuranceImpact[condition].incomeProtection}</td>
                                    <td>{FamilyHistoryInsuranceImpact[condition].traumaInsurance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>

            {/* Render Table 17 */}


            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable17">
                    <thead>
                        <tr>
                            <th>Condition</th>
                            <th>Life Insurance</th>
                            <th>TPD Insurance</th>
                            <th>Income Protection</th>
                            <th>Trauma Insurance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedBmiInsuranceImpact.length > 0 ? (
                            selectedBmiInsuranceImpact.map((condition, index) => (
                                <tr key={index}>
                                    <td>{condition.name}</td>
                                    <td>{condition.details.lifeInsurance}</td>
                                    <td>{condition.details.tpdInsurance}</td>
                                    <td>{condition.details.incomeProtection}</td>
                                    <td>{condition.details.traumaInsurance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No conditions match the selected options.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Render Table 18 */}
            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable18">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Client Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{values.Full_Name || ""}</td>
                        </tr>
                        <tr>
                            <th>Date of Birth </th>
                            <td>{ConvertDate(values.DateBirth) || ""}</td>
                        </tr>
                        <tr>
                            <th>Gender </th>
                            <td>{values.Gender || ""}</td>
                        </tr>
                        <tr>
                            <th>Height in cm </th>
                            <td>{values.Height || ""}</td>
                        </tr>
                        <tr>
                            <th>Weight in Kg</th>
                            <td>{values.Weight || ""}</td>
                        </tr>
                        <tr>
                            <th>BMI</th>
                            <td>{values.BMI || ""}</td>
                        </tr>
                        <tr>
                            <th colSpan={2} className='text-center'>Contact Details</th>
                        </tr>
                        <tr>
                            <th>Phone Number </th>
                            <td>{values.PhoneNumber || ""}</td>
                        </tr>
                        <tr>
                            <th>Email Address </th>
                            <td>{values.EmailAddress ? values.EmailAddress.toLowerCase() : ""}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>{values.Address || ""}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* Render Table 19 / Financial Information */}
            <div
                className='d-none'
            >
                <Table striped bordered responsive hover id="resultTable19">
                    <thead>
                        <tr>
                            <th></th>
                            <th className='text-center'>Financial Information</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <th>Currently Working</th>
                            <td>{values.EmploymentStatus_DynamicYesNo || ""}</td>
                        </tr>

                        {/* Currently Working dynamic inputs*/}

                        {values.EmploymentStatus_DynamicYesNo === "Yes" ?
                            <React.Fragment>

                                <tr>
                                    <th>Title</th>
                                    <td>{values.EmploymentStatus_OccupationJobTitle || ""}</td>
                                </tr>

                                <tr>
                                    <th>Employment Type</th>
                                    <td>{values.EmploymentStatus_EmploymentType || ""}</td>
                                </tr>
                                {
                                    values.EmploymentStatus_EmploymentType === "Self-employed" &&
                                    <React.Fragment>

                                        <tr>
                                            <th>Business Name</th>
                                            <td>{values.EmploymentStatus_BusinessName || ""}</td>
                                        </tr>
                                        <tr>
                                            <th>Nature of Business</th>
                                            <td>{values.EmploymentStatus_NatureOfBusiness || ""}</td>
                                        </tr>
                                        <tr>
                                            <th>Start Date of Business</th>
                                            <td>{ConvertDate(values.EmploymentStatus_StartDateOfBusiness) || ""}</td>
                                        </tr>
                                        <tr>
                                            <th>Net Profit</th>
                                            <td>{values.EmploymentStatus_NetProfit || ""}</td>
                                        </tr>
                                    </React.Fragment>

                                }
                            </React.Fragment> :
                            <React.Fragment>
                                <tr>
                                    <th>Current Situation</th>
                                    <td>{values.EmploymentStatus_Situation || ""}</td>
                                </tr>

                            </React.Fragment>
                        }
                        <tr>
                            <th>Annual Pre-tax Income Primary </th>
                            <td>{values.EmploymentStatus_primaryOccupation || ""}</td>
                        </tr>
                        <tr>
                            <th>Income Structure </th>
                            <td>{values.EmploymentStatus_incomeStructured || ""}</td>
                        </tr>

                        <tr>
                            <th>Hazardous Duties</th>
                            <td>{values.EmploymentStatus_hazardousDuties || ""}</td>
                        </tr>

                        {/* Currently Working dynamic inputs*/}

                        {values.EmploymentStatus_hazardousDuties === "Yes" &&
                            <React.Fragment>

                                <tr>
                                    <th>Specify Hazardous Duty</th>
                                    <td>{values.EmploymentStatus_Specify || ""}</td>
                                </tr>
                                {values.EmploymentStatus_Specify === "Other" &&
                                    <React.Fragment>

                                        <tr>
                                            <th>Specify Other Hazard Duty</th>
                                            <td>{values.EmploymentStatus_otherPleaseSpecify || ""}</td>
                                        </tr>
                                    </React.Fragment>
                                }
                            </React.Fragment>

                        }

                        <tr>
                            <th>Weekly Work Hours Primary</th>
                            <td>{values.EmploymentStatus_primaryWorkHours || ""}</td>
                        </tr>
                        <tr>
                            <th>Work Weeks Per Year Primary</th>
                            <td>{values.EmploymentStatus_workPerYear || ""}</td>
                        </tr>
                        <tr>
                            <th>FIFO (Fly-In Fly-Out)</th>
                            <td>{values.EmploymentStatus_FIFO || ""}</td>
                        </tr>

                        <tr>
                            <th>Second Occupation</th>
                            <td>{values.SecondOccupation_DynamicYesNo || ""}</td>
                        </tr>
                        {
                            values.SecondOccupation_DynamicYesNo === "Yes" &&

                            <React.Fragment>
                                <tr>
                                    <th>Occupation Job/Title Secondary</th>
                                    <td>{values.SecondOccupation_OccupationJobTitle || ""}</td>
                                </tr>
                                <tr>
                                    <th>Secondary Employment Type</th>
                                    <td>{values.SecondOccupation_EmploymentType || ""}</td>
                                </tr>

                                {values.SecondOccupation_EmploymentType === "Other" &&
                                    <React.Fragment>

                                        <tr>
                                            <th>Employment Type Detail</th>
                                            <td>{values.SecondOccupation_Other || ""}</td>
                                        </tr>
                                    </React.Fragment>
                                }

                                <tr>
                                    <th>Annual Pre-tax Income Secondary </th>
                                    <td>{values.EmploymentStatus_SecondaryOccupation || ""}</td>
                                </tr>
                                <tr>
                                    <th>Hours/Week Secondary </th>
                                    <td>{values.EmploymentStatus_SecondWorkHours || ""}</td>
                                </tr>

                            </React.Fragment>
                        }
                    </tbody>
                </Table>
            </div>


        </div>
    )
}

export default ResultsTables
