import React, { useEffect } from 'react'
import PersonalDetails from './PersonalDetails'
import { Form, Formik } from 'formik'

const QuestionsSet = (props) => {

    let initialValues = {
        DateBirth: ""
    }

    let onSubmit = () => { }

    let fillInitialValues = () => {

    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue, handleBlur, handleChange }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        {props.Data.Title === "Personal Details" ?
                            <PersonalDetails FormickObj={{
                                values,
                                setFieldValue,
                                handleBlur,
                                handleChange
                            }} Data={props.Data} />
                            :
                            <div>
                                {props.Data.Title}
                            </div>

                        }
                    </Form>)
            }}

        </Formik>
    )

}

export default QuestionsSet
