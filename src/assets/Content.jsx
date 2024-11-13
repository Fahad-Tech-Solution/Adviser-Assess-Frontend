import React from "react";
import logo from "./Images/Logo.png"
import { components } from "react-select";
import EmploymentStatus from "../Components/QuestionSets/EmploymentStatus";

import OccupationalFinancialInformation from "../assets/Images/OccupationalFinancialInformation.png"
import IncomeInformation from "../Components/QuestionSets/IncomeInformation";
import WorkEnvironment from "../Components/QuestionSets/WorkEnvironment";
import WeeklyWorkHours from "../Components/QuestionSets/WeeklyWorkHours";
import SelfEmploymentDetails from "../Components/QuestionSets/SelfEmploymentDetails";
import HeartDiseaseConditions from "../Components/QuestionSets/HeartDiseaseConditions";
import HighBloodPressureHighCholesterol from "../Components/QuestionSets/HighBloodPressureHighCholesterol";
import RespiratoryConditions from "../Components/QuestionSets/RespiratoryConditions";
import CancerTumorsCysts from "../Components/QuestionSets/CancerTumorsCysts";
import Diabetes from "../Components/QuestionSets/Diabetes";
import MentalHealthConditions from "../Components/QuestionSets/MentalHealthConditions";
import BackNeckPain from "../Components/QuestionSets/BackNeckPain";
import StrokeNeurologicalConditions from "../Components/QuestionSets/StrokeNeurologicalConditions";
import LiverKidneyGastrointestinalConditions from "../Components/QuestionSets/LiverKidneyGastrointestinalConditions";
import ArthritisJointDisorders from "../Components/QuestionSets/ArthritisJointDisorders";
import HIVAIDSOtherImmuneSystemDisorders from "../Components/QuestionSets/HIVAIDSOtherImmuneSystemDisorders";
import SurgeriesOperations from "../Components/QuestionSets/SurgeriesOperations";
import LifestyleInformation from "../Components/QuestionSets/LifestyleInformation";
import HazardousActivitiesSports from "../Components/QuestionSets/HazardousActivitiesSports";
import FamilyMedicalHistory from "../Components/QuestionSets/FamilyMedicalHistory";
import Declaration from "../Components/QuestionSets/Declaration";


