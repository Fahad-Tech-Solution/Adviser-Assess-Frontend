import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Questions from './Questions';
import Content from '../assets/Content';
import * as Yup from "yup";
import Disclosure from './Disclosure';
import ResultsTables from './ResultsTables';


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



    let validationSchema = Yup.object({
        EmailAddress: Yup.string().email("Please! Enter Valid Email").required("Email is required"),
    });


    let onSubmit = (values) => {
        console.log(values);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
