import React, { useState } from 'react'
import CInput from '../assets/Custom/CInput'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const PersonalDetails = (props) => {
  let { setFieldValue, handleBlur, values, validateForm } = props.FormickOBj

  let options = [
    { value: "", label: "Select" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]

  let Nev = useNavigate()

  let [flag, setFlag] = useState(false);


  const FormulaSetting = (values, setFieldValue, currentInput) => {
    try {
      console.log(values, setFieldValue, currentInput);

      let Height = parseFloat(values.Height) / 100;
      let Weight = parseFloat(values.Weight);

      // Handle if current input updates Height or Weight
      switch (currentInput.name) {
        case "Height":
          Height = (parseFloat(currentInput.value) / 100) || 0;
          break;
        case "Weight":
          Weight = parseFloat(currentInput.value) || 0;
          break;
        default:
          console.warn("Unrecognized input field");
          break;
      }

      // Validate Height and Weight
      if (isNaN(Height) || isNaN(Weight) || Height <= 0) {
        console.error("Invalid Height or Weight input.");
        setFieldValue("BMI", 0);  // Set BMI to 0 in case of invalid input
        return;
      }

      // Calculate BMI
      const HSquare = Height * Height;
      const BMI = HSquare > 0 ? (Weight / HSquare).toFixed(2) : 0;

      setFieldValue("BMI", BMI + "%");
    } catch (error) {
      console.error("Error in calculating BMI:", error);
      setFieldValue("BMI", 0);  // Set BMI to 0 in case of error
    }
  };



  return (
    <div className="container mt-4">

      <h2 className="Head1 text-center my-5">Personal Details</h2>

      <div className="row justify-content-center flex-wrap gap-2">
        <div className='col-md-4'>
          <label htmlFor='Full_Name'>Full Name :</label>
        </div>
        <div className="col-md-4">
          <CInput
            name="Full_Name"
            type="text"
            placeholder="Full Name"
            className="form-control"
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor='DateBirth'>Date Birth :</label>
        </div>
        <div className="col-md-4">
          <CInput
            name="DateBirth"
            type="Date"
            placeholder="DD/MM/YYYY"
            className="form-control"
            setFieldValue={setFieldValue} handleBlur={handleBlur} values={values}
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor='Gender'>Gender :</label>
        </div>
        <div className="col-md-4">
          <CInput
            name="Gender"
            type="select"
            options={options}
            className="form-select"
          />
        </div>


        <div className='col-md-4'>
          <label htmlFor='Height'>Height :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="Height"
            type="number"
            group={true}
            groupIcon={"cm"}
            onChangeCallback={FormulaSetting}
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor='Weight'>Weight :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="Weight"
            type="number"
            group={true}
            groupIcon={"kg"}
            onChangeCallback={FormulaSetting}
          />
        </div>

        <div className='col-md-4'>
          <label htmlFor='BMI'>BMI :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="BMI"
            type="text"
            disabled={true}

          />
        </div>

        {/* Add more input rowsjustify-content-center  as needed */}
      </div>

      <h2 className="Head1 text-center my-5">Contact Information</h2>

      <div className="row justify-content-center flex-wrap gap-2">
        <div className='col-md-4'>
          <label htmlFor='PhoneNumber'>Phone Number :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="PhoneNumber"
            type="text"
            placeholder="Phone Number"
          />
        </div>
        <div className='col-md-4'>
          <label htmlFor='EmailAddress'>Email Address :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="EmailAddress"
            type="email"
            placeholder="Email Address"
          />
        </div>
        <div className='col-md-4'>
          <label htmlFor='Address'>Address :</label>
        </div>
        <div className="col-md-4 ">
          <CInput
            name="Address"
            type="text"
            placeholder="Address"
          />
        </div>
      </div>


      <div className='row justify-content-center flex-wrap my-3 gap-2'>
        <div className='col-md-4'>
          <Button variant="secondary" className='w-100'>Back </Button>
        </div>
        <div className='col-md-4'>
          <Button type='button' className='btn submitBtn w-100' onClick={async () => {
            const errors = await validateForm();
            if (Object.keys(errors).length === 0) {
              Nev('/OccupationalFinancialInformation')
              // Perform your task here
            } else {
              console.log("Validation errors:", errors);
            }
          }} >
            Submit
          
          </Button>
        </div>
      </div>

    </div>
  );

}

export default PersonalDetails