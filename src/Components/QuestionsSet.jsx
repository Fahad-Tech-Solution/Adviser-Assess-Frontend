import React, { useEffect, useState } from 'react'
import PersonalDetails from './PersonalDetails'
import { Form, Formik } from 'formik'

const QuestionsSet = (props) => {

    let initialValues = {
        DateBirth: ""
    }



    if (props.Data.Title === "Personal Details") {
        return (
            <PersonalDetails FormickOBj={props.FormickOBj} Data={props.Data} />)
    } else {
        return (
            <div>
                {props.Data.Title}
            </div>
        )
    }
}

export default QuestionsSet