const Content = {
    Pages: [
        {
            img: logo,
            Question: "-2",
            route: "/",
            condition: (CRObject) => false

        },
        {
            img: logo,
            Question: "-1",
            route: "/Disclosure",
            condition: (CRObject) => false

        },
        {
            description: "Your Personal information",
            Title: 'Personal Details',
            statusStep: 0,
            icon: 'FaUser',
            route: '/PersonalDetails',
            key: "PersonalDetails",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Personal Details',
                    statusStep: 10,
                    icon: 'FaUser',
                    route: '/',
                    key: "PersonalDetails",
                    condition: (CRObject) => true,
                },
            ]

        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Occupational/Financial Information',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/OccupationalFinancialInformation',
            key: "OccupationalFinancialInformation",
            imgUrl: OccupationalFinancialInformation,
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Employment Status',
                    statusStep: 20,
                    icon: 'MdOutlineHomeWork',
                    route: '/',
                    key: "EmploymentStatus",
                    components: <EmploymentStatus />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Second Occupation',
                    statusStep: 30,
                    icon: 'IoBriefcase',
                    route: '/Q2',
                    key: "SecondOccupation",
                    components: <EmploymentStatus />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Income Information',
                    statusStep: 40,
                    icon: 'AiOutlineDollarCircle',
                    route: '/Q3',
                    key: "IncomeInformation",
                    components: <IncomeInformation />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Work Environment',
                    statusStep: 50,
                    icon: 'FaBuilding',
                    route: '/Q4',
                    key: "workEnvironment",
                    components: <WorkEnvironment />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Weekly Work Hours',
                    statusStep: 60,
                    icon: 'BsClockHistory',
                    route: '/Q5',
                    key: "weeklyWorkHours",
                    components: <WeeklyWorkHours />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Self-Employment Details',
                    statusStep: 70,
                    icon: 'FaUserTie',
                    route: '/Q6',
                    key: "SelfEmploymentDetails",
                    components: <SelfEmploymentDetails />,
                    condition: (CRObject) => { return CRObject[`EmploymentStatus_EmploymentType`] === "Self-employed" }
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Health & Medical History',
            statusStep: 0,
            icon: 'MdOutlineHealthAndSafety',
            route: '/Health_MedicalHistory',
            key: "Health_MedicalHistory",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Heart disease or conditions',
                    statusStep: 10,
                    icon: 'FaHeartPulse',
                    route: '/',
                    key: "heartDiseaseConditions",
                    components: <HeartDiseaseConditions />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'High Blood Pressure or High Cholesterol',
                    statusStep: 20,
                    icon: 'RiStethoscopeLine',
                    route: '/Q2',
                    components: <HighBloodPressureHighCholesterol />,
                    key: "HighBloodPressureHighCholesterol",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Respiratory conditions',
                    statusStep: 30,
                    icon: 'MdMonitorHeart',
                    route: '/Q3',
                    components: <RespiratoryConditions />,
                    key: "RespiratoryConditions",
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Cancer, Tumors, or Cysts',
                    statusStep: 40,
                    icon: 'FaRibbon',
                    route: '/Q4',
                    key: "CancerTumorsCysts",
                    components: <CancerTumorsCysts />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Diabetes (Type 1 or Type 2)',
                    statusStep: 50,
                    icon: 'FaSyringe',
                    route: '/Q5',
                    key: "Diabetes",
                    components: <Diabetes />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Mental Health Conditions',
                    statusStep: 60,
                    icon: 'MdOutlineHealthAndSafety',
                    route: '/Q6',
                    key: "MentalHealthConditions",
                    components: <MentalHealthConditions />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Back or Neck Pain',
                    statusStep: 70,
                    icon: 'FaBone',
                    route: '/Q7',
                    key: "BackNeckPain",
                    components: <BackNeckPain />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Stroke or Neurological Conditions ',
                    statusStep: 80,
                    icon: 'PiBrain',
                    route: '/Q8',
                    key: "StrokeNeurologicalConditions",
                    components: <StrokeNeurologicalConditions />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Liver, Kidney, or Gastrointestinal Conditions',
                    statusStep: 20,
                    icon: 'GiKidneys',
                    route: '/Q9',
                    key: "LiverKidneyGastrointestinalConditions",
                    components: <LiverKidneyGastrointestinalConditions />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Arthritis or Joint Disorders',
                    statusStep: 30,
                    icon: 'GiKneeCap',
                    route: '/Q10',
                    key: "ArthritisJointDisorders",
                    components: <ArthritisJointDisorders />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'HIV/AIDS or other Immune System Disorders',
                    statusStep: 40,
                    icon: 'FaHeartbeat',
                    route: '/Q11',
                    key: "HIVAIDSOtherImmuneSystemDisorders",
                    components: <HIVAIDSOtherImmuneSystemDisorders />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Surgeries or Operations',
                    statusStep: 50,
                    icon: 'FaProcedures',
                    route: '/Q12',
                    key: "SurgeriesOperations",
                    components: <SurgeriesOperations />,
                    condition: (CRObject) => true,
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Lifestyle Information',
            statusStep: 0,
            icon: 'MdFamilyRestroom',
            route: '/LifestyleInformation',
            key: "LifestyleInformation",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Lifestyle Information',
                    statusStep: 60,
                    icon: 'FaWineBottle',
                    route: '/',
                    key: "LifestyleInformation",
                    components: <LifestyleInformation />,
                    condition: (CRObject) => true,
                },
                {
                    Title: 'Hazardous activities or sports',
                    statusStep: 70,
                    icon: 'GiParachute',
                    route: '/Q2',
                    key: "hazardousActivitiesSports",
                    components: <HazardousActivitiesSports />,
                    condition: (CRObject) => true,
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Family Medical History',
            statusStep: 0,
            icon: 'MdFamilyRestroom',
            route: '/FamilyMedicalHistory',
            key: "FamilyMedicalHistory",
            condition: (CRObject) => true,
            InnerPages: [
                {
                    Title: 'Family Medical History',
                    statusStep: 80,
                    icon: 'MdFamilyRestroom',
                    route: '/',
                    key: "FamilyMedicalHistory",
                    components: <FamilyMedicalHistory />,
                    condition: (CRObject) => true,
                },
            ],
        },
        {
            description: "it has few Questions you need to answer",
            Title: 'Declaration',
            statusStep: 0,
            icon: 'RiCoinsFill',
            route: '/Declaration',
            key: "Declaration",
            InnerPages: [
                {
                    Title: 'Declaration',
                    statusStep: 90,
                    icon: 'MdFamilyRestroom',
                    route: '/',
                    key: "Declaration",
                    components: <Declaration />,
                    condition: (CRObject) => true,
                },
            ],
            condition: (CRObject) => true
        },
    ]

}


export default Content;