import React, { useEffect, useState } from 'react'
import PersonalDetails from './PersonalDetails'
import { Form, Formik } from 'formik'
import { Button, Image } from 'react-bootstrap'

import logo from "../assets/Images/Logo.png"
import Content from '../assets/Content'
import { useLocation, useNavigate } from 'react-router-dom'

const QuestionsSet = (props) => {
    const { Pages } = Content;

    let location = useLocation();
    let Nev = useNavigate();

    const handleBack = () => {
        const cLocation = location.pathname.split("/")[2] || "";
        const currentPath = location.pathname.split("/")[1] || "";
        let conditionCheck = true

        const main = Pages.filter(page => page.condition(conditionCheck)).flatMap((Pelem) => Pelem.InnerPages);

        // Find the current item index based on the QuestionChange state
        const currentIndex = main.findIndex(item => item.route === `/${cLocation}`);

        console.log(currentIndex, main, "Back");

        if (currentPath === "OccupationalFinancialInformation" && currentIndex === 0) {
            Nev("/PersonalDetails" + main[currentIndex].route)
        }
        else {
            Nev("/" + currentPath + main[currentIndex - 1].route)
        }
    };

    const handleNext = () => {
        localStorage.setItem("AdviserAssess", JSON.stringify(props.FormickOBj.values))
        const cLocation = location.pathname.split("/")[2] || "";
        const currentPath = location.pathname.split("/")[1] || "";
        let conditionCheck = true

        const main = Pages.filter(page => page.condition(conditionCheck)).flatMap((Pelem) => Pelem.InnerPages);

        // Find the current item index based on the QuestionChange state
        const currentIndex = main.findIndex(item => item.route === `/${cLocation}`);

        console.log(currentIndex, main, "Next");

        if (currentIndex === 0) {
            Nev("/" + currentPath + main[currentIndex + 2].route)
        }
        else {
            Nev("/" + currentPath + main[currentIndex + 1].route)
        }
    };




    if (props.Data.Title === "Personal Details") {
        return (
            <PersonalDetails FormickOBj={props.FormickOBj} Data={props.Data} />)
    } else {
        return (
            <div className='container-fluid'>

                <div className='d-flex flex-column justify-content-start ps-4 mt-5 align-items-center'>
                    <div className=' d-none' style={{ width: "7%" }}>
                        <Image src={props.parentElem.imgUrl || logo} fluid />
                    </div>
                    <div className=''>
                        <h3 className="my-3">
                            <b>{props.parentElem.Title || 'No Question Added'}</b>
                        </h3>
                    </div>


                </div>
                {props.Data.components ? (
                    React.cloneElement(props.Data.components, { Data: props.Data, FormickOBj: props.FormickOBj })
                ) : "no components exist"}
                <div className='row justify-content-center align-item-center gap-2'>
                    <div className='col-md-4 mt-4'>
                        <Button className='w-100 backBtn'
                            onClick={handleBack}
                        >Back </Button>
                    </div>
                    <div className='col-md-4 mt-4'>
                        <Button type='button' className='btn submitBtn w-100' onClick={handleNext} >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsSet
