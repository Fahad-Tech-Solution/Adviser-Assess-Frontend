import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import CInput from "./CInput";

const FormComponent = () => {
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
      {() => (
        <Form className="d-flex justify-content-center align-items-center flex-column">
          <Field name="inputName">
            {({ field, meta }) => (
              <CInput
                {...field}
                meta={meta}
                type="text"
                placeholder="Enter name..."
                className="inputDesignDoubleInput"
              />
            )}
          </Field>

          <Field name="inputNumber">
            {({ field, meta }) => (
              <CInput
                {...field}
                meta={meta}
                type="number"
                placeholder="Enter number..."
                className="inputDesignDoubleInput"
              />
            )}
          </Field>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
