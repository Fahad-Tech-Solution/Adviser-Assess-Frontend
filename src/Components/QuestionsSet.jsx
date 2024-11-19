import React, { useEffect, useState } from 'react'
import PersonalDetails from './PersonalDetails'
import { Form, Formik } from 'formik'
import { Button, Image } from 'react-bootstrap'

import logo from "../assets/Images/Logo.png"
import Content from '../assets/Content'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleTouchFields, touchFields } from '../assets/Api/Api'

const QuestionsSet = (props) => {
    const { Pages } = Content;

    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let [submitFlag, setSubmitFlag] = useState(false);

    let location = useLocation();
    let Nev = useNavigate();

    const handleBack = () => {
        const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);
        const MainPageIndex = Pages.findIndex(item => item.route === `/${currentPath}`);

        if (MainPageIndex === -1) return; // Exit if main page not found

        const innerPages = Pages[MainPageIndex].InnerPages.filter(page => page.condition(values));
        const CurrentPageIndex = innerPages.findIndex(item => item.route === `/${cLocation}`);

        if (innerPages.length > 1 && CurrentPageIndex > 0) {
            // Navigate to previous inner page in the same main page
            Nev(Pages[MainPageIndex].route + innerPages[CurrentPageIndex - 1].route);
        } else if (MainPageIndex > 0) {
            // Navigate to the last filtered inner page of the previous main page
            const previousMainPage = Pages[MainPageIndex - 1];
            const previousInnerPages = previousMainPage.InnerPages.filter(page => page.condition(values));

            if (previousInnerPages.length > 0) {
                const previousLastPage = previousInnerPages[previousInnerPages.length - 1].route;
                Nev(previousMainPage.route + previousLastPage);
            }
        }
    };

    const handleNext = async () => {
        // Save the form values to localStorage
        localStorage.setItem("AdviserAssess", JSON.stringify(props.FormickOBj.values));

        const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);

        const main = Pages.filter(page => page.condition(true));

        // Flatten the main pages and their inner pages into a single array with full routes
        const SubPages = main.flatMap((elem) => {
            return elem.InnerPages.map((innerPage) => ({
                ...innerPage,
                route: `${elem.route}${innerPage.route}` // Concatenate parent route with inner page route
            }))
        }
        );

        let conditionCheck2 = values

        let innerPages = SubPages.filter(page => page.condition(conditionCheck2));

        // Find the current page's index in SubPages
        const currentIndex = innerPages.findIndex((page) => page.route === `/${currentPath}/${cLocation || ""}`);

        console.log(currentIndex, `/${currentPath}/${cLocation || ""}`, innerPages[currentIndex + 1])

        if (currentIndex === -1) return; // Exit if the current page is not found

        let handleTouchFieldsResult = await handleTouchFields(location, setFieldTouched, values, validateForm);

        if (!handleTouchFieldsResult) return false;

        // Check if there is a next page
        if (currentIndex < innerPages.length - 1) {
            // Navigate to the next page
            Nev(innerPages[currentIndex + 1].route);
        }
    };

    useEffect(() => {
        const [currentPath, cLocation] = location.pathname.split("/").slice(1, 3);

        if (`/${currentPath}/${cLocation || ""}` === "/Declaration/" || `/${currentPath}/${cLocation || ""}` === "/Declaration") {
            setSubmitFlag(true);
        }
        else {
            setSubmitFlag(false);
        }

    }, [location])


    if (props.Data.Title === "Personal Details") {
        return (
            <PersonalDetails FormickOBj={props.FormickOBj} Data={props.Data} />)
    } else {
        return (
            <div className='container-fluid'>

                <div className='d-flex flex-column justify-content-start ps-4 mt-5 align-items-center d-none '>
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

                <div className='row justify-content-center align-item-center gap-2 mb-4'>

                    <div className='col-md-3 mt-4'>
                        <Button className='w-100 backBtn'
                            onClick={handleBack}
                        >Back </Button>
                    </div>
                    <div className='col-md-3 mt-4'>
                        {submitFlag === true ?
                            <Button type='submit' className='btn submitBtn w-100' >
                                Submit
                            </Button>
                            :
                            <Button type='button' className='btn submitBtn w-100' onClick={handleNext} >
                                Next
                            </Button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsSet
