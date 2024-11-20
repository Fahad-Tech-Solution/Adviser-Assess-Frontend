import React, { useState } from 'react'
import CInput from '../../assets/Custom/CInput'
import { NavLink } from 'react-router-dom'

const Declaration = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let [inputFlag, setInputFlag] = useState(false)
    let [MessageFlag, setMessageFlag] = useState(false)

    let Data = props.Data
    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>

                <h4 className='text-center fw-bold my-4'>Declaration</h4>


                <div className='row justify-content-center'>
                    <div className='col-md-8 pb-4 mb-1'>
                        <p style={{ textAlign: "justify" }}>I declare that the information provided above is true and complete to the best of my knowledge. I understand that this information will be used by my insurance adviser and/or insurance company to assess my insurance pre-assessment.</p>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-md-8 pb-4 mb-1'>
                        <div className='row'>
                            <div className='col-md-6 pb-4 mb-1'>
                                <div className='row'>
                                    <div className='col-md-3 pt-2 mb-1'>
                                        <label className='fw-bold' htmlFor="">Signature</label>
                                    </div>
                                    <div className='col-md-6 pb-4 mb-1'>
                                        <CInput
                                            name={Data.key + "_Signature"}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-4 mb-1'>
                                <div className='row justify-content-end'>
                                    <div className='col-md-2 pt-2 mb-1'>
                                        <label className='fw-bold' htmlFor="">Date</label>
                                    </div>
                                    <div className='col-md-5 pb-4 mb-1'>
                                        <CInput
                                            name={Data.key + "_FinalDate"}
                                            type="Date"
                                            placeholder="DD/MM/YYYY"
                                            customSelect={new Date()}
                                            className="form-control"
                                            setFieldValue={setFieldValue} handleBlur={handleBlur} values={values}
                                        />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row justify-content-center'>
                            <div className='col-md-12'>
                                {MessageFlag ?
                                    <p className='text-center fw-bold'> Update successfully, {values.Full_Name || ""}! your new email is {values.EmailAddress || ""}. Click submit for the report</p>
                                    :
                                    <p className='text-center fw-bold'> Thank you, {values.Full_Name || ""}! We will send an email to {values.EmailAddress || ""} shortly.</p>
                                }
                            </div>
                            {inputFlag &&
                                <div className='col-md-4'>
                                    <CInput
                                        name="EmailAddress"
                                        type="email"
                                        placeholder="Email Address"
                                    />
                                </div>
                            }
                            <div className='col-md-12 mt-2'>
                                <p className='text-center'> <span role='button' className={"text-center fw-bold Head1 w-100 "} onClick={() => {
                                    setInputFlag(!inputFlag)
                                    if (inputFlag) {
                                        setMessageFlag(true);
                                    }
                                }}>   {inputFlag ? "Update Email" : "Edit email"}</span></p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Declaration
