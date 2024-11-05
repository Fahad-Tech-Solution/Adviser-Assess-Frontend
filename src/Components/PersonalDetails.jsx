import React from 'react'
import CInput from '../assets/Custom/CInput'

const PersonalDetails = (props) => {
  let { setFieldValue, handleBlur, values } = props.FormickObj

  let options = [
    { value: "", label: "Select" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]




  return (
    <div className="container mt-4">

      <h2 className="Head1">Personal Details</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <CInput
            name="Full_Name"
            label="Full Name"
            type="text"
            placeholder="Full Name"
            className="form-control"
          />
        </div>

        <div className="col-md-4 mb-3">
          <CInput
            name="DateBirth"
            type="Date"
            label="Date Birth"
            placeholder="DD/MM/YYYY"
            className="form-control"
            setFieldValue={setFieldValue} handleBlur={handleBlur} values={values}
          />
        </div>

        <div className="col-md-4 mb-3">
          <CInput
            name="Gender"
            label="Gender"
            type="select"
            options={options}
            className="form-select"
          />
        </div>

        <div className="col-md-4 mb-3">
          <CInput
            name="Height"
            label="Height"
            type="text"
          />
        </div>

        <div className="col-md-4 mb-3">
          <CInput
            label="Height"
            name="Height"
            type="text"
          />
        </div>

        <div className="col-md-4 mb-3">
          <CInput
            label="BMI"
            name="BMI"
            type="text"
            disabled={true}

          />
        </div>

        {/* Add more input rowsjustify-content-center  as needed */}
      </div>

      <h2 className="Head1">Contact Information</h2>

      <div className="row ">
        <div className="col-md-4 mb-3">
          <CInput
            name="PhoneNumber"
            label="Phone Number"
            type="text"
            placeholder="Phone Number"
          />
        </div>
        <div className="col-md-4 mb-3">
          <CInput
            name="EmailAddress"
            label="Email Address"
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="col-md-4 mb-3">
          <CInput
            name="Address"
            label="Address"
            type="text"
            placeholder="Address"
          />
        </div>
      </div>

    </div>
  );

}

export default PersonalDetails
