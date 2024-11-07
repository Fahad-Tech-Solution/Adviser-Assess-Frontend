import { Form, Formik } from 'formik';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Questions from './Questions';
import Content from '../assets/Content';
import * as Yup from "yup";
import Disclosure from './Disclosure';
import PersonalDetails from './PersonalDetails';


const Starter = () => {

    let { Pages } = Content;

    let initialValues = {
        disclosureAccept: false,
        DateBirth: ""
    };
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
                </Form>)}
        </Formik>
    )
}


export default Starter
