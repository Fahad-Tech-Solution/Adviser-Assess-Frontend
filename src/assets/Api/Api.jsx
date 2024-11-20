import { notification } from "antd";
import axios from "axios";
import { BiInfoCircle } from "react-icons/bi";

let GetAxios = async (Api) => {
    console.log("Get api Chali")
    try {
        const response = await axios.get(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:",
            error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

const PostAxios = async (Api, data) => {
    console.log("Post Chala ");
    try {
        const response = await axios.post(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
};

let PutAxios = async (Api, data) => {
    console.log("Put api Chali")
    try {
        const response = await axios.put(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let PatchAxios = async (Api, data) => {
    console.log("Patch api Chali")
    try {
        const response = await axios.patch(Api, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let DeleteAxios = async (Api) => {
    console.log("Delete api Chali")
    try {
        const response = await axios.delete(Api);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error.message); // Log error message
        console.error("Response:", error.response); // Log response error details if available
        throw error; // Rethrow the error to be caught in the calling function
    }
}

let DateHandler = async (value) => {
    // console.log("DateHandler Chal gaya", value);
    let a = await new Date(value);
    return a
}

const openNotification = (type, placement, message, description) => {
    notification[type]({
        message: <span style={{ fontWeight: '600' }}>{message}</span>,
        description: description,
        placement,
        duration: 3,
        // duration: 0,
        showProgress: true,
        style: {
            padding: '10px',
            lineHeight: '1.5',
            alignItems: 'center'
        },
    });
};

const toCommaAndDollar = (x) =>
    "$" +
    Math.ceil(x)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const toNumericValue = (formattedValue) => {
    if (formattedValue && typeof formattedValue === "string") {
        return formattedValue.replace(/[$,]/g, "");
    }
    return "0";
};

let toPercentage = (x) => {
    if (typeof x !== 'number' || isNaN(x)) {
        throw new Error("Input must be a valid number");
    }
    return x.toFixed(2) + "%";
};

let RenderName = (Input) => {
    if (Input === "client") {
        return (localStorage.getItem("UserName"))
    }
    else if (Input === "partner") {
        return (localStorage.getItem("PartnerName"))
    }
    else if (Input === "joint") {
        let userStatus = localStorage.getItem('UserStatus');
        if (userStatus === "Married") {
            return (localStorage.getItem("UserName") + " + " + localStorage.getItem("PartnerName"))
        } else {
            return (localStorage.getItem("UserName"))
        }
    }
}

const handleInputChange = (e, setFieldValue, FormulaSetting, values, stakeHolder) => {
    let value = parseFloat(e.target.value.replace(/[^0-9.]+/g, "")); // Remove all non-numeric characters except '.'

    if (value > 100) {
        setFieldValue(e.target.name, "100%");

        // Call your custom formula logic
        FormulaSetting(values, setFieldValue, e.target, stakeHolder);
    } else {
        setFieldValue(e.target.name, e.target.value); // Update value without '%'
    }
};

const handleInputFocus = (e, setFieldValue) => {
    // Remove the percentage sign
    let value = e.target.value.replace(/[^0-9.]+/g, ""); // Remove all non-numeric characters except '.'
    setFieldValue(e.target.name, value); // Update value without '%'
};

const handleInputKeyDown = (e) => {
    const allowedKeys = [
        "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab",
        "Home", "End", "Escape", "."
    ];

    // Allow default behavior for allowed keys
    if (allowedKeys.includes(e.key)) {
        return; // Let default behavior happen
    }

    // Trigger onBlur on pressing Enter (for example)
    if (e.key === "Enter") {
        e.target.blur(); // This will trigger the onBlur event
    }

    // Prevent non-numeric input
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
};

const handleInputBlur = (e, setFieldValue, toPercentage, FormulaSetting, values, stakeHolder) => {
    let value = e.target.value.replace(/[^0-9.]+/g, "");
    let numericValue = parseFloat(value);

    // Validate and convert to percentage if necessary
    if (!isNaN(numericValue)) {
        if (numericValue > 100) {
            numericValue = 100;
        }
        setFieldValue(e.target.name, toPercentage(numericValue));
    } else {
        setFieldValue(e.target.name, ""); // Clear if not valid
    }

    // Call your custom formula logic
    FormulaSetting(values, setFieldValue, e.target, stakeHolder);
};

const validateName = (value) => {
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    return filteredValue
};


// const touchFields = async (setFieldTouched, fieldNames, values, validateForm) => {

//     let isValid = true;

//     for (const fieldName of fieldNames) {
//         setFieldTouched(fieldName, true, false); // Mark field as touched
//     }

//     // Wait for validateForm to resolve
//     const fieldErrors = await validateForm(values);

//     console.log(fieldErrors); // Log the resolved validation errors

//     // Check if any of the touched fields have errors
//     fieldNames.forEach((fieldName) => {
//         if (fieldErrors[fieldName]) {
//             isValid = false; // If validation fails for any field, set isValid to false
//         }
//     });

//     // console.log(isValid); // Log the validation result

//     return isValid; // Return true if all fields are valid, false otherwise
// };


const touchFields = async (setFieldTouched, fieldNames, values, validateForm) => {
    let isValid = true;
    let firstInvalidField = null;

    for (const fieldName of fieldNames) {
        setFieldTouched(fieldName, true, false); // Mark field as touched
    }

    // Wait for validateForm to resolve
    const fieldErrors = await validateForm(values);

    console.log(fieldErrors); // Log the resolved validation errors

    // Check if any of the touched fields have errors
    for (const fieldName of fieldNames) {
        if (fieldErrors[fieldName]) {
            isValid = false; // If validation fails for any field, set isValid to false
            if (!firstInvalidField) {
                firstInvalidField = fieldErrors[fieldName]; // Store the first invalid field
            }
        }
    }

    if (!isValid && firstInvalidField) {
        // Show notification for the first invalid field
        openNotification(
            'error',
            'topRight',
            'Validation Error',
            // `The field "${firstInvalidField}" is required or invalid.`
            firstInvalidField
        );
    }

    return isValid; // Return true if all fields are valid, false otherwise
};

async function handleTouchFields(location, setFieldTouched, values, validateForm) {

    // Extract currentPath and cLocation from the provided location
    const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);

    // Define the fields to be touched based on the location
    const fieldsByLocation = {
        "/OccupationalFinancialInformation/": [
            "EmploymentStatus_Situation",
            "EmploymentStatus_OccupationJobTitle",
            "EmploymentStatus_EmploymentType",
            "EmploymentStatus_Other",
            "EmploymentStatus_BusinessName",
            "EmploymentStatus_NatureOfBusiness",
            "EmploymentStatus_StartDateOfBusiness",
            "EmploymentStatus_NetProfit",
            "SecondOccupation_OccupationJobTitle",
            "SecondOccupation_EmploymentType",
            "SecondOccupation_Other",
            "EmploymentStatus_SecondaryOccupation",
            "EmploymentStatus_SecondWorkHours",
            "EmploymentStatus_primaryOccupation",
            "EmploymentStatus_incomeStructured",
            "EmploymentStatus_otherIncomeStructured",
            "EmploymentStatus_otherPleaseSpecify",
            "EmploymentStatus_Specify",
            "EmploymentStatus_primaryWorkHours",
            "EmploymentStatus_workPerYear",
            "EmploymentStatus_FIFO",
        ],
        "/Health_MedicalHistory/Q1": [
            //set 0
            "heartDiseaseConditions_DateOfDiagnosis0",
            "heartDiseaseConditions_ongoingResolved0",
            "heartDiseaseConditions_treatmentsMedications0",
            //set 1
            "heartDiseaseConditions_DateOfDiagnosis1",
            "heartDiseaseConditions_ongoingResolved1",
            "heartDiseaseConditions_treatmentsMedications1",
            //set 2
            "heartDiseaseConditions_DateOfDiagnosis2",
            "heartDiseaseConditions_ongoingResolved2",
            "heartDiseaseConditions_treatmentsMedications2",
            //set 3
            "heartDiseaseConditions_DateOfDiagnosis3",
            "heartDiseaseConditions_ongoingResolved3",
            "heartDiseaseConditions_treatmentsMedications3",
            //set 4
            "heartDiseaseConditions_DateOfDiagnosis4",
            "heartDiseaseConditions_ongoingResolved4",
            "heartDiseaseConditions_treatmentsMedications4",
            //set 5
            "heartDiseaseConditions_DateOfDiagnosis5",
            "heartDiseaseConditions_ongoingResolved5",
            "heartDiseaseConditions_treatmentsMedications5",
            //set 6
            "heartDiseaseConditions_DateOfDiagnosis6",
            "heartDiseaseConditions_ongoingResolved6",
            "heartDiseaseConditions_treatmentsMedications6",
        ],
        "/Health_MedicalHistory/Q2": [
            "HighBloodPressureHighCholesterol_DateOfDiagnosis",
            "HighBloodPressureHighCholesterol_LatestBloodPressure",
            "HighBloodPressureHighCholesterol_LatestCholesterol",
            "HighBloodPressureHighCholesterol_MedicationsTreatment",
        ],
        "/Health_MedicalHistory/Q3": [
            //set 0
            "RespiratoryConditions_DateOfDiagnosis0",
            "RespiratoryConditions_MedicationsTreatment0",
            //set 1
            "RespiratoryConditions_DateOfDiagnosis1",
            "RespiratoryConditions_MedicationsTreatment1",
            //set 2
            "RespiratoryConditions_DateOfDiagnosis2",
            "RespiratoryConditions_MedicationsTreatment2",
            //set 3
            "RespiratoryConditions_DateOfDiagnosis3",
            "RespiratoryConditions_MedicationsTreatment3",
            //set 4
            "RespiratoryConditions_DateOfDiagnosis4",
            "RespiratoryConditions_MedicationsTreatment4",
            //set 5
            "RespiratoryConditions_DateOfDiagnosis5",
            "RespiratoryConditions_MedicationsTreatment5",
            //set 6
            "RespiratoryConditions_DateOfDiagnosis6",
            "RespiratoryConditions_MedicationsTreatment6",
            //set 7
            "RespiratoryConditions_DateOfDiagnosis7",
            "RespiratoryConditions_MedicationsTreatment7",
            //set 8
            "RespiratoryConditions_DateOfDiagnosis8",
            "RespiratoryConditions_MedicationsTreatment8",
        ],
        "/Health_MedicalHistory/Q4": [
            //set 0
            "CancerTumorsCysts_DateOfDiagnosis0",
            "CancerTumorsCysts_Treatment0",
            "CancerTumorsCysts_CurrentCondition0",

            //set 2
            "CancerTumorsCysts_DateOfDiagnosis2",
            "CancerTumorsCysts_Treatment2",
            "CancerTumorsCysts_CurrentCondition2",

            //set 3
            "CancerTumorsCysts_DateOfDiagnosis3",
            "CancerTumorsCysts_Treatment3",
            "CancerTumorsCysts_CurrentCondition3",

            //set 4
            "CancerTumorsCysts_DateOfDiagnosis4",
            "CancerTumorsCysts_Treatment4",
            "CancerTumorsCysts_CurrentCondition4",

            //set 5
            "CancerTumorsCysts_DateOfDiagnosis5",
            "CancerTumorsCysts_Treatment5",
            "CancerTumorsCysts_CurrentCondition5",

            //set 6
            "CancerTumorsCysts_DateOfDiagnosis6",
            "CancerTumorsCysts_Treatment6",
            "CancerTumorsCysts_CurrentCondition6",

            //set 7
            "CancerTumorsCysts_DateOfDiagnosis7",
            "CancerTumorsCysts_Treatment7",
            "CancerTumorsCysts_CurrentCondition7",

            //set 8
            "CancerTumorsCysts_DateOfDiagnosis8",
            "CancerTumorsCysts_Treatment8",
            "CancerTumorsCysts_CurrentCondition8",

            //set 9
            "CancerTumorsCysts_DateOfDiagnosis9",
            "CancerTumorsCysts_Treatment9",
            "CancerTumorsCysts_CurrentCondition9",

            //Other
            "CancerTumorsCysts_Other",
        ],
        "/Health_MedicalHistory/Q5": [
            //set 0
            "Diabetes_TypeDiabetes",
            "Diabetes_DateOfDiagnosis",
            "Diabetes_Treatment",
            "Diabetes_TreatmentOther",
            "Diabetes_HbA1cReading",
            "Diabetes_GlucoseReading",
        ],
        "/Health_MedicalHistory/Q6": [
            //set 0
            "MentalHealthConditions_DateOfDiagnosis0",
            "MentalHealthConditions_MedicationsTreatment0",
            "MentalHealthConditions_MedicationsTreatmentOther0",

            //set 1
            "MentalHealthConditions_DateOfDiagnosis1",
            "MentalHealthConditions_MedicationsTreatment1",
            "MentalHealthConditions_MedicationsTreatmentOther1",

            //set 2
            "MentalHealthConditions_DateOfDiagnosis2",
            "MentalHealthConditions_MedicationsTreatment2",
            "MentalHealthConditions_MedicationsTreatmentOther2",

            //set 3
            "MentalHealthConditions_DateOfDiagnosis3",
            "MentalHealthConditions_MedicationsTreatment3",
            "MentalHealthConditions_MedicationsTreatmentOther3",

            //set 4
            "MentalHealthConditions_DateOfDiagnosis4",
            "MentalHealthConditions_MedicationsTreatment4",
            "MentalHealthConditions_MedicationsTreatmentOther4",

            //set 5
            "MentalHealthConditions_DateOfDiagnosis5",
            "MentalHealthConditions_MedicationsTreatment5",
            "MentalHealthConditions_MedicationsTreatmentOther5",

            "MentalHealthConditions_PsychologistCare",
            "MentalHealthConditions_PsychologistSessions",
            "MentalHealthConditions_PsychologistTimePeriod",

            //Other
            "MentalHealthConditions_Other",
        ],
        "/Health_MedicalHistory/Q7": [
            //set 0
            "BackNeckPain_DateOfDiagnosis0",
            "BackNeckPain_CurrentTreatment0",
            "BackNeckPain_CurrentTreatmentOther0",
            "BackNeckPain_CurrentStatus0",
            "BackNeckPain_CurrentStatusOther0",

            //set 1
            "BackNeckPain_DateOfDiagnosis1",
            "BackNeckPain_CurrentTreatment1",
            "BackNeckPain_CurrentTreatmentOther1",
            "BackNeckPain_CurrentStatus1",
            "BackNeckPain_CurrentStatusOther1",

            //set 2
            "BackNeckPain_DateOfDiagnosis2",
            "BackNeckPain_CurrentTreatment2",
            "BackNeckPain_CurrentTreatmentOther2",
            "BackNeckPain_CurrentStatus2",
            "BackNeckPain_CurrentStatusOther2",

            //set 3
            "BackNeckPain_DateOfDiagnosis3",
            "BackNeckPain_CurrentTreatment3",
            "BackNeckPain_CurrentTreatmentOther3",
            "BackNeckPain_CurrentStatus3",
            "BackNeckPain_CurrentStatusOther3",

            //set 4
            "BackNeckPain_DateOfDiagnosis4",
            "BackNeckPain_CurrentTreatment4",
            "BackNeckPain_CurrentTreatmentOther4",
            "BackNeckPain_CurrentStatus4",
            "BackNeckPain_CurrentStatusOther4",

            //set 5
            "BackNeckPain_DateOfDiagnosis5",
            "BackNeckPain_CurrentTreatment5",
            "BackNeckPain_CurrentTreatmentOther5",
            "BackNeckPain_CurrentStatus5",
            "BackNeckPain_CurrentStatusOther5",

            //set 6
            "BackNeckPain_DateOfDiagnosis6",
            "BackNeckPain_CurrentTreatment6",
            "BackNeckPain_CurrentTreatmentOther6",
            "BackNeckPain_CurrentStatus6",
            "BackNeckPain_CurrentStatusOther6",

            //Other
            "BackNeckPain_Other",
        ],
        "/Health_MedicalHistory/Q8": [
            //set 0
            "StrokeNeurologicalConditions_DateOfDiagnosis0",
            "StrokeNeurologicalConditions_MedicationsTreatment0",
            "StrokeNeurologicalConditions_MedicationsTreatmentOther0",

            //set 1
            "StrokeNeurologicalConditions_DateOfDiagnosis1",
            "StrokeNeurologicalConditions_MedicationsTreatment1",
            "StrokeNeurologicalConditions_MedicationsTreatmentOther1",

            //set 2
            "StrokeNeurologicalConditions_DateOfDiagnosis2",
            "StrokeNeurologicalConditions_MedicationsTreatment2",
            "StrokeNeurologicalConditions_MedicationsTreatmentOther2",


            //Other
            "StrokeNeurologicalConditions_Other",
        ],
        "/Health_MedicalHistory/Q9": [
            //set 0
            "LiverKidneyGastrointestinalConditions_DateOfDiagnosis0",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatment0",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatmentOther0",

            //set 1
            "LiverKidneyGastrointestinalConditions_DateOfDiagnosis1",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatment1",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatmentOther1",

            //set 2
            "LiverKidneyGastrointestinalConditions_DateOfDiagnosis2",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatment2",
            "LiverKidneyGastrointestinalConditions_MedicationsTreatmentOther2",


            //Other
            "LiverKidneyGastrointestinalConditions_Other",
        ],
        "/Health_MedicalHistory/Q10": [
            //set 0
            "ArthritisJointDisorders_DateOfDiagnosis0",
            "ArthritisJointDisorders_ImpactOnMobility0",
            "ArthritisJointDisorders_MedicationsTreatment0",
            "ArthritisJointDisorders_MedicationsTreatmentOther0",

            //set 1
            "ArthritisJointDisorders_DateOfDiagnosis1",
            "ArthritisJointDisorders_ImpactOnMobility1",
            "ArthritisJointDisorders_MedicationsTreatment1",
            "ArthritisJointDisorders_MedicationsTreatmentOther1",

            //set 2
            "ArthritisJointDisorders_DateOfDiagnosis2",
            "ArthritisJointDisorders_ImpactOnMobility2",
            "ArthritisJointDisorders_MedicationsTreatment2",
            "ArthritisJointDisorders_MedicationsTreatmentOther2",


            //Other
            "ArthritisJointDisorders_Other",
        ],
        "/Health_MedicalHistory/Q11": [
            //set 0
            "HIVAIDSOtherImmuneSystemDisorders_DateOfDiagnosis0",
            "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatment0",
            "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatmentOther0",

            //set 1
            "HIVAIDSOtherImmuneSystemDisorders_DateOfDiagnosis1",
            "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatment1",
            "HIVAIDSOtherImmuneSystemDisorders_MedicationsTreatmentOther1",


            //Other
            "HIVAIDSOtherImmuneSystemDisorders_Other",
        ],
        "/Health_MedicalHistory/Q12": [
            //set 0
            "SurgeriesOperations_TypeOfSurgeryOperation",
            "SurgeriesOperations_DateOfDiagnosis",
            "SurgeriesOperations_ElectiveRequiredSurgery",
            "SurgeriesOperations_CurrentStatus",
            "SurgeriesOperations_CurrentStatusOther",
        ],
        "/LifestyleInformation/Q1": [

            //set 0
            "LifestyleInformation_Smoker",
            "LifestyleInformation_Vape",

            "LifestyleInformation_NumberOfCigarettes",
            "LifestyleInformation_YearQuit",

            "LifestyleInformation_drinksPerWeek",

            "LifestyleInformation_drugType",
            "LifestyleInformation_Frequency",
            "LifestyleInformation_yearQuit",

        ],
        "/LifestyleInformation/Q2": [

            //set 0
            "hazardousActivitiesSports_ActivityType0",
            "hazardousActivitiesSports_Frequency0",

            //set 1
            "hazardousActivitiesSports_ActivityType1",
            "hazardousActivitiesSports_Frequency1",

            //set 2
            "hazardousActivitiesSports_ActivityType2",
            "hazardousActivitiesSports_Frequency2",

            //set 3
            "hazardousActivitiesSports_ActivityType3",
            "hazardousActivitiesSports_Frequency3",

            //set 4
            "hazardousActivitiesSports_ActivityType4",
            "hazardousActivitiesSports_Frequency4",

            //set 5
            "hazardousActivitiesSports_ActivityType5",
            "hazardousActivitiesSports_Frequency5",

            //set 6
            "hazardousActivitiesSports_ActivityType6",
            "hazardousActivitiesSports_Frequency6",

            //set 7
            "hazardousActivitiesSports_ActivityType7",
            "hazardousActivitiesSports_Frequency7",

            //set 8
            "hazardousActivitiesSports_ActivityType8",
            "hazardousActivitiesSports_Frequency8",

            //set 9
            "hazardousActivitiesSports_ActivityType9",
            "hazardousActivitiesSports_Frequency9",

            //set 10
            "hazardousActivitiesSports_ActivityType10",
            "hazardousActivitiesSports_Frequency10",

            //set 11
            "hazardousActivitiesSports_ActivityType11",
            "hazardousActivitiesSports_Frequency11",

            //set 12
            "hazardousActivitiesSports_ActivityType12",
            "hazardousActivitiesSports_Frequency12",

            //set 13
            "hazardousActivitiesSports_ActivityType13",
            "hazardousActivitiesSports_Frequency13",

            //set 14
            "hazardousActivitiesSports_ActivityType14",
            "hazardousActivitiesSports_Frequency14",

            //set 15
            "hazardousActivitiesSports_ActivityType15",
            "hazardousActivitiesSports_Frequency15",

            //set 16
            "hazardousActivitiesSports_ActivityType16",
            "hazardousActivitiesSports_Frequency16",

            //set 17
            "hazardousActivitiesSports_ActivityType17",
            "hazardousActivitiesSports_Frequency17",

            //set 18
            "hazardousActivitiesSports_ActivityType18",
            "hazardousActivitiesSports_Frequency18",

            //set 19
            "hazardousActivitiesSports_ActivityType19",
            "hazardousActivitiesSports_Frequency19",

            //set 20
            "hazardousActivitiesSports_ActivityType20",
            "hazardousActivitiesSports_Frequency20",

            //set 21
            "hazardousActivitiesSports_ActivityType21",
            "hazardousActivitiesSports_Frequency21",

            "hazardousActivitiesSports_RegionTraveled",
            "hazardousActivitiesSports_DateTravel",

            "hazardousActivitiesSports_Other",

        ],
        "/FamilyMedicalHistory/Q1": [

            //set 0
            "FamilyMedicalHistory_FamilyMemberAffected",
            "FamilyMedicalHistory_AgeDiagnosis",

            "FamilyMedicalHistory_CancerType",
            "FamilyMedicalHistory_FamilyMemberAffectedCancer",
            "FamilyMedicalHistory_AgeDiagnosisCancer",

            "FamilyMedicalHistory_DiabetesType",
            "FamilyMedicalHistory_FamilyMemberAffectedDiabetes",
            "FamilyMedicalHistory_AgeDiagnosisDiabetes",

            "FamilyMedicalHistory_MentalHealthConditionsType",
            "FamilyMedicalHistory_FamilyMemberAffectedMentalHealthConditions",
            "FamilyMedicalHistory_AgeDiagnosisMentalHealthConditions",

        ],
        "/FamilyMedicalHistory/Q1": [

            //set 0
            "FamilyMedicalHistory_FamilyMemberAffected",
            "FamilyMedicalHistory_AgeDiagnosis",

            "FamilyMedicalHistory_CancerType",
            "FamilyMedicalHistory_FamilyMemberAffectedCancer",
            "FamilyMedicalHistory_AgeDiagnosisCancer",

            "FamilyMedicalHistory_DiabetesType",
            "FamilyMedicalHistory_FamilyMemberAffectedDiabetes",
            "FamilyMedicalHistory_AgeDiagnosisDiabetes",

            "FamilyMedicalHistory_MentalHealthConditionsType",
            "FamilyMedicalHistory_FamilyMemberAffectedMentalHealthConditions",
            "FamilyMedicalHistory_AgeDiagnosisMentalHealthConditions",

        ],
    };

    // Determine the fields to be validated based on the current path
    const fieldsToTouch = fieldsByLocation[`/${currentPath}/${cLocation || ""}`] || [];

    // Use the touchFields helper to validate and touch the fields
    const touchFieldsResult = await touchFields(setFieldTouched, fieldsToTouch, values, validateForm);

    console.log(values, `/${currentPath}/${cLocation || ""}`, fieldsToTouch);
    console.log(touchFieldsResult); // Log the validation result

    return touchFieldsResult; // Return true if all fields are valid, false otherwise
}



export {
    DeleteAxios,
    GetAxios,
    PostAxios,
    PutAxios,
    PatchAxios,
    DateHandler,
    openNotification,
    toCommaAndDollar,
    toNumericValue,
    toPercentage,
    RenderName,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleInputBlur,
    validateName,
    touchFields,
    handleTouchFields
};

