import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import CInput from "./CInput";

const FormComponent = (props) => {
  return (
    <Formik
      initialValues={{ inputName: "", inputNumber: "" }}
      validationSchema={Yup.object({
        inputName: Yup.string().required("Required"),
        inputNumber: Yup.number()
          .typeError("Must be a number")
          .required("Required"),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className=" d-flex justify-content-center align-items-center flex-column">
          <Field
            name="inputName"
            component={CInput}
            type="text"
            placeholder="Enter name..."
            className="inputDesignDoubleInput"
          />

          <Field
            name="inputNumber"
            component={CInput}
            type="number"
            placeholder="Enter number..."
            className="inputDesignDoubleInput"
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;

