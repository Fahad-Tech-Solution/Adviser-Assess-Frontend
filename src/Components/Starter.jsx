import { Form, Formik } from 'formik';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Questions from './Questions';
import Content from '../assets/Content';
import * as Yup from "yup";
import Disclosure from './Disclosure';


const Starter = () => {

    let { Pages } = Content;

    let initialValues = {};
    let validationSchema = Yup.object({
        inputName: Yup.string().required("Text Input is required"),
        inputNumber: Yup.number()
            .typeError("Must be a number")
            .required("Number Input is required"),
        inputSelect: Yup.string().required("Select Input is required"),
        radioInput: Yup.string().required("Please select an option"), // Validation for radio buttons
        inputCheck: Yup.boolean().oneOf([true], "You must accept the terms"), // Checkbox validation
    });
    let onSubmit = (values) => {
        console.log(values);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting, values, setFieldValue, handleChange, handleBlur }) => (
                <Form className="">
                    <Routes>
                        {Pages.map((elem, index) => {
                            if (index === 0) {
                                return (<Route key={index} path="/" element={<LandingPage elem={elem} />} />)
                            }
                            if (index === 1) {
                                return (<Route key={index} path="/Disclosure" element={<Disclosure elem={elem} />} />)
                            }
                            else {
                                return (<Route key={index} path={elem.route} element={<Questions elem={elem} />} />)
                            }
                        })}
                    </Routes>
                </Form>)}
        </Formik>
    )
}


export default Starter
