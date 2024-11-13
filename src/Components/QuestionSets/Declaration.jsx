import React from 'react'
import CInput from '../../assets/Custom/CInput'

const Declaration = (props) => {
    let { setFieldValue, handleBlur, values, validateForm, validateField, setFieldTouched, handleChange } = props.FormickOBj

    let Data = props.Data
    return (
        <div className='row'>
            <div className='col-md-12 pb-4 mb-1'>
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
                                            className="form-control"
                                            setFieldValue={setFieldValue} handleBlur={handleBlur} values={values}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Declaration
